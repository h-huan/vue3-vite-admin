<!--
 * @Author: h-huan
 * @Date: 2023-04-26 10:42:16
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-30 16:35:02
 * @Description: 
-->

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { ElTable } from 'element-plus'
import { getMenuList } from "/@/api/system/menu";

const defaultForm = { roleName: null, description: null, }
const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }

export default defineComponent({
  name: 'role',
  // components: { menuAllocation },
  setup() {
    const ruleFormRef = ref<FormInstance>()  //表单
    const loading = ref(false)

    const state = reactive({
      query: {
        username: ''
      },
      defaultProps: {
        children: "childrens",
        label: "title"
      },
      pagination: defaultPagination,
      data: [
        { id: '1', name: '超级管理员', dataScope: '全部权限', level: '1', description: '', createTime: '2023-6-30' },
        { id: '2', name: 'test', dataScope: '部分权限', level: '1', description: '', createTime: '2023-6-30' },
      ],
      dialogVisible: false,
      dialogTitle: '新增',
      form: defaultForm,
      rules: {
        roleName: { required: true, message: '请输入名称', trigger: 'blur' },
      } as FormRules,
      multipleSelection: [],
      treeData: []

    })

    // 获取角色列表
    const getRoleList = (pageNum, pageSize) => {
    }
    getRoleList(state.pagination.pageNum, state.pagination.pageSize)


    // 多选
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    }
    // 关闭提示
    // const handleClose = (done: () => void) => {
    //   done()
    //   state.form = defaultForm
    // }
    // 提交表单
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = Object.assign({}, state.form)

        } else {
          console.log('error submit!', fields)
        }
      })
    }
    // 重置表单
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    // 分页
    const handleSizeChange = (val: number) => {
      state.pagination.pageSize = val
      getRoleList(state.pagination.pageNum, val)
    }
    const handleCurrentChange = (val: number) => {
      state.pagination.pageNum = val
      getRoleList(val, state.pagination.pageSize)
    }

    const addRoleMenu = (menuList) => {

    }

    // 获取菜单列表
    const getMenuLists = () => {
      getMenuList().then((res: any) => {
        if (res.code == 200) state.treeData = res.data
        loading.value = false
      })

    }
    getMenuLists()
    // 获取选择的树
    const handleCheckChange = (
      data,
      checked,
      indeterminate
    ) => {
      console.log(data, checked, indeterminate)
    }

    return {
      loading,
      ruleFormRef,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      addRoleMenu,
      resetForm,
      submitForm,
      handleCheckChange,
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
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>角色列表</span>
            </div>
          </template>
          <div class="table">
            <el-table v-loading="loading" :data="data" style="width: 100%" @selection-change="handleSelectionChange"
              row-key="roleId" reserve-selection="false">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="dataScope" label="数据权限" />
              <el-table-column prop="level" label="角色级别" />
              <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
              <el-table-column :show-overflow-tooltip="true" width="135px" prop="createTime" label="创建日期" />
              <el-table-column label="操作" width="150px" align="center">
                <template #default="scope">
                  <div>
                    <el-button type="primary" class="filter-item"><i class="iconfont icon-xiugai"></i></el-button>
                    <el-button type="danger" class="filter-item"><i class="iconfont icon-shanchu"></i></el-button>
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
        </el-card>
      </el-col>
      <!-- 菜单分配 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>菜单分配</span>
              <el-button type="primary" style="float: right;">保存</el-button>
            </div>
          </template>
          <!-- <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange" /> -->
          <el-tree :data="treeData" :props="defaultProps" node-key="id" show-checkbox @check-change="handleCheckChange" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" :rows="2" type="textarea" placeholder="描述" />
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