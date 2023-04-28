<!--
 * @Author: h-huan
 * @Date: 2023-04-12 14:17:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-12 14:24:00
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Iframe',
  props: {
    src: {
      type: String
    }
  },
  setup() {
    const state = reactive({
      height: '100%',
      // height: document.documentElement.clientHeight - (84 + 22) + 'px;',
      loading: true,
    })
    // 模拟页面加载
    setTimeout(() => {
      state.loading = false
    }, 230)
    // 
    window.onresize = function temp() {
      state.height = document.documentElement.clientHeight - (84 + 22) + 'px;'
    }
    return {
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div v-loading="loading" :style="'height:' + height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
  </div>
</template>

<style lang="scss" scoped></style>