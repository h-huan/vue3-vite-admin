<!--
 * @Author: h-huan
 * @Date: 2023-05-08 20:39:47
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 09:14:59
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

export default defineComponent({
  name: 'Screenfull',
  setup() {
    const state = reactive({
      isFullscreen: false
    })
    onMounted(() => {
      screenfull.on('change', change)
    })

    onUnmounted(() => {
      screenfull.off('change', change)
    })

    const change = () => {
      state.isFullscreen = screenfull.isFullscreen
    }
    const onToggle = () => {
      screenfull.toggle()
    }
    return {
      onToggle,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="screenfull-icon">
    <i class="iconfont" :class="[isFullscreen ? 'icon-quxiaoquanping' : 'icon-quanping']" @click="onToggle"></i>
  </div>
</template>

<style lang="scss" scoped>
.screenfull-icon {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;

  width: 20px;
  height: 20px;
  vertical-align: 10px;

  .iconfont {
    font-size: 26px;
  }
}
</style>