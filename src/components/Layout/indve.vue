<!--
 * @Author: h-huan
 * @Date: 2023-04-02 16:58:47
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 15:00:11
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import SideBar from './components/SiderBar/index.vue'
import NavBar from './components/NavBar.vue'
import TagsView from './components/TagsView.vue'
import { useState } from "/@/hooks/useStore";

export default defineComponent({
  name: 'Layout',
  components: {
    SideBar,
    NavBar,
    TagsView
  },
  setup() {

    const appState: any = useState('App', ['sidebar'])
    const state = reactive({
      hideSidebar: appState.sidebar
    })
    return {
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
        <router-view></router-view>
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