<!--
 * @Author: h-huan
 * @Date: 2023-04-06 14:29:31
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-06 14:29:36
 * @Description: 
-->
<script lang="ts">
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
