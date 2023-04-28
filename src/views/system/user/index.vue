<!--
 * @Author: h-huan
 * @Date: 2023-04-26 10:43:04
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-27 17:45:42
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { getUserListPage, edit } from '/@/api/system/user'
import { sliceTime } from '/@/utils/index'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'

const defaultForm = { loginName: null, password: null, passwordTwo: null, userPersonid: null }
const defaultPagination = { pageSizes: [10, 20, 50, 100], pageNum: 1, pageSize: 10, total: 0, }
export default defineComponent({
  name: 'user',
  setup() {
    const ruleFormRef = ref<FormInstance>()

    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== state.form.password) {
        callback(new Error("两次新密码不一样!"))
      } else {
        callback()
      }
    }

    const loading = ref(true)
    const state = reactive({
      form: defaultForm,
      pagination: defaultPagination,
      data: [],
      dialogTitle: '修改',
      dialogVisible: false,
      rules: {
        loginName: { required: true, message: '请输入名称', trigger: 'blur' },
        password: { required: true, message: '请输入新密码', trigger: 'blur' },
        passwordTwo: { required: true, validator: validatePass2, trigger: 'blur' }
      } as FormRules,
    })

    // 获取菜单列表
    const getMenuList = (pageNum, pageSize) => {
      getUserListPage({ pageNum, pageSize }).then((res: any) => {
        if (res.code == 0) {
          state.pagination.total = res.data.total
          state.data = res.data.list
          loading.value = false
        }
      })
    }
    getMenuList(state.pagination.pageNum, state.pagination.pageSize)

    // 分页
    const handleSizeChange = (val: number) => {
      getMenuList(state.pagination.pageNum, val)
    }
    const handleCurrentChange = (val: number) => {
      getMenuList(val, state.pagination.pageSize)
    }

    const toEdit = (data) => {
      state.dialogVisible = true
      state.form.userPersonid = data.personid
      state.form.loginName = data.personloginname
    }
    // 提交表单
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = Object.assign({}, state.form)
          // delete data['menuChildList'];
          edit(data).then((res: any) => {
            if (res.code === 0) ElNotification.success('用户信息修改成功')
            getMenuList(state.pagination.pageNum, state.pagination.pageSize)
            state.dialogVisible = false
            state.form = defaultForm
          })
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
    return {
      handleSizeChange,
      handleCurrentChange,
      sliceTime,
      toEdit,
      loading,
      submitForm,
      ruleFormRef,
      resetForm,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="class-box">
    <!-- <div class="tool-wrapper">
      <div class="tool-tip">
        <el-button type="primary" @click="toAdd"><i class="iconfont icon-zengjia"></i>新增</el-button>
      </div>
    </div> -->
    <div class="table">
      <el-table v-loading="loading" :data="data" style="width: 100%">
        <el-table-column type="selection" width="55" sortable />
        <el-table-column prop="nickName" label="昵称" align="center" />
        <el-table-column prop="personloginname" label="用户名" align="center" />
        <el-table-column prop="personphone" label="手机号" align="center" />
        <el-table-column prop="crtTime" label="创建时间" align="center">
          <template #default="scope">
            <span>{{ sliceTime(scope.row.crtTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="primary" @click="toEdit(scope.row)"><i class="iconfont icon-btn-xiugai"></i></el-button>
              <!-- <el-popconfirm title="是否确认删除？" @confirm="confirmEvent(scope.row.nodeId)">
                <template #reference>
                  <el-button type="danger"><i class="iconfont icon-btn-shanchu"></i></el-button>
                </template>
              </el-popconfirm> -->
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="form.userPersonid" type="hidden" placeholder="描述" />
          <el-input v-model="form.loginName" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordTwo">
          <el-input v-model="form.passwordTwo" type="password" placeholder="确认密码" />
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
</style>