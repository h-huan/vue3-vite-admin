<!--
 * @Author: h-huan
 * @Date: 2023-04-26 10:42:36
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-27 15:31:08
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, nextTick } from 'vue'
import type { FormInstance, FormRules, ElTable } from 'element-plus'
import { ElNotification } from 'element-plus'
import { add, del, getGroupListPage, addGroupRoleList } from '/@/api/system/group'
import { getRoleListPage } from '/@/api/system/role'

const defaultForm = { groupName: null, description: null, }
const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }
export default defineComponent({
  name: 'group',
  setup() {
    const ruleFormRef = ref<FormInstance>()  //表单
    const multipleTableRef = ref<InstanceType<typeof ElTable>>()


    const loading = ref(true)
    const loadingRole = ref(true)

    const state = reactive({
      dialogVisible: false,
      dialogTitle: '新增',
      selectRowObject: {} as any,
      data: [],
      pagination: defaultPagination,
      multipleSelection: [],
      dataRole: [],
      paginationRole: defaultPagination,
      multipleSelectionRole: [],
      form: defaultForm,
      rules: {
        groupName: { required: true, message: '请输入名称', trigger: 'blur' },
      } as FormRules,
    })

    // 获取菜单列表
    const getGroupList = (pageNum, pageSize) => {
      getGroupListPage({ pageNum, pageSize }).then((res: any) => {
        state.dialogVisible = false
        state.form = defaultForm
        state.data = res.data.list
        loading.value = false
      })
    }
    getGroupList(state.pagination.pageNum, state.pagination.pageSize)
    // 获取角色菜单
    const getRoleList = (pageNum?: number, pageSize?: number) => {
      getRoleListPage({ pageNum, pageSize }).then(res => {
        state.dataRole = res.data.list
        loadingRole.value = false
      })
    }
    getRoleList(state.paginationRole.pageNum, state.paginationRole.pageSize)
    // 新增
    const toAdd = () => {
      state.dialogTitle = "新增"
      state.form = defaultForm
      state.dialogVisible = true
    }
    // 编辑
    const toEdit = (data) => {
      state.dialogTitle = "修改"
      state.form = Object.assign({}, data)
      state.dialogVisible = true
    }
    // 删除全选组
    const toDel = (id?: number) => {
      if (id) {
        del({ groupId: id }).then((res: any) => {
          if (res.code === 0) {
            getGroupList(state.pagination.pageNum, state.pagination.pageSize)
            ElNotification.success('删除成功')
            return
          }
          ElNotification.success('添加失败')
        })
      }
    }
    // 多选
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    }
    // 角色多选
    const handleSelectionChangeRole = (val) => {
      let arr = []
      val.forEach(item => {
        arr.push({ roleId: item.roleId })
      });
      state.multipleSelectionRole = arr;
    }
    // 关闭提示
    const handleClose = (done: () => void) => {
      done()
      state.form = defaultForm
    }
    // 提交表单
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = Object.assign({}, state.form)
          // if (data.nodeId) {
          // delete data['menuChildList'];
          // edit(data).then((res: any) => {
          //   if (res.code === 0) ElNotification.success('菜单修改成功')
          //   getGroupList(state.pagination.pageNum, state.pagination.pageSize)
          // })
          // } else {
          add(data).then((res: any) => {
            if (res.code === 0) ElNotification.success('权限组添加成功')
            getGroupList(state.pagination.pageNum, state.pagination.pageSize)
          })
          // }
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    // 重置
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    // 删除判断
    const confirmEvent = (id?: number) => {
      toDel(id)
    }
    // 分页
    const handleSizeChange = (val: number) => {
      state.pagination.pageSize = val
      getGroupList(state.pagination.pageNum, val)
    }
    const handleCurrentChange = (val: number) => {
      state.pagination.pageNum = val
      getGroupList(val, state.pagination.pageSize)
    }
    // 角色分组
    const handleSizeChangeRole = (val: number) => {
      state.paginationRole.pageSize = val
      getRoleList(state.paginationRole.pageNum, val)
    }

    const handleCurrentChangeRole = (val: number) => {
      state.paginationRole.pageNum = val
      if (state.multipleSelectionRole) {
        addGroupRole() // 将当前页设置的权限添加进去
      }
      getRoleList(val, state.paginationRole.pageSize)
    }

    // 选中表格行
    const selectRow = (row, column, event) => {
      state.selectRowObject = row;
      multipleTableRef.value!.clearSelection()

      if (row.roleIds) {
        let arr = row.roleIds.split(',')
        state.dataRole.forEach((item, index) => {
          arr.some(i => {
            if (parseInt(i) === item.roleId) {
              multipleTableRef.value.toggleRowSelection(item, true)
            }
          })
        })
      }
    }

    // 修改选中行样式
    const rowStyle = ({ row }) => {
      if (state.selectRowObject['groupName'] === row.groupName) {
        return { 'background-color': '#F7F8FA', cursor: 'pointer' };
      }
      return { cursor: 'pointer' };
    }

    // 给权限树添加角色
    const addGroupRole = () => {
      const data = { groupId: state.selectRowObject.groupId, roleList: state.multipleSelectionRole }
      addGroupRoleList(data).then((res: any) => {
        if (res.code === 0) {

          state.selectRowObject = {}
          getGroupList(state.pagination.pageNum, state.pagination.pageSize)
          getRoleList(state.paginationRole.pageNum, state.paginationRole.pageSize)
          ElNotification.success('角色权限添加成功')
        } else {
          ElNotification.warning('请选择对应权限组')
        }
      })
    }

    return {
      toAdd,
      toEdit,
      toDel,
      handleSelectionChange,
      handleClose,
      submitForm,
      resetForm,
      ruleFormRef,
      confirmEvent,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChangeRole,
      handleSizeChangeRole,
      handleCurrentChangeRole,
      selectRow,
      rowStyle,
      addGroupRole,
      loading,
      loadingRole,
      multipleTableRef,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="class-box">
    <div class="tool-wrapper">
      <div class="tool-tip">
        <el-button type="primary" @click="toAdd"><i class="iconfont icon-zengjia"></i>新增权限组</el-button>
      </div>
    </div>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>权限组列表</span>
            </div>
          </template>
          <div class="table">
            <el-table v-loading="loading" :data="data" style="width: 100%" @selection-change="handleSelectionChange"
              row-key="nodeId" :tree-props="{ children: 'menuChildList' }" @row-click="selectRow" :row-style="rowStyle">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="groupName" label="名称" align="center" />
              <el-table-column prop="description" label="描述" align="center" />
              <!-- <el-table-column label="操作" width="150px" align="center" fixed="right"> -->
              <el-table-column label="操作" width="150px" align="center">
                <template #default="scope">
                  <div>
                    <!-- <el-button type="primary" @click="toEdit(scope.row)"><i class="iconfont icon-btn-xiugai"></i></el-button> -->
                    <el-popconfirm title="是否确认删除？" @confirm="confirmEvent(scope.row.groupId)">
                      <template #reference>
                        <el-button type="danger"><i class="iconfont icon-btn-shanchu"></i></el-button>
                      </template>
                    </el-popconfirm>
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
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header" style="display: flex;justify-content: space-between;align-items: center;">
              <span>角色分配</span>
              <el-button type="primary" @click="addGroupRole"><i class="iconfont icon-zengjia"></i>保存</el-button>
            </div>
          </template>
          <div class="table">
            <el-table v-loading="loadingRole" :data="dataRole" style="width: 100%"
              @selection-change="handleSelectionChangeRole" ref="multipleTableRef">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="roleName" label="角色名称" align="center" />
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination v-model:current-page="paginationRole.pageNum" v-model:page-size="paginationRole.pageSize"
              :page-sizes="paginationRole.pageSizes" :small="false" :disabled="false" :background="false"
              layout="sizes, prev, pager, next" :total="paginationRole.total" @size-change="handleSizeChangeRole"
              @current-change="handleCurrentChangeRole" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" :before-close="handleClose">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="groupName">
          <el-input v-model="form.groupName" placeholder="名称" />
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

<style lang="scss" scoped>
.class-box {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;

  .tool-wrapper {
    margin-bottom: 20px;

    .tool-tip {
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 14px;
        margin-right: 4px;
      }

    }
  }
}

.table {
  width: 100%;

  .vipimg {
    margin-left: 6px;
    height: 16px;
    width: 16px;
  }

  .diagnose {
    color: $primary;

    &.diagnoseTrue {
      color: #999999;
    }
  }

  .price-but {
    width: 47px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #FF7171;
    border-radius: 2px;
    color: #FF7171;
    font-size: 12px;
    background-color: transparent;
    margin-left: 10px;
    padding: 0;
  }

}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

.card-header {
  .iconfont {
    margin-right: 4px;
  }
}
</style>