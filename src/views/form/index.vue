<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import ImgUpload from '/@/components/ImgUpload/index.vue'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  img: '',
  desc: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: '请输入获取区域',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: '请选择时间',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一种类型',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<template>
  <div class="app-container">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="名字" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="活动区域">
          <el-option label="上海" value="上海" />
          <el-option label="北京" value="北京" />
          <el-option label="长沙" value="长沙" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间日期" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker v-model="ruleForm.date1" type="date" label="Pick a date" placeholder="选择日期"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2" style="text-align: center;">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="选择时间" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="开关" prop="delivery">
        <el-switch v-model="ruleForm.delivery" />
      </el-form-item>
      <el-form-item label="多选" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="小明" name="type" />
          <el-checkbox label="小红" name="type" />
          <el-checkbox label="小白" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单选" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="小明" />
          <el-radio label="小红" />
          <el-radio label="小白" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传图片">
        <ImgUpload v-model="ruleForm.img"></ImgUpload>
      </el-form-item>
      <el-form-item label="多行文本" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


