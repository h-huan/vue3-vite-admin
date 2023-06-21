<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { ElMessage } from 'element-plus'
// import { sliceTime } from '/@/utils/index'
// import SideBar from '/@/components/SiderBar/index.vue'

const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }
export default defineComponent({
  name: '',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    roleObj: {
      type: Object,
      default: {},
    }
  },
  // components: { SearchView },
  emits: ['submit', 'close'],
  setup(props, context) {
    const loading = ref(false)
    const tableRef = ref();

    const state = reactive({
      pagination: defaultPagination,
      data: [
        { nickName: 'test1', personloginname: 'test2' },
        { nickName: 'test2', personloginname: 'test2' },
      ],
      searchValue: '',
      // selectAll: false,  // 全选
      selectArr: {}, // 选择行
    })

    // 获取data
    const getdataList = () => {
      // loading.value = true;
    }

    getdataList();

    // dialog 初始化的时候会获取不到 ref
    const opened = () => { }

    // 根据名字搜索
    const getSearch = (val) => {
      if (val === '') return getdataList()
      state.searchValue = val
      // 过滤执行字段
      // state.data = state.data.filter(item => {
      //   if (item.name.indexOf(state.searchValue) > -1) {
      //     return item
      //   }
      // })
    }

    //  获取点击多选框时用 @select  获取多选框改变 selection-change
    // 获取表格勾选
    const selectClick = (selection: any, row) => {
      console.log('勾选值', selection);

      // 单选  selectArr 改成对象
      tableRef.value!.clearSelection()
      if (selection.length == 0) return;
      tableRef.value.toggleRowSelection(row, true);
      state.selectArr = row

      // // 多选  selectArr 改成数组
      // state.selectArr = selection

    }

    // 分页
    const handleSizeChange = (val: number) => {
      console.log('当前页显示多少条数据', val);
    }

    const handleCurrentChange = (val: number) => {
      console.log('当前第几页', val);
    }

    // 全选
    // const setCheckboxAll = () => {
    //   let _check = state.selectAll == true ? false : true;
    //   state.data.forEach(item => {
    //     tableRef.value!.toggleRowSelection(item, _check);
    //   })
    // }

    // 确认删除
    const confirmEvent = (id?: string) => {
      console.log('确认删除判断');

      // 删除单个
      deleteRoleUser()

    }

    // 删除角色下用户
    const deleteRoleUser = () => {
      console.log('调用删除接口');
    }

    // 当dialog时使用  关闭弹框
    const handleClose = () => {
      context.emit('close')
    }
    // 当dialog时使用  提交数据
    const submit = () => {
      let data = {}
      // ElMessage.warning('请选择一条信息')
      context.emit('submit', data)
    }

    return {
      tableRef,
      loading,
      confirmEvent,
      opened,
      getSearch,
      selectClick,
      // setCheckboxAll,
      handleSizeChange,
      handleCurrentChange,
      handleClose,
      submit,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="head-container">
    <SearchView @search="getSearch" placeholder="请输入搜索内容"></SearchView>
  </div>
  <el-table ref="tableRef" v-loading="loading" :data="data" style="width: 100%" @select="selectClick">
    <el-table-column type="selection" width="55" sortable />
    <el-table-column prop="nickName" label="昵称" align="center" />
    <el-table-column prop="personloginname" label="用户名" align="center" />
    <!-- <el-table-column prop="crtTime" label="创建时间" align="center">
        <template #default="scope">
          <span>{{ sliceTime(scope.row.crtTime) }}</span>
        </template>
      </el-table-column> -->
    <el-table-column label="操作" width="150px" align="center" fixed="right">
      <template #default="scope">
        <div>
          <el-popconfirm title="是否确认删除？" @confirm="confirmEvent(scope.row.personid)">
            <template #reference>
              <el-button><i class="iconfont icon-btn-shanchu1"></i></el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <div>
      <!-- <el-checkbox label="全选" name="type" v-model="selectAll" @click="setCheckboxAll" /> -->
      <!-- <el-popconfirm title="是否确认删除？" @confirm="confirmEvent()">
        <template #reference>
          <el-button class="pagination-but">批量删除账号</el-button>
        </template>
      </el-popconfirm> -->
    </div>
    <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes" :small="false" :disabled="false" :background="false"
      layout="sizes, prev, pager, next" :total="pagination.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
  <!-- dialog时使用 -->
  <div class="opts">
    <el-button type="primary" @click="submit">确认</el-button>
    <el-button @click="handleClose">取消</el-button>
  </div>
</template>

<style lang="scss" scoped>
.head-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  .pagination-but {
    margin-left: 20px;
  }
}

.opts {
  display: flex;
  justify-content: flex-end;
}
</style>