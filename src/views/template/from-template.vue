<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

export default defineComponent({
  name: '',
  emits: ['submit', 'close'],
  setup(props, content) {
    const ruleFormRef = ref()
    const state = reactive({
      form: {
        hospitalId: '',
        nickName: '',
        password: '',
        phone: '',
        parentHospitalId: ''
      },
      rules: {
        nickName: { required: true, message: '必填', trigger: 'blur' },
        password: { required: true, message: '必填', trigger: 'blur' },
        phone: { required: true, message: '必填', trigger: 'blur' },
      } as FormRules
    })
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = Object.assign({}, state.form)
          formEl.resetFields()
          content.emit('submit', data)
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
      content.emit('close')

    }

    // 父组件关闭方法
    // const handleClose = (dialog: string) => {
    //   state[dialog] = false
    // }

    return {
      ruleFormRef,
      submitForm,
      resetForm,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <!--  :inline="true" 表单显示多行 -->
  <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="账号" prop="nickName">
      <el-input v-model="form.nickName" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>