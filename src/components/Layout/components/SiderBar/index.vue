<!--
 * @Author: h-huan
 * @Date: 2023-04-06 14:58:55
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-16 15:26:19
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStates } from "/@/hooks/useStore";
import { getMenuList } from "/@/api/system/menu";

export default defineComponent({
  name: 'SideBar',
  setup() {
    const appState: any = useStates('App', ['sidebar'])
    // const router = useRouter();


    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });

    const state = reactive({
      menuActive: onRoutes,
      collapse: appState.sidebar,
      menuLists: [] as any,
    })



    watch(route, async (newQuestion) => {
      console.log('newQuestion', newQuestion);


    })
    getMenuList().then((res: any) => {
      // if (res.code == 200) state.menuLists = res.data
      state.menuLists = [
        { text: '首页', icon: "icon-shouye", url: "/dashboard" },
        {
          text: '系统管理', icon: "icon-shezhi", url: '/system', childrens: [
            { name: '用户管理', icon: "icon-yonghu", url: "/user" },
            { name: '角色管理', icon: "icon-role-list", url: "/role" },
            { name: '菜单管理', icon: "icon-caidan1", url: "/menu" },
            { name: '字典管理', icon: "icon-caidan1", url: "/dict" }
          ]
        },
        { text: '图标库', icon: "icon-caidan", url: "", },
        {
          text: '组件管理', icon: "icon-caidan", url: '/components', childrens: [
            { name: 'MarkDown', icon: "icon-yonghu1", url: "/MarkDown" },
          ]
        },
        { text: '测试', icon: "icon-caidan", url: "/test", },
      ]
    })

    return {
      onRoutes,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="has-logo">
    <div class="logo-container">
      <router-link to="/">
        <img src="/images/logo.png" alt="logo" class="sidebar-logo">
        <h1 v-if="collapse" class="sidebar-title">admin管理系统</h1>
      </router-link>
    </div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu :default-active="onRoutes" background-color="#1F223A" text-color="#E7F0FF" :collapse-transition="false"
        :collapse="!collapse" router class="hh-menu" unique-opened>
        <template v-for="(item) in menuLists" :key="index">
          <el-sub-menu v-if="item.childrens" :index="item.url" class="hh-menu-item">
            <template #title>
              <i :class="[item.icon ? item.icon : '', 'iconfont']" class="hh-menu-icon"></i>
              <span class="hh-menu_text">{{ item.text }}</span>
            </template>
            <el-menu-item v-for="(itemTwo, jndex) in item.childrens" :key="jndex" :index="itemTwo.url"
              class="hh-menu-item">
              <i :class="[itemTwo.icon ? itemTwo.icon : '', 'iconfont']" class="hh-menu-icon"></i>
              <span class="hh-menu_text">{{ (itemTwo as any).name }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item :index="item.url" v-else class="hh-menu-item">
            <i :class="[item.icon ? item.icon : '', 'iconfont']" class="hh-menu-icon"></i>
            <template #title>
              <span class="hh-menu_text">{{ item.text }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.has-logo {
  z-index: 99;
}

.logo-container {
  height: $headerHeight;
  width: 100%;
  text-align: center;
  line-height: $headerHeight;
  font-weight: bold;
  font-size: $font-size-side;
  box-sizing: border-box;
  color: $white-side;

  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin-right: 6px;
  }

  .sidebar-title {
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}

.hh-menu-item {

  .hh-menu_text {
    font-size: $font-size;
    padding-left: 10px;
  }

  .hh-menu-icon {
    font-size: $font-size-side;
  }

}

.hh-menu {
  border-right: 0;
}
</style>