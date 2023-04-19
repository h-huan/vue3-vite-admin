<!--
 * @Author: h-huan
 * @Date: 2023-04-02 16:58:47
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-19 16:50:59
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import SideBar from './SiderBar/index.vue'
import NavBar from './NavBar.vue'
import TagsView from './TagsView.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    SideBar,
    NavBar
  },
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
  <div class="app-wrapper">
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
@import "/@/styles/mixins.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  .sidebar-container {
    @include clearfix;
    position: fixed;
    top: 0;
    bottom: 0;
    width: $sidebarWidth;
    transition: width 0.28s;
    height: 100%;
    overflow: height;
    background-color: $menuBg;
  }

  .main-container {
    transition: margin-left .28s;
    margin-left: $sidebarWidth;
    position: relative;
    min-height: 100%;
  }
}
</style>