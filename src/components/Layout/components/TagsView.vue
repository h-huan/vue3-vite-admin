<!--
 * @Author: h-huan
 * @Date: 2023-04-06 20:03:24
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-20 16:32:26
 * @Description: 
-->
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, computed, watch, nextTick } from 'vue'
import { useStates, useActions } from "/@/hooks/useStore";
import { useRoute, useRouter } from "vue-router";
import path from 'path'

export default defineComponent({
  name: 'TagsView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const appStates: any = useStates('TagsView', ['visitedViews'])
    const permissionStates: any = useStates('Permission', ['routers'])
    const tagsViewActions: any = useActions('TagsView', ['addView', 'addVisitedView', 'updateVisitedView', 'delCachedView', 'delView', 'delOthersViews', 'delOthersViews', 'delAllViews'])

    const tagRef = ref(null);
    const tagsViewRef = ref(null);
    const scrollPaneRef = ref(null);

    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {} as any,
      affixTags: [],
      tags: appStates.visitedViews as any, // 标签列表
    })
    onMounted(() => {
      let _affix = {
        name: 'Dashboard',
        path: '/dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
      tagsViewActions.addView(_affix)
      state.affixTags.push(_affix)
      addTags()
    })



    watch(route, async (newQuestion) => {

      addTags()
      moveToCurrentTag()
    })

    watch(() => state.visible, async (newQuestion) => {
      if (newQuestion) {
        document.body.addEventListener("click", closeMenu);
      } else {
        document.body.removeEventListener("click", closeMenu);
      }
      // getBreadcrumb()
    })

    const isActive = (_route) => {
      return _route.path === route.path;
    }

    // 添加tabs
    const addTags = () => {
      const { name } = route
      if (name) {
        tagsViewActions.addView(route)
      }
      return false
    }

    const moveToCurrentTag = () => {
      const tags = tagRef.value
      nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === route.path) {
            // scrollPane.value.moveToTarget(tag)
            scrollPaneRef.value.scrollTo(tag)
            // when query is different then update
            if (tag.to.fullPath !== route.fullPath) {
              tagsViewActions.updateVisitedView(route)
            }
            break
          }
        }
      })
    }


    // 刷新
    const refreshSelectedTag = (view) => {
      tagsViewActions.delCachedView(view).then(() => {
        console.log(view);

        const { fullPath } = view
        nextTick(() => {
          router.replace({
            // path: '/redirect' + fullPath
            path: fullPath
          })
        })
      })
    }

    // 关闭当前
    const closeSelectedTag = (view) => {
      tagsViewActions.delView(view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view)
        }
      })
    }
    const closeOthersTags = () => {
      router.push(state.selectedTag)
      tagsViewActions.delOthersViews(state.selectedTag).then(() => {
        moveToCurrentTag()
      })
    }
    // 关闭所有
    const closeAllTags = (view) => {
      tagsViewActions.delAllViews().then(({ visitedViews }) => {
        if (state.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        toLastView(visitedViews, view)
      })
    }

    // 跳转到指定页面
    const toLastView = (visitedViews, view) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }

    // 监听鼠标右键
    const openMenu = (tag, index, e) => {
      nextTick(() => {
        // const offsetLeft = tagRef.value[index].$el.getBoundingClientRect().left // container margin left
        // const offsetWidth = tagRef.value[index].$el.offsetWidth // container margin left
        // const maxLeft = offsetWidth - menuMinWidth // left boundary
        // const left = e.clientX   // 15: margin right

        state.top = e.clientY
        state.left = e.clientX
        state.visible = true
        state.selectedTag = tag
      })
    }

    const closeMenu = () => {
      state.visible = false
    }

    return {
      tagRef,
      tagsViewRef,
      scrollPaneRef,
      isActive,
      openMenu,
      refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,
      ...toRefs(state)
    }
  }
})
</script>
<template>
  <div id="tags-view-container" ref="tagsViewRef" class="tags-view-container">
    <el-scrollbar ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link v-for="(tag, index) in tags" ref="tagRef" :key="tag.path" :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item" :class="isActive(tag) ? 'active' : ''" @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, index, $event)">
        {{ tag.title }}

        <i v-if="!tag.meta.affix" class="iconfont icon-shanchu1" @click.prevent.stop="closeSelectedTag(tag)"></i>
      </router-link>
    </el-scrollbar>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta && selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }

    .iconfont {
      color: #e9e9e9;
      font-size: 12px;

      &:hover {
        color: #b4bccc;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>