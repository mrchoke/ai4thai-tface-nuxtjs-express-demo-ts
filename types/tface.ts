import { Exif } from 'blueimp-load-image'

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

export interface Exifs extends Exif {
  map: Record<string, string | number>
}

export interface Boxes {
  x: number
  y: number
  w: number
  h: number
}
export interface Result {
  [k: string]: string | number
  path: string
  filename: string
  '@timestamp': string
  // eslint-disable-next-line camelcase
  image_path: string
  id: string
  score: number
}
export interface Search {
  boxes: Boxes[]
  result: Result[]
}
