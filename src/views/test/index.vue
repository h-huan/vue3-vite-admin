<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'test ',
  setup() {
    const state = reactive({
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<template>
  <div>test page</div>
</template>

<style lang="scss" scoped></style>