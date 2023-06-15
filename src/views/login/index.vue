<!--
 * @Author: h-huan
 * @Date: 2023-04-06 14:39:49
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-13 15:02:30
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance, ElNotification } from 'element-plus'

import { useActions } from "/@/hooks/useStore";

export default defineComponent({
  name: 'login',
  setup() {

    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const storeActions: any = useActions('User', ['Login'])

    const state = reactive({
      form: {
        loginName: 'admin',
        password: '123456',
        verification: '',
      },
      rules: ({
        loginName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur', },
        ],
        verification: { required: true, message: '验证码不能为空', trigger: 'blur' }
      }),
      rememberMe: false,  // 记住密码
      flag: false,      // 眼睛图标
      pwdType: "password",   // 密码框类型
      verification: "" //验证码
    })

    // 获取验证码
    // const getCode = function () {
    //   state.verification = getValidateCode()
    // }
    // getCode()


    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = {
            loginName: state.form.loginName,
            password: state.form.password,
            // verification: state.form.verification,
            rememberMe: state.rememberMe
          }

          storeActions.Login(data).then((res) => {
            ElNotification.success('登录成功')
            router.push({ path: '/' })
          }).catch(() => {
            ElNotification.error('登录异常！')
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const changeType = () => {
      state.flag = !state.flag
      state.pwdType = state.flag ? 'text' : 'password';
    }


    return {
      ruleFormRef,
      submitForm,
      changeType,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <hh-h1 msg="hello world">
  </hh-h1>
  <div class="login-wrapper">
    <!-- <div class="login-logo"></div> -->
    <div class="login-container">
      <!-- <div class="login-title">
        <img src="/images/login-title.png" alt="每一个人因中医而健康">
      </div> -->
      <el-form ref="ruleFormRef" :model="form" :rules="rules" class="login-form"
        @keyup.enter.native="submitForm(ruleFormRef)">
        <h3>欢迎登录</h3>
        <el-form-item prop="loginName">
          <el-input v-model="form.loginName" placeholder="请输入用户名">
            <template #prefix>
              <div class="login-icon">
                <i class="iconfont icon-yonghu"></i>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" :type="pwdType">
            <template #prefix>
              <div class="login-icon">
                <i class="iconfont icon-mima"></i>
              </div>
            </template>
            <template #suffix>
              <div class="login-icon login-icon_show">
                <i class="iconfont" :class="[flag ? 'icon-yanjing_xianshi' : 'icon-yanjing_yincang']" autocomplete="auto"
                  @click="changeType"></i>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item class="code" prop="verification">
            <el-input v-model="form.verification" placeholder="请输入验证码">
              <template #prefix>
                <div class="login-icon">
                  <i class="iconfont icon-icon-yzm"></i>
                </div>
              </template>
            </el-input>
            <div class="authCode"><img :src="verification" @click="getCode()"></div>
          </el-form-item> -->
        <el-form-item>
          <div @click="submitForm(ruleFormRef)" class="login-but">登录</div>
        </el-form-item>
        <div class="login-tool">
          <el-checkbox :checked="rememberMe" @click="rememberMe = !rememberMe">自动登录</el-checkbox>
          <a href="javascript:void(0)">忘记密码？</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.login-wrapper {
  @include relative;
  background: url('/images/background.png') #F5F6FA no-repeat;
  background-size: 100%;
}

.login-form {
  width: 390px;
  // height: 446px;
  background: $white;
  @include centerAbs;
  padding: 35px;
  box-sizing: border-box;
  border-radius: 10px;

  animation: from 0.5s linear;

  h3 {
    color: #333333;
    font-size: 18px;
    font-family: Microsoft YaHei;
    margin-bottom: 30px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  @keyframes from {
    0% {
      margin-top: -100px;
      opacity: 0;
    }

    100% {
      margin-top: 0;
      opacity: 1;
    }
  }

  .el-input {
    .el-input__wrapper {
      position: relative;
      border: 1px solid $login-icon-bg;
      border-radius: 4px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0;
      align-items: center;
      box-shadow: 0 0 0 0 $login-icon-bg;

      &:hover {
        border: 1px solid $primary;
        box-shadow: 0px 8px 15px 0px rgba(17, 102, 225, 0.2);
      }

      .login-icon {
        height: 52px;
        width: 48px;
        line-height: 52px;
        text-align: center;
        background: #F5F7FA;
        border-radius: 4px 0px 0px 4px;
        color: $login-icon;

        i {
          font-size: 23px;
        }
      }

      .login-icon_show {
        background-color: $white;
        color: $login-icon-show;

        i {
          font-size: 20px;
        }
      }

    }
  }

  .code {
    margin-bottom: 30px;
    justify-content: space-between;

    .el-input {
      width: 65%;
    }

    .authCode {
      margin-left: 10px;
    }
  }

  // 按钮
  .login-but {
    width: 100%;
    height: 54px;
    line-height: 54px;
    text-align: center;
    background: $login-but-bg;
    box-shadow: 0px 4px 10px 0px rgba(17, 101, 225, 0.3);
    border-radius: 4px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    color: $white;

    &:hover {
      background: $login-but-bg_hover;
    }
  }

  // 工具
  .login-tool {
    font-size: 14px;
    color: #999999;
    vertical-align: bottom;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      color: #999999;
      cursor: pointer;
    }
  }


}
</style>