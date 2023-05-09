<!--
 * @Author: h-huan
 * @Date: 2023-04-06 14:29:31
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 10:10:26
 * @Description: 
-->
<script lang="ts">
import { defineComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter()
    const { params, query } = useRoute()
    const { path } = params
    router.replace({ path: '/' + path, query })
  },

  // render() {
  //   return h() // avoid warning message
  // }
})
</script>
