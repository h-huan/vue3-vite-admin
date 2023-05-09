<!--
 * @Author: h-huan
 * @Date: 2023-04-24 10:35:18
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 17:07:18
 * @Description: 
-->
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { getMenus, add, del, edit } from '/@/api/system/menu'
import IconSelect from '/@/components/IconSelect/index.vue'
import TreeSelects from '/@/components/TreeSelect/index.vue'
import { dictFilters } from '/@/utils/index'


const defaultForm = { description: null, nodeIcon: null, nodeId: 0, nodeName: null, nodeType: null, orderVal: 999, parentid: 0, target: '1', url: null }

export default defineComponent({
  name: 'subscribeMan',
  components: { IconSelect, TreeSelects },
  setup() {

    const ruleFormRef = ref<FormInstance>()
    const loading = ref(true)
    const state = reactive({
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
      selectOptions: [
        {
          value: '1',
          label: '当前窗口',
        },
        {
          value: '2',
          label: '新窗口',
        },
      ]
    })

    // 获取菜单列表
    const getMenuList = () => {
      getMenus().then((data: any) => {
        state.dialogVisible = false
        state.form = defaultForm
        state.data = data.data.list
        loading.value = false
      })
    }
    getMenuList()



    // 新增
    const toAdd = () => {
      state.form = defaultForm
      state.dialogTitle = "新增"
      state.dialogVisible = true
    }
    // 编辑
    const toEdit = (data) => {
      state.dialogTitle = "修改"
      state.form = Object.assign({}, data)
      state.dialogVisible = true
    }
    // 删除
    const toDel = (id?: number) => {
      let ids: number
      if (id) {
        ids = id
      } else {
        if (state.multipleSelection && state.multipleSelection.length !== 1) {
          ElNotification.warning('请选择一条信息')
          return
        } else {
          ids = state.multipleSelection[0].nodeId
        }
      }
      // 删除
      del({ nodeId: ids }).then((res: any) => {
        if (res.code === 0) {
          getMenuList()
          ElNotification.success('删除成功')
        }
      })
    }

    // 多选
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
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

          if (!data.nodeIcon) {
            data.nodeIcon = 'icon-btn-shezhi'
          }
          if (data.nodeId) {
            delete data['menuChildList'];
            edit(data).then((res: any) => {
              if (res.code === 0) ElNotification.success('菜单修改成功')
              getMenuList()
            })
          } else {
            add(data).then((res: any) => {
              if (res.code === 0) ElNotification.success('菜单添加成功')
              getMenuList()
            })
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

    // 选中图标
    const selected = (name) => {
      state.form.nodeIcon = name
    }

    const confirmEvent = (id?: number) => {
      toDel(id)
    }

    // const isshow = computed((data) => count.value + 1)


    return {
      toAdd,
      toEdit,
      toDel,
      handleSelectionChange,
      handleClose,
      submitForm,
      resetForm,
      selected,
      ruleFormRef,
      confirmEvent,
      dictFilters,
      loading,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div class="class-box">
    <div class="tool-wrapper">
      <div class="tool-tip">
        <el-button type="primary" @click="toAdd"><i class="iconfont icon-zengjia"></i>新增</el-button>
      </div>
    </div>
    <div class="table">
      <el-table v-loading="loading" :data="data" style="width: 100%" @selection-change="handleSelectionChange"
        row-key="nodeId" :tree-props="{ children: 'menuChildList' }">
        <el-table-column type="selection" width="55" sortable />
        <el-table-column prop="nodeName" label="名称" align="center" sortable />
        <el-table-column prop="nodeIcon" label="图标" align="center">
          <template #default="scope">
            <i class="iconfont" :class="[scope.row.nodeIcon ? scope.row.nodeIcon : '']" />
          </template>
        </el-table-column>
        <el-table-column prop="url" label="链接" align="center" />
        <el-table-column prop="isShow" label="是否显示" align="center">
          <template #default="scope">
            <span>{{ scope.row.isShow }}</span>
            <el-switch v-model="scope.row.isShow" active-value="100" inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column prop="visturl" label="链接" align="center" />
        <el-table-column prop="target" label="窗口方式" align="center">
          <template #default="scope">
            <span>{{ dictFilters(selectOptions, scope.row.target) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column label="操作" width="150px" align="center" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="primary" @click="toEdit(scope.row)"><i class="iconfont icon-btn-xiugai"></i></el-button>
              <el-popconfirm title="是否确认删除？" @confirm="confirmEvent(scope.row.nodeId)">
                <template #reference>
                  <el-button type="danger"><i class="iconfont icon-btn-shanchu"></i></el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px" :before-close="handleClose"> -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" :before-close="handleClose">
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
              <IconSelect @selected="selected"></IconSelect>
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
        <el-form-item label="窗口类型">
          <!-- <el-input v-model="form.target" placeholder="窗口类型" /> -->
          <el-select v-model="form.target" placeholder="窗口类型">
            <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
</style>