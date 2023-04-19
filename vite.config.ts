/*
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-19 13:56:35
 * @Description: 
 */
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname),
  base: './',
  plugins: [
    vue(),
    // 引入mockjs
    viteMockServe({
      mockPath:"./mock", //解析路径
      localEnabled:true//设置为false,禁用mock
    }),
    // 浏览器兼容
    legacy({
      targets: ['chrome 52', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
  ],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname,'src')
    }
  },
  server: {
    // true 为自动刷新， false 为手动刷新
    open: true,
    port: 3013,
  },
  /* 配置组件中通用变量 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "/@/styles/variables.scss";'
      }
    }
  }
})
