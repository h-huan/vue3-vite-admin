<!--
 * @Author: h-huan
 * @Date: 2023-03-28 08:56:23
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-06 10:59:55
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ElNotification } from 'element-plus'

export default defineComponent({
  name: 'home',
  setup() {
    const state = reactive({
    })
    const open1 = () => {
      ElNotification({
        title: 'Prompt',
        message: 'This is a message that does not automatically close',
        duration: 0,
      })
    }

    return {
      open1,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="home">
    <el-button type="primary">Primary</el-button>
    <el-button type="warning">Primary</el-button>
    <el-button plain @click="open1"> Closes automatically </el-button>
  </div>
</template>