<!--
 * @Author: h-huan
 * @Date: 2023-04-06 14:39:49
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-06 14:39:53
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Login',
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
  <div>login view</div>
</template>

<style lang="scss" scoped></style>