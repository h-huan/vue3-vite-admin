<!--
 * @Author: h-huan
 * @Date: 2023-04-26 10:43:04
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-30 15:27:14
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, nextTick } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getUserList } from "/@/api/system/user";

const defaultForm = { username: null, nickName: null, gender: null, email: null }
const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }

export default defineComponent({
  name: 'user',
  setup() {
    const ruleFormRef = ref<FormInstance>()

    const loading = ref(true)

    const state = reactive({
      tableData: [],
      form: defaultForm,
      multipleSelection: {},

      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请输入性别', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
      } as FormRules,
      pagination: defaultPagination,
      dialogVisible: false,
      query: {
        username: ''
      }
    })

    // 获取用户列表
    const getUserLists = async () => {
      await nextTick()
      getUserList().then((res: any) => {
        state.tableData = res.data
        loading.value = false
      })
    }
    getUserLists()

    // 分页
    const handleSizeChange = (val: number) => {
      getUserLists()
    }
    const handleCurrentChange = (val: number) => {
      getUserLists()
    }

    const toEdit = (data) => {
      state.dialogVisible = true
      state.form = Object.assign({}, data);
    }
    // 提交表单
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = Object.assign({}, state.form)
          console.log('提交成功', data)

        } else {
          console.log('error submit!', fields)
        }
      })
    }
    // 重置表单
    const resetForm = (formEl: FormInstance | undefined) => {
      console.log('重置表单')
      if (!formEl) return
      formEl.resetFields()
    }



    const open = () => {
      ElMessageBox.confirm(
        '是否确认删除',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        })
        .catch(() => {

        })
    }
    // 多选
    const handleSelectionChange = (val) => {

      state.multipleSelection = val;
    }
    return {
      loading,
      ruleFormRef,
      handleSizeChange,
      handleCurrentChange,
      toEdit,
      open,
      submitForm,
      resetForm,
      handleSelectionChange,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="app-container">
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
          <el-button type="success" class="filter-item" @click="dialogVisible = true"><template #icon><i
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
    <div class="table">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" sortable />
        <el-table-column prop="username" label="用户" align="center" />
        <el-table-column prop="nickName" label="昵称" align="center" />
        <el-table-column prop="gender" label="性别" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="enabled" label="启用" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.enabled" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="primary" class="filter-item" @click="toEdit(scope.row)"><i
                  class="iconfont icon-xiugai"></i></el-button>
              <el-button type="danger" class="filter-item" @click="open"><i class="iconfont icon-shanchu"></i></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
        :page-sizes="pagination.pageSizes" :small="false" :disabled="false" :background="false"
        layout="sizes, prev, pager, next" :total="pagination.total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <el-dialog v-model="dialogVisible" title="修改" width="500px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" type="text" placeholder="用户" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" type="text" placeholder="昵称" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" type="text" placeholder="性别" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="text" placeholder="邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>