<template>
  <v-container>
    <v-card max-width="95%" class="mx-auto">
      <v-row align-content="center">
        <v-col>
          <v-alert
            v-if="result && result.length < 1"
            type="error"
            border="left"
          >
            ไม่สามารถค้นหาใบหน้าจากฐานข้อมูลได้
          </v-alert>
          <v-progress-linear
            v-if="tface.onloading"
            indeterminate
            reverse
            stream
            color="lime"
          ></v-progress-linear>
        </v-col>
      </v-row>

      <v-row v-if="boxes">
        <v-col cols="12">
          <v-toolbar>
            <v-toolbar-title> ค้นพบ {{ boxes.length }} ใบหน้า </v-toolbar-title>
          </v-toolbar>
        </v-col>
        <v-col>
          <v-row v-for="(items, i) in result" :key="i">
            <v-col class="mx-auto" cols="12" sm="3">
              <v-card
                :style="`border-width:1px;border-color: ${tface.color(
                  i
                )};border-style: solid;border-radius: 5px;`"
              >
                <v-img
                  v-if="boxes.length"
                  :src="tface.cropFace(boxes[i])"
                  aspect-ratio="1"
                  class="white--text align-end"
                  contain
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-card-subtitle class="text-center text-h6">
                  หน้าที่ {{ i + 1 }}
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col v-if="items" cols="12" sm="9">
              <v-row align-content="start" justify="space-around">
                <v-col v-for="item in items" :key="item.id" cols="6" sm="3">
                  <v-card
                    :style="`border-width:1px;border-color: ${tface.color(
                      i
                    )};border-style: solid;border-radius: 5px;`"
                  >
                    <v-img
                      :src="`${imgUrl}${item.image_path}`"
                      aspect-ratio="1"
                      class="white--text align-end"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <v-card-subtitle class="text-center text-h6">
                      {{ parseFloat(String(item.score * 100)).toFixed(2) }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from '@nuxtjs/composition-api'
import { Search } from '~/types/tface'
import TFace from '~/utils/'

export default defineComponent({
  name: 'TFacetface.search',

  setup() {
    const tface = TFace
    const result = computed(() => tface.search.result)
    const boxes = computed(() => tface.search.boxes)
    watch(
      () => tface.img,
      async (v) => {
        if (v) {
          tface.search = {} as Search
          tface.search = await tface.getApi(v.split(',')[1])
          if (tface.search.result.length) {
            tface.drawResults()
          }
        }
      },
      { immediate: true }
    )
    return {
      tface,
      result,
      boxes,
      imgUrl:
        'https://www.aiforthai.in.th/aiplatform/views/pages/facetraining/upload/',
    }
  },
})
</script>
