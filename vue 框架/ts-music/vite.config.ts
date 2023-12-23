import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import {fileURLToPath} from 'url'
// import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers:[ElementPlusResolver]
    // }),
    // Component({
    //   resolvers:[ElementPlusResolver]
    // })
  ],
  resolve:{
    // alias:{
    //   '@':fileURLToPath(new URL('./src'))

    // }
  }
})
