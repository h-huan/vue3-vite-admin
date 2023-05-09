<!--
 * @Author: h-huan
 * @Date: 2023-04-06 19:41:47
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 17:27:06
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Breadcrumb from '/@/components/Breadcrumb/index.vue'
import Screenfull from '/@/components/Screenfull/index.vue'
import { ElMessageBox, ElNotification } from "element-plus";
import { useState, useActions } from "/@/hooks/useStore";
import { useRouter } from "vue-router";


export default defineComponent({
  name: 'NavBar',
  components: {
    Breadcrumb,
    Screenfull
  },
  setup() {
    const userActions: any = useActions('User', ['LogOut'])
    const appActions: any = useActions('App', ['toggleSideBar'])
    const appState: any = useState('App', ['sidebar'])

    const router = useRouter()

    const state = reactive({
      sidebar: appState.sidebar
    })

    const toggleSideBar = () => {
      appActions.toggleSideBar()
    }

    // 退出登录
    const open = () => {
      ElMessageBox.confirm(
        '是否退出登录?',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        logout()
      })
    }
    const logout = () => {
      ElNotification.success('账户退出')
      userActions.LogOut()
      router.push({ path: '/login' })
    }
    return {
      appState,
      open,
      toggleSideBar,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="navbar">
    <div class="hamburger-container" @click="toggleSideBar">
      <i class="iconfont" :class="[sidebar ? 'icon-zhedie-shouqi' : 'icon-zhedie-zhankai']"></i>
    </div>
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>
    <div class="right-menu">
      <!-- <search id="header-search" class="right-menu-item" /> -->
      <!-- <el-tooltip content="搜索" effect="dark" placement="bottom">
        <i class="iconfont icon-sousuo"></i>
      </el-tooltip> -->
      <el-tooltip content="全屏缩放" effect="dark" placement="bottom">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="/images/avatar.png" class="user-avatar" alt="用户头像">
          <i class="iconfont icon-xiajiantou" />
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <router-link to="">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <span style="display:block;" @click="open">
              <el-dropdown-item divided>
                退出登录
              </el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.navbar {
  height: $headerHeight;
  overflow: hidden;
  position: relative;
  background: $white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;
    vertical-align: middle;
    width: 20px;
    height: 20px;

    &.iconfont {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .icon-xiajiantou {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>