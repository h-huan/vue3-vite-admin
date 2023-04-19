<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'home',
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
  <div class="home">
    inde page
  </div>
</template>