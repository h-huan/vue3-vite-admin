

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import dictDetail from "./dictDetail.vue";

const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }

export default defineComponent({
  name: 'dict',
  components: {
    dictDetail
  },
  setup() {
    const loading = ref(false)

    const state = reactive({
      data: [
        { id: '1', name: 'job_status', description: '岗位状态' },
        { id: '2', name: 'user_status', description: '用户状态' },
      ],
      multipleSelection: [],
      pagination: defaultPagination,
      query: {
        username: ''
      }
    })

    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    }
    const handleSizeChange = (val: number) => {
      state.pagination.pageSize = val
      console.log('当前页展示数据', val);
    }
    const handleCurrentChange = (val: number) => {
      state.pagination.pageNum = val
      console.log('当前第几页', val);
    }

    return {
      loading,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      ...toRefs(state)
    }
  }
})
</script>
<template>
  <div class="app-container">
    <!-- 字典列表 -->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="10" :lg="11" :xl="11" style="margin-bottom: 10px">
        <el-card class="box-card">
          <!--工具栏-->
          <div class="head-container">
            <div class="crud-search">
              <el-input v-model="query.username" clearable placeholder="输入名称" style="width: 200px;" class="filter-item" />
              <el-button type="success" class="filter-item"><template #icon><i
                    class="iconfont icon-sousuo"></i></template>搜索</el-button>
              <el-button type="warning" class="filter-item"><template #icon><i
                    class="iconfont icon-zhongzhi"></i></template>重置</el-button>
            </div>
            <div class="crud-opts">
              <span class="crud-opts-left">
                <el-button type="primary" class="filter-item">
                  <template #icon>
                    <i class="iconfont icon-xinzeng"></i>
                  </template>
                  新增</el-button>
                <el-button type="success" class="filter-item"><template #icon><i
                      class="iconfont icon-xiugai"></i></template>修改</el-button>
                <el-button type="danger" class="filter-item"><template #icon><i
                      class="iconfont icon-shanchu"></i></template>删除</el-button>
                <el-button type="warning" class="filter-item"><template #icon><i
                      class="iconfont icon-daoru"></i></template>导出</el-button>
              </span>
              <div class="crud-opts-right">
                <el-button><i class="iconfont icon-sousuo"></i></el-button>
                <el-button><i class="iconfont icon-zhongzhi"></i></el-button>
                <el-button><i class="iconfont icon-nine-squares-full"></i></el-button>
              </div>
            </div>
          </div>
          <!--表格渲染-->
          <el-table ref="table" v-loading="loading" :data="data" highlight-current-row style="width: 100%;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" />
            <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
            <el-table-column label="操作" width="150px" align="center" fixed="right">
              <template #default="scope">
                <div>
                  <el-button type="primary" class="filter-item"><i class="iconfont icon-xiugai"></i></el-button>
                  <el-button type="danger" class="filter-item"><i class="iconfont icon-shanchu"></i></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <div class="pagination">
            <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
              :page-sizes="pagination.pageSizes" :small="false" :disabled="false" :background="false"
              layout="sizes, prev, pager, next" :total="pagination.total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </el-card>
      </el-col>
      <!-- 字典详情列表 -->
      <el-col :xs="24" :sm="24" :md="14" :lg="13" :xl="13">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>字典详情</span>
              <el-button type="primary" style="float: right;">新增</el-button>
            </div>
          </template>
          <dictDetail ref="dictDetail" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>





<style lang="scss" scoped></style>
