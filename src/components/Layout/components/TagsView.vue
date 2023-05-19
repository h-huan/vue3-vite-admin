<!--
 * @Author: h-huan
 * @Date: 2023-04-06 20:03:24
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-10 10:40:53
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useState, useActions } from "/@/hooks/useStore";
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'TagsView',
  setup() {
    const route = useRoute()
    const appState: any = useState('TagsView', ['visitedViews'])

    const state = reactive({
      visible: false,
      selectedTag: {},
      tags: appState.visitedViews as any
    })

    // 监听鼠标右键
    const openMenu = (tag, e) => {

    }

    const closeSelectedTag = (view) => {
      // this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
      //   if (this.isActive(view)) {
      //     this.toLastView(visitedViews, view)
      //   }
      // })
    }

    // 
    const isActive = (route) => {

    }

    // 跳转到指定页面
    const toLastView = (visitedViews, view) => {

    }


    // const addTags = () => {
    //   // const { name } = this.$route
    //   // if (name) {
    //   //   this.$store.dispatch('tagsView/addView', this.$route)
    //   // }
    //   return false
    // },

    return {
      openMenu,
      closeSelectedTag,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link v-for="tag in tags" ref="tag" :key="tag.path" :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item" @contextmenu.prevent.native="openMenu(tag, $event)">
        {{ tag.title }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </el-scrollbar>
    <!-- <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
                <li @click="refreshSelectedTag(selectedTag)">刷新</li>
                <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
                <li @click="closeOthersTags">关闭其他</li>
                <li @click="closeAllTags(selectedTag)">关闭全部</li>
              </ul> -->
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
  }
}
</style>