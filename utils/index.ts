import { reactive } from '@nuxtjs/composition-api'
import loadImage, { MetaData, LoadImageOptions } from 'blueimp-load-image'
import axios from 'axios'
import type { Exifs, Search, Boxes } from '~/types/tface'

class TFaceClass {
  img: string
  output: string
  search: Search
  onloading: boolean

  constructor() {
    this.img = ''
    this.output = ''
    this.search = {} as Search
    this.onloading = false
  }

  displayImage(file: File, options: LoadImageOptions): void {
    loadImage(
      file,
      async (canvas) => {
        canvas = canvas as HTMLCanvasElement
        this.img = await canvas.toDataURL('image/jpeg')
      },
      options
    )
  }

  init(files: FileList & File): void {
    this.img = ''
    this.output = ''
    const file = files[0] ? files[0] : files
    const options: LoadImageOptions = {
      canvas: true,
      maxHeight: 640,
      maxWidth: 640,
    }
    if (file) {
      loadImage.parseMetaData(file, (data: MetaData) => {
        if (data.exif) {
          const exif = data.exif as Exifs
          if (exif.map.Orientation) {
            options.orientation = Number(exif.map.Orientation)
          }
        }
        this.displayImage(file, options)
      })
    }
  }

  color(n: number): string {
    const colors = [
      '#0059ff',
      '#ff0044',
      '#10e372',
      '#ff9c08',
      '#a408ff',
      '#00ddfa',
      '#ffdd00',
      '#b5ed0c',
      '#8a5a24',
      '#c918ac',
    ]

    const ns = n.toString()
    const i = Number(ns[ns.length - 1])

    return colors[i]
  }

  async getApi(b64: string): Promise<Search> {
    this.onloading = true
    return (
      await axios
        .post('/api/tface', { image: b64 })
        .finally(() => (this.onloading = false))
    ).data
  }

  async drawResults() {
    const canvas = document.createElement('canvas')
    const ctx = canvas?.getContext('2d')
    const results = this.search.boxes

    const image = new Image()
    image.onload = function () {}
    image.src = this.img
    canvas.height = image.height
    canvas.width = image.width

    if (ctx) ctx.drawImage(image, 0, 0)

    for (let i = 0; i < results.length; ++i) {
      const rect = results[i]
      if (ctx && image) {
        ctx.beginPath()
        const xRatio = ctx.canvas.width / image.width
        const yRatio = ctx.canvas.height / image.height
        ctx.lineWidth = 3
        ctx.strokeStyle = this.color(i)

        ctx.strokeRect(
          rect.x * xRatio,
          rect.y * yRatio,
          rect.w * xRatio,
          rect.h * yRatio
        )
      }
    }
    if (canvas && results.length) {
      this.output = await canvas.toDataURL('image/jpeg')
    }
  }

  cropFace(rect: Boxes): string {
    const margin = 40
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = rect.w + margin * 2
    canvas.height = rect.h + margin * 2
    const image = new Image()
    image.onload = function () {}
    image.src = this.img

    const x = rect.x - margin
    const y = rect.y - margin
    const h = rect.h + margin * 2
    const w = rect.w + margin * 2

    if (ctx) ctx.drawImage(image, x, y, w, h, 0, 0, w, h)
    const data = canvas.toDataURL()

    return data
  }
}

const TFace = reactive(new TFaceClass())

export default TFace
