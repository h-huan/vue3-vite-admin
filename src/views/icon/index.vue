<!--
 * @Author: h-huan
 * @Date: 2023-04-24 16:11:58
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-30 17:31:03
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
// import font from "/font/iconfont.json";
import { getJson } from "/@/api/data.js";
import SearchView from '/@/components/Search/index.vue'

export default defineComponent({
  name: 'Icon',
  components: {
    SearchView
  },
  setup(props, { attrs, slots, emit, expose }) {
    const state = reactive({
      iconList: [] as any,
      prefixText: '',
      useMethod: '<i class="iconfont icon-shezhi"></i>'
    })

    const getIconList = () => {
      getJson('/font/iconfont.json').then((res: any) => {
        state.prefixText = res.css_prefix_text
        state.iconList = res.glyphs
      })
    }
    getIconList()

    // 根据名字搜索
    const getSearch = (val) => {
      if (val) {
        state.iconList = state.iconList.filter((item: any) => item.font_class.includes(val))
      } else {
        getIconList()
      }
    }

    return {
      getSearch,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="app-container">
    <div class="useMethod">
      <div class="title">使用方法</div>
      <p class="item ">通过使用类名来使用</p>
      <!--  -->
      <div class="useMethod-item item">
        <i class="iconfont icon-shezhi"></i><span>{{ useMethod }}</span>
      </div>
    </div>
    <div class="search">
      <SearchView @search="getSearch" placeholder="请输入搜索内容"></SearchView>
    </div>

    <!-- <i class="iconfont btn-shezhi"></i> -->
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" class="icon-item">
        <!-- <svg-icon :icon-class="item" style="height: 30px;width: 16px;" /> -->
        <i class="iconfont" :class="[item.font_class ? 'icon-' + item.font_class : '']"></i>
        <span>icon-{{ item.font_class }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.useMethod {
  color: #333;

  .title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .item {
    margin-bottom: 20px;
  }


}

.search {
  width: 400px;
  margin: 0 auto 20px;
}

.icon-list {
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  height: 100%;

  .icon-item {
    text-align: center;
    margin-bottom: 15px;
  }

  i {
    display: inline-block;
    color: #333333;
    font-size: 20px;
    margin-bottom: 5px;

  }

  span {
    display: block;
  }
}
</style>