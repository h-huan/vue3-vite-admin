<!--
 * @Author: h-huan
 * @Date: 2023-04-06 14:23:33
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-12 09:43:51
 * @Description: 
-->
<template>
  <div class="errPage-container">
    <el-button class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/">
              回首页
            </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from "vue-router";
import errGif from '/401_images/401.gif'

export default defineComponent({
  name: 'Page401',
  setup() {
    const router = useRouter()
    const state = reactive({
      errGif: errGif + '?' + +new Date()
    })
    const back = () => {
      // if (router.query.noGoBack) {
      //   router.push({ path: '/login' })
      // } else {
      router.go(-1)
      // }
    }
    return {
      back,
      ...toRefs(state)
    }
  }
})


// export default {

//   data() {
//     return {
//       errGif: errGif + '?' + +new Date()
//     }
//   },
//   methods: {
//     back() {
//       if (this.$route.query.noGoBack) {
//         this.$router.push({ path: '/dashboard' })
//       } else {
//         this.$router.go(-1)
//       }
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  color: #333333;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  h1 {
    margin: 40px 0;
  }

  h2 {
    font-weight: bold;
    margin: 20px 0;
    font-size: 26px;
  }

  h6 {
    font-weight: bold;
    font-size: 12px;
    margin: 24px 0;
  }



  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;
    padding-left: 40px;

    li {
      list-style: circle;
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
