<!--
 * @Author: h-huan
 * @Date: 2023-04-27 11:02:15
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-28 09:25:18
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { FormInstance, FormRules, ElNotification } from 'element-plus'
// import { updatePasswod } from "/@/api/system/user";

const defaultForm = { oldPassword: '', password: '', passwordTwo: '' }
export default defineComponent({
  name: 'register',
  setup() {
    const FormRef = ref()

    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== state.form.password) {
        callback(new Error("两次新密码不一样!"))
      } else {
        callback()
      }
    }

    const state = reactive({
      form: { oldPassword: '', password: '', passwordTwo: '' },
      rules: {
        oldPassword: { required: true, message: '请输入密码', trigger: 'blur' },
        password: { required: true, message: '请输入新密码', trigger: 'blur' },
        passwordTwo: { required: true, validator: validatePass2, trigger: 'blur' }
      }
    })
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          // let data=Object.assign({},state.form)
          let data = {
            password: state.form.password,
            passwordTwo: state.form.passwordTwo,
          }
          // updatePasswod(data).then((res: any) => {
          //   if (res.code == 0) {
          //     state.form = defaultForm
          //     ElNotification.success('密码修改成功')
          //   }
          // })

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
    return {
      submitForm,
      resetForm,
      FormRef,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="register-box">
    <el-form class="register-form" ref="FormRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" placeholder="旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="passwordTwo">
        <el-input v-model="form.passwordTwo" type="password" placeholder="确认新密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(FormRef)">保存</el-button>
        <el-button @click="resetForm(FormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.register-box {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #FFFFFF;

  .register-form {
    width: 500px;
    margin: 50px auto;
  }
}
</style>