<!--
 * @Author: h-huan
 * @Date: 2023-05-08 19:16:12
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 14:59:37
 * @Description: 
-->


<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();

    const state = reactive({
      levelList: [] as any
    })

    const isDashboard = (val: any) => {
      const name = val && val.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }


    const getBreadcrumb = () => {
      let matched: any = route.matched.filter(item => item.meta && item.meta.title)

      const first = matched[0]
      if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
      }

      state.levelList = matched;
    }

    getBreadcrumb()

    return {
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <el-breadcrumb-item v-for="item in levelList" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>