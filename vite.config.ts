/*
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-21 17:15:46
 * @Description: 
 */
import { loadEnv, defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ mode })=>{
  const env=loadEnv(mode, process.cwd());

  return {
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
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      },
    },
  },
  server: {
    // true 为自动刷新， false 为手动刷新
    open: true,
    port: 3013,
    proxy: {
      '/api': {
        // target: "http://jsonplaceholder.typicode.com",
        target: env.VITE_PROXY_URL,
        changeOrigin: true,
        rewrite:  (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  /* 配置组件中通用变量 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "/@/styles/variables.scss";'
      }
    }
  }
  }
})