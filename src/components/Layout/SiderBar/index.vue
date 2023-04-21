<!--
 * @Author: h-huan
 * @Date: 2023-04-06 14:58:55
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-19 19:02:00
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SideBar',
  components: {

  },
  setup() {
    const router = useRouter();
    const state = reactive({
      menuActive: router.currentRoute.value.path,
      collapse: false,
      slidebarLists: [
        { text: '首页', icon: "icon-shouye", url: "/dashboard" },
        {
          text: '系统管理', icon: "icon-shezhi", url: "", childrens: [
            { name: '用户管理', icon: "icon-yonghu", url: "" },
            { name: '角色管理', icon: "icon-role-list", url: "" },
            { name: '菜单管理', icon: "icon-caidan1", url: "" },
            { name: '字典管理', icon: "icon-caidan1", url: "" }
          ]
        },
        { text: '图标库', icon: "icon-caidan", url: "", },
        { text: '组件管理', icon: "icon-caidan", url: "", }

      ] as any,
    })

    const isCollapse = () => {
      return !state.collapse
    }
    return {
      isCollapse,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="has-logo">
    <i class="el-icon-info"></i>
    <div class="logo">admin管理系统</div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu :default-active="menuActive" background-color="#1F223A" text-color="#E7F0FF" active-text-color=""
        :collapse-transition="true" :collapse="collapse" router class="hh-menu">
        <template v-for="(item, index) in slidebarLists" :key="index">
          <el-sub-menu v-if="item.childrens" index="" class="hh-menu-item">
            <template #title>
              <i :class="[item.icon ? item.icon : '', 'iconfont']" class="hh-menu-icon"></i>
              <span class="hh-menu_text">{{ item.text }}</span>
            </template>
            <el-menu-item v-for="(itemTwo, jndex) in item.childrens" :key="jndex" :index="itemTwo['url']"
              class="hh-menu-item">
              <i :class="[itemTwo['icon'] ? itemTwo['icon'] : '', 'iconfont']" class="hh-menu-icon"></i>
              <span class="hh-menu_text hh-menu_subText">{{ (itemTwo as any).name }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item :index="item.url" v-else class="hh-menu-item">
            <i :class="[item.icon ? item.icon : '', 'iconfont']" class="hh-menu-icon"></i>
            <span class="hh-menu_text">{{ item.text }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  height: $headerHeight;
  width: $sidebarWidth;
  text-align: center;
  line-height: $headerHeight;
  font-weight: bold;
  font-size: $font-side-logo;
  box-sizing: border-box;
  color: $white-side;
}

.hh-menu-item {

  .hh-menu_text {
    font-size: $font-size;
    padding-left: 10px;
  }

  .hh-menu-icon {
    font-size: $font-menu-icon;
  }


}

.hh-menu {
  border-right: 0;
}
</style>