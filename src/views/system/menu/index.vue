<!--
 * @Author: h-huan
 * @Date: 2023-04-24 10:35:18
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-30 14:23:30
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'
// import { getMenus, add, del, edit } from '/@/api/system/menu'
import { getMenuList } from "/@/api/system/menu";
import IconSelect from '/@/components/IconSelect/index.vue'
import TreeSelects from '/@/components/TreeSelect/index.vue'


const defaultForm = { description: null, nodeIcon: null, nodeId: 0, nodeName: null, nodeType: null, orderVal: 999, parentid: 0, target: '1', url: null }

export default defineComponent({
  name: 'subscribeMan',
  components: { IconSelect, TreeSelects },
  setup() {

    const ruleFormRef = ref<FormInstance>()
    const loading = ref(false)
    const state = reactive({
      query: {
        username: ''
      },
      dialogVisible: false,
      dialogTitle: '新增',
      multipleSelection: [],
      data: [],
      form: defaultForm,
      rules: {
        nodeName: { required: true, message: '请输入名称', trigger: 'blur' },
        url: { required: true, message: '请输入URL', trigger: 'blur' },
      } as FormRules,
      defaultProps: {
        id: "nodeId",
        children: "menuChildList",
        label: "nodeName"
      },
    })

    // 获取菜单列表
    const getMenuLists = () => {
      getMenuList().then((res: any) => {
        if (res.code == 200) state.data = res.data
        loading.value = false
      })

    }
    getMenuLists()

    // 多选
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    }

    // 提交表单
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = Object.assign({}, state.form)

          if (!data.nodeIcon) {
            data.nodeIcon = 'icon-btn-shezhi'
          }
          if (data.nodeId) {
            delete data['menuChildList'];
            // edit(data).then((res: any) => {
            //   if (res.code === 0) ElNotification.success('菜单修改成功')
            //   getMenuList()
            // })
          } else {
            // add(data).then((res: any) => {
            //   if (res.code === 0) ElNotification.success('菜单添加成功')
            //   getMenuList()
            // })
          }
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
    const toEdit = (data) => {
      // state.dialogVisible = true
      // state.form = Object.assign({}, data);
    }

    const toDelete = () => {
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

    const load = (row, treeNode, resolve) => {
      console.log(row, treeNode);

      setTimeout(() => {
        resolve([
          { title: '组件管理', icon: 'icon-text', menuSort: 3, component: '/components', hidden: '0', createTime: '2023-06-01' },
          { title: '组件管理', icon: 'icon-text', menuSort: 3, component: '/components', hidden: '0', createTime: '2023-06-01' },
        ])
      }, 1000)
    }
    return {
      ruleFormRef,
      loading,
      handleSelectionChange,
      submitForm,
      resetForm,
      toEdit,
      toDelete,
      load,
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
      <el-table v-loading="loading" :data="data" row-key="id" lazy :load="load" @selection-change="handleSelectionChange"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="菜单标题" align="center" />
        <el-table-column prop="icon" label="图标" align="center" />
        <el-table-column prop="menuSort" label="排序" align="center" />
        <el-table-column prop="component" label="组件路径" align="center" />
        <el-table-column prop="hidden" label="可见" align="center" />
        <el-table-column prop="createTime" label="创建日期" align="center" />
        <el-table-column label="操作" width="150px" align="center" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="primary" class="filter-item" @click="toEdit(scope.row)"><i
                  class="iconfont icon-xiugai"></i></el-button>
              <el-button type="danger" class="filter-item" @click="toDelete"><i
                  class="iconfont icon-shanchu"></i></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px" :before-close="handleClose"> -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="nodeName">
          <el-input v-model="form.nodeName" placeholder="名称" />
        </el-form-item>
        <el-form-item label="图标">
          <el-popover placement="bottom" :width="400" trigger="click">
            <template #reference>
              <el-input slot="reference" v-model="form.nodeIcon" placeholder="点击选择图标" readonly>
                <template #prefix>
                  <i class="iconfont icon-sousuo" />
                </template>
              </el-input>
            </template>
            <template #default>
              <!-- <IconSelect @selected="selected"></IconSelect> -->
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="form.url" placeholder="链接" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model.number="form.orderVal" placeholder="排序" />
        </el-form-item>
        <el-form-item label="父节点">
          <template #default="scope">
            <TreeSelects v-model="form.parentid" :treeData="data" :defaultProps="defaultProps"></TreeSelects>
          </template>
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