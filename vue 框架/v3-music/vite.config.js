import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 短路径呀引入
import {fileURLToPath,URL} from 'url'
// 全局引入 组件库
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动引入Element-plus 此时npm i -D 
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),
  ],
  // 添加配置
  resolve:{
    // 短路径
    alias:{
      '@':fileURLToPath(new URL('./src',import.meta.url))
    }
  }
})
