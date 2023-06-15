<!--
 * @Author: h-huan
 * @Date: 2023-04-24 19:18:39
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-24 20:35:49
 * @Description: 
-->

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'TreeSelect',
  props: {
    modelValue: {
      type: Number,
      default: ""
    },
    treeData: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label"
        };
      }
    }
  },

  setup(props, { attrs, slots, emit, expose }) {
    const propsValue = computed(() => props.modelValue);
    // const emit = defineEmits(["update:modelValue"]);

    // emit('update:modelValue',value)
    // const data = []
    const Object = {}
    Object[props.defaultProps.id] = 0
    Object[props.defaultProps.children] = props.treeData
    Object[props.defaultProps.label] = '顶级菜单'

    const state = reactive({
      label: "",
      data: []
    })

    state.data.push(Object)
    const handleNodeClick = (data: any) => {
      state.label = data.nodeName;
      emit("update:modelValue", data.nodeId);
      document.body.click()
    };
    return {
      propsValue,
      handleNodeClick,
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <!-- <div>
    {{ propsValue }}
  </div> -->
  <el-popover placement="bottom-start" :width="300" trigger="click">
    <template #reference>
      <el-input v-model="label" readonly placeholder="请选择父节点" />
    </template>
    <el-tree :data="data" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick" />
  </el-popover>
</template>

<style lang="scss" scoped></style>