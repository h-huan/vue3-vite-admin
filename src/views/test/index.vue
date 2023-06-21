<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Iframe from '/@/components/Iframe/index.vue'

export default defineComponent({
  name: 'iframe ',
  components: { Iframe },
  setup() {
    const state = reactive({
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <!-- <div class="app-container"> -->
  <Iframe src="https://cn.vuejs.org/guide/introduction.html"></Iframe>
  <!-- </div> -->
</template>

<style lang="scss" scoped></style>