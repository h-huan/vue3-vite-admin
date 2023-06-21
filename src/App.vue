<!--
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:08
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-19 16:51:52
 * @Description: 
-->
<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default defineComponent({
  setup() {
    return {
      locale: zhCn,
    }
  },
})
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style></style>
