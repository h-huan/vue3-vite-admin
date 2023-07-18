/*
 * @Author: h-huan
 * @Date: 2023-03-21 10:05:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-07-18 15:58:23
 * @Description: 
 */
import { loadEnv, defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// mock
import { viteMockServe } from "vite-plugin-mock";

// 修改主题颜色
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// gzip压缩
import viteCompression from "vite-plugin-compression";

// 生产环境引入element-plus
import fullImportPlugin from './vitePlugin/fullImportPlugin'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const NODE_ENV = process.env.NODE_ENV || 'development'

  const config = {
    root: path.resolve(__dirname),
    base: '/',
    /* 配置组件中通用变量 */
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, 'src')
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
        mockPath: "./mock", //解析路径
        localEnabled: true//设置为false,禁用mock
      }),
      // 浏览器兼容
      legacy({
        targets: ['chrome 52', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
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
      host: "0.0.0.0",
      port: 3013,
      open: true,    // true 为自动刷新， false 为手动刷新
      proxy: {
        '/api': {
          // target: "http://jsonplaceholder.typicode.com",
          target: process.env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },

  }

  if (NODE_ENV === 'development') {
    config.plugins.push(
      fullImportPlugin(),
      // 防止 自定义颜色无效
      ElementPlus({
        useSource: true,
      }),
    )
  } else {
    config.plugins.push(AutoImport({
      resolvers: [ElementPlusResolver({
        // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
        importStyle: "sass",
      })],
      dts: 'src/types/auto-imports.d.ts'
    }), Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      resolvers: [ElementPlusResolver({
        // 自动引入修改主题色添加这一行，使用预处理样式
        importStyle: "sass",
      })],
      dts: 'src/types/components.d.ts'
    }))
  }
  return config
})