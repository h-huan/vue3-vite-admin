

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }


export default defineComponent({
  name: 'dictDetail',
  setup() {
    const loading = ref(false)
    const state = reactive({
      title: '',
      data: [
        { id: '1', name: 'user_status', label: '激活', value: 'true', dictSort: '1' },
        { id: '2', name: 'user_status', label: '禁用', value: 'false', dictSort: '2' },
      ],
      multipleSelection: [],
      form: {
        label: '',
        value: '',
        dictSort: '',
      }, rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      } as FormRules,
      pagination: defaultPagination,
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
  <div>
    <!-- <div v-if="query.dictName === ''">
      <div class="my-code">点击字典查看详情</div>
    </div> -->
    <!-- <div v-else> -->
    <div>
      <!--表单组件-->
      <el-dialog append-to-body :close-on-click-modal="false" :title="title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="字典标签" prop="label">
            <el-input v-model="form.label" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="字典值" prop="value">
            <el-input v-model="form.value" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="排序" prop="dictSort">
            <el-input-number v-model.number="form.dictSort" :min="0" :max="999" controls-position="right"
              style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text">取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="loading" :data="data" highlight-current-row style="width: 100%;"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column label="所属字典">
          {{ query.dictName }}
        </el-table-column> -->
        <el-table-column prop="name" label="所属字典" />
        <el-table-column prop="label" label="字典标签" />
        <el-table-column prop="value" label="字典值" />
        <el-table-column prop="dictSort" label="排序" />
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
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
