<!--
 * @Author: h-huan
 * @Date: 2023-04-02 16:58:47
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-15 18:05:34
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'

import { useStates } from "/@/hooks/useStore";
import { useRoute } from "vue-router";

import SideBar from './components/SiderBar/index.vue'
import NavBar from './components/NavBar.vue'
import TagsView from './components/TagsView.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    SideBar,
    NavBar,
    TagsView
  },
  setup() {

    const route = useRoute()
    const appStates: any = useStates('App', ['sidebar'])
    const TagsViewStates: any = useStates('TagsView', ['cachedViews'])

    const state = reactive({
      hideSidebar: appStates.sidebar
    })

    // 获取快照
    const cachedViews = computed(() => {
      return TagsViewStates.cachedViews.value;
    });
    const key = computed(() => {
      return route.path;
    });

    return {
      key,
      cachedViews,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="app-wrapper" :class="[hideSidebar ? '' : 'hideSidebar']">
    <SideBar class="sidebar-container"></SideBar>
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
        <tags-view />
      </div>
      <section class="app-main">

        <router-view v-slot="{ Component }" :key="key">
          <transition name="move" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import "/@/styles/mixins.scss";

.app-wrapper {
  @include clearfix;
  position: relative;

  .sidebar-container {
    @include clearfix;
    position: fixed;
    top: 0;
    bottom: 0;
    width: $sidebarWidth;
    transition: width 0.28s;
    background-color: $menuBg;
    box-sizing: border-box;
  }

  .main-container {
    transition: padding-left .28s;
    padding-left: $sidebarWidth;
    position: relative;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    // padding-top: 82px;

    // .fixed-header {
    //   position: fixed;
    //   top: 0;
    // }
  }
}

.hideSidebar {
  .sidebar-container {
    width: 64px;
  }

  .main-container {
    padding-left: 64px;
    // width: calc(100% - 54px)
  }
}
</style>