<!--
 * @Author: h-huan
 * @Date: 2023-04-12 14:17:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-21 14:40:47
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
      height: document.documentElement.clientHeight - (84 + 22) + 'px;',
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

    const load = () => {

    }

    /**
     * 接受嵌套组件发送的信息
    _iframe.value.contentWindow.postMessage({
      cmd: 'headerHide',
      params: {}
    }, '*')

     */

    /**
     * 
    window.addEventListener('message', event => {
      const data = event.data
      // 根据上面制定的结构来解析iframe内部发回来的数据
  
      switch (data.cmd) {
        case 'returnFormJson':
          // 业务逻辑
          break
        case 'returnHeight':
          // 业务逻辑
          break
      }
    });
     */

    return {
      load,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div v-loading="loading" :style="'height:' + height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" @load="load" />
  </div>
</template>

<style lang="scss" scoped></style>