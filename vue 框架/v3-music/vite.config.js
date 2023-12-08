import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 短路径呀引入
import {fileURLToPath,URL} from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 添加配置
  resolve:{
    // 短路径
    alias:{
      '@':fileURLToPath(new URL('./src',import.meta.url))
    }
  }
})
