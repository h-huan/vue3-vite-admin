<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Search',
  props: {
    butName: {
      type: String,
      default: '搜索'
    },
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  emits: ['search'],
  setup(props, content) {
    const state = reactive({
      searchValue: '',
    })
    const getSearch = () => {
      content.emit('search', state.searchValue)
    }
    return {
      getSearch,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="search">
    <el-input v-model="searchValue" :placeholder="placeholder" clearable>
      <template #prefix>
        <i class="iconfont icon-sousuo"></i>
      </template>
      <template #append>
        <el-button type="primary" @click="getSearch">{{ butName }}</el-button>
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped></style>