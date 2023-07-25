<!--
 * @Author: h-huan
 * @Date: 2023-04-24 19:18:39
 * @LastEditors: h-huan
 * @LastEditTime: 2023-07-20 15:05:16
 * @Description: 
-->

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref, watch, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'TreeSelect',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    data: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: "请选择父节点"
    },
    parent: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // tree 展示属性
    defaultProps: {
      type: Object,
      default: () => {
        return {
          id: 'nodeId',
          children: "children",
          label: "label"
        };
      }
    },
    // 显示返回属性
    clickProps: {
      type: Object,
      default: () => {
        return {
          label: "nodeName",
          value: "nodeId"
        };
      }
    }
  },

  setup(props, { attrs, slots, emit, expose }) {
    const treeRef = ref()

    const state = reactive({
      label: '',
      treeData: [] as any
    })

    const propsValue = computed(() => {
      return props.modelValue
    });
    const propsData = computed(() => props.data);
    console.log(propsData.value);


    if (props.parent) {
      let Object = {}
      Object[props.defaultProps.id] = 0
      Object[props.defaultProps.children] = props.data
      Object[props.defaultProps.label] = '顶级菜单'
      state.treeData.push(Object)
    } else {
      state.treeData = propsData.value
    }


    const _label = props.clickProps.label
    const _value = props.clickProps.value

    const filterTree = (nd, ids) => {

      if (nd && nd.length == 0) return
      nd.forEach(item => {

        if (item[_value] == ids.value) return state.label = item[_label]
        const _children = props.defaultProps.children
        return item[_children] ? filterTree(item[_children], ids) : ''

      })
      return
    }

    filterTree(state.treeData, propsValue)

    const handleNodeClick = (treeData: any) => {
      state.label = treeData[props.clickProps.label];
      emit("update:modelValue", treeData[props.clickProps.value]);
      document.body.click()
    };

    return {
      treeRef,
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
      <el-input v-model="label" readonly :placeholder="placeholder" />
    </template>
    <el-tree ref="treeRef" :node-key="defaultProps.id" :data="treeData" :props="defaultProps"
      :expand-on-click-node="false" @node-click="handleNodeClick" />
  </el-popover>
</template>

<style lang="scss" scoped></style>