<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'components',
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
  <div></div>
</template>

<style lang="scss" scoped></style>