/*
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:08
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-14 10:27:46
 * @Description: 
 */

import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/message-box/style/css'

import { createApp } from 'vue';
import '/@/styles/app.scss';
import App from './App.vue';

import router from '/@/router/index';
import { store } from "./store"

const app = createApp(App);

app.use(router);
app.use(store)
app.mount('#app')

