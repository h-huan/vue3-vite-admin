/*
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:08
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-21 17:10:53
 * @Description: 
 */
import { createApp } from 'vue';
import '/@/styles/app.scss';
import App from './App.vue';
import router from '/@/router/index';

import { store } from "./store"

//elment-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

// import Plugin from 'v-fit-columns';

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock/user')
//   mockXHR()
// }

const app = createApp(App);


app.use(router);
app.use(store)
// app.use(Plugin);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(ElementPlus);
app.mount('#app')

  