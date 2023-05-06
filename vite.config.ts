/*
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-06 11:02:50
 * @Description: 
 */
import { loadEnv, defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// 使用代理
import { viteMockServe } from "vite-plugin-mock";

// 修改主题颜色
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// gzip压缩
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode })=>{
  const env=loadEnv(mode, process.cwd());

  return {
  root: path.resolve(__dirname),
  base: './',
   /* 配置组件中通用变量 */
   resolve: {
    alias: {
      '/@': path.resolve(__dirname,'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/@/styles/element/index.scss" as *;`,
      }
    }
  },
  plugins: [
    vue(),
    // gzip
    viteCompression(),
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
    // 修改主题
    AutoImport({
			resolvers: [ElementPlusResolver({
				// 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
				importStyle: "sass",
			})],
		}),
		Components({
			resolvers: [ElementPlusResolver({
				// 自动引入修改主题色添加这一行，使用预处理样式
				importStyle: "sass",
			})],
		})
  ],
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
 
  }
})