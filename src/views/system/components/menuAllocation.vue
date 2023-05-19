<!--
 * @Author: h-huan
 * @Date: 2023-04-27 09:59:41
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-12 09:38:40
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
// import { getMenus } from '/@/api/system/menu'


interface Tree {
  nodeName: string
  nodeId: number
}
const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }
export default defineComponent({
  name: 'menuAllocation',
  props: {
    menuCheck: {
      type: Array,
      default: []
    }
  },
  setup(props, centext) {
    const loading = ref(true)
    const treeRef = ref(null)

    const state = reactive({
      data: [],
      pagination: defaultPagination,
      multipleSelection: [],
      nodeIdArr: [],
      props: {
        children: "menuChildList",
        label: "nodeName"
      }
    })


    // 获取菜单列表
    const getMenuList = (pageNum?: number, pageSize?: number) => {
      // getMenus({ pageNum, pageSize }).then(res => {
      //   state.data = res.data.list
      //   loading.value = false
      // })
    }
    getMenuList(state.pagination.pageNum, state.pagination.pageSize)

    watch(() => props.menuCheck, (count, prevCount) => {
      treeRef.value!.setCheckedKeys([], false)
      setCheckedKeys(count)
    })

    // 添加权限
    const addRoleMenu = () => {
      getCheckedKeys()
      centext.emit('addRoleMenu', state.nodeIdArr)
    }

    const getCheckedKeys = () => {
      state.nodeIdArr = []
      treeRef.value!.getCheckedKeys(false).forEach((item) => {
        state.nodeIdArr.push({ nodeId: item })
      })
    }

    const setCheckedKeys = (arr) => {
      treeRef.value!.setCheckedKeys(arr, false)
    }


    return {
      loading,
      addRoleMenu,
      treeRef,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header" style="display: flex;justify-content: space-between;align-items: center;">
        <span>菜单分配</span>
        <el-button type="primary" @click="addRoleMenu"><i class="iconfont icon-zengjia"></i>保存</el-button>
      </div>
    </template>
    <el-tree v-loading="loading" :data="data" :props="props" node-key="nodeId" show-checkbox ref="treeRef" />
  </el-card>
</template>

<style lang="scss" scoped></style>