<!--
 * @Author: h-huan
 * @Date: 2023-04-06 19:41:47
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-19 14:29:50
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'NavBar',
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
  <div class="navbar">
    <div class="hamburger-container"></div>
    <div class="breadcrumb-container"></div>
    <div class="right-menu">
      <!-- <search id="header-search" class="right-menu-item" /> -->
      <el-tooltip content="搜索" effect="dark" placement="bottom"></el-tooltip>
      <el-tooltip content="全屏缩放" effect="dark" placement="bottom"></el-tooltip>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img href="" class="user-avatar" alt="用户头像">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/center">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <span style="display:block;">
            <el-dropdown-item divided>
              退出登录
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>