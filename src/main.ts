/*
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:08
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-08 15:23:33
 * @Description: 
 */
import { createApp } from 'vue';
import '/@/styles/app.scss';
import App from './App.vue';
import router from '/@/router/index';

import { store } from "./store"

const app = createApp(App);

app.use(router);
app.use(store)
app.mount('#app')

  