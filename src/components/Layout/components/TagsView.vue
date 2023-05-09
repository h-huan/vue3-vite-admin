<!--
 * @Author: h-huan
 * @Date: 2023-04-06 20:03:24
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 15:55:58
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useState, useActions } from "/@/hooks/useStore";

export default defineComponent({
  name: 'TagsView',
  setup() {
    // const
    const state = reactive({
      visible: false,
      selectedTag: {},
    })

    const visitedViews = () => {
      // return this.$store.state.tagsView.visitedViews
    }
    return {
      visitedViews,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link to="" class="tags-view-item">
        <!-- {{ tag.title }}
            <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" /> -->
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

<style lang="scss" scoped></style>