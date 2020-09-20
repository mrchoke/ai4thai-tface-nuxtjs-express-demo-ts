<template>
  <v-container>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          T-Face API Nuxt.js &amp; Express Demo
        </v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col>
          <t-face-search v-if="tface.img" />
        </v-col>
      </v-row>
      <v-row class="pa-5">
        <v-col class="mx-auto" cols="12">
          <input
            id="addFile"
            ref="addFile"
            type="file"
            accept="image/jpeg,image/png"
            @change="tface.init($event.target.files)"
          />

          <v-row>
            <v-col>
              <v-btn
                outlined
                color="warning"
                large
                block
                @click="addFile.click()"
              >
                <span class="title">
                  {{ tface.img ? 'เปลี่ยน' : 'เลือก' }}รูปภาพ
                </span>
                <v-icon class="ml-4"> mdi-image-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="mx-auto" cols="12">
          <v-img
            :src="
              tface.output ? tface.output : tface.img ? tface.img : noprofile
            "
            contain
            :width="tface.output || tface.img ? '80%' : '30%'"
            class="mx-auto"
            @click="addFile.click()"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import TFace from '~/utils/'
import NoProfile from '~/utils/NoProfile'

export default defineComponent({
  name: 'TFace',
  components: {},
  setup() {
    const tface = TFace

    return {
      addFile: ref(),
      noprofile: NoProfile,
      tface,
    }
  },
})
</script>

<style scoped>
#addFile {
  display: none;
}
</style>
