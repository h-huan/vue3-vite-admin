
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
// import font from "/font/iconfont.json";
import { getJson } from "/@/api/data.js";




export default defineComponent({
  name: 'IconSelect',
  setup(props, { attrs, slots, emit, expose }) {

    const state = reactive({
      name: '',
      iconLists: [],
      iconListFilter: [],  // 
      prefixText: ''
    })

    const getIconList = () => {
      getJson('/font/iconfont.json').then((res: any) => {
        state.prefixText = res?.css_prefix_text
        state.iconLists = res?.glyphs
        state.iconListFilter = state.iconLists
      })
    }
    getIconList()

    const filterIcons = () => {
      // state.iconList = icons
      // getIconList()
      if (state.name) {
        state.iconListFilter = state.iconLists.filter(item => item.name.indexOf(state.name) != -1)
      }
    }

    const selectedIcon = (name) => {
      emit('selected', (state.prefixText + name))
      document.body.click()
      getIconList()
      state.name = ''
    }
    const reset = () => {
      state.name = ''
      // state.iconList = icons
      getIconList()
    }
    return {
      filterIcons,
      selectedIcon,
      reset,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="icon-body">
    <el-input v-model="name" style="position: relative;width: 100%" clearable placeholder="请输入图标名称" @clear="filterIcons"
      @input.native="filterIcons">
      <template #prefix>
        <i slot="suffix" class="iconfont icon-sousuo" />
      </template>
    </el-input>
    <!-- <i class="iconfont icon-xiaoxi"></i> -->
    <!-- <i class="iconfont btn-shezhi"></i> -->
    <div class="icon-list">
      <div v-for="(item, index) in iconListFilter" :key="index" @click="selectedIcon(item.font_class)" class="icon-item">
        <!-- <svg-icon :icon-class="item" style="height: 30px;width: 16px;" /> -->
        <i class="iconfont" :class="[item.font_class ? 'icon-' + item.font_class : '']"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-list {
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  max-height: 200px;
  overflow-y: auto;
  // grid-gap: 10px;
  // justify-self: center;

  // display: grid;
  // grid-auto-columns: 100px;
  // grid-auto-flow: column;
  // grid-gap: 5px;
  // grid-template-rows: 50px 50px;

  .icon-item {
    text-align: center;
    margin-bottom: 15px;
  }

  i {
    display: inline-block;
    color: #333333;
    margin-bottom: 5px;

  }

  span {
    display: block;
  }
}
</style>