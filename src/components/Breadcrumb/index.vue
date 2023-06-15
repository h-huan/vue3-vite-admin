<!--
 * @Author: h-huan
 * @Date: 2023-05-08 19:16:12
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-14 14:04:04
 * @Description: 
-->


<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import * as pathToRegexp from 'path-to-regexp';

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      levelList: [] as any
    })

    watch(route, async (newQuestion) => {
      if (newQuestion.path.startsWith('/redirect/')) {
        return
      }
      getBreadcrumb()
    })

    const isDashboard = (val: any) => {
      const name = val && val.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }


    // 获取
    const getBreadcrumb = () => {

      let matched: any = route.matched.filter(item => item.meta && item.meta.title)

      const first = matched[0]
      // 第一个值不是首页就关闭
      if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
      }

      state.levelList = matched;
    }

    getBreadcrumb()


    const pathCompile = (path) => {
      const { params } = route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    }

    // 点击面包屑
    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }

    return {
      handleLink,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in levelList" :to="item.path">
      <span v-if="item.redirect === 'noredirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title
      }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
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