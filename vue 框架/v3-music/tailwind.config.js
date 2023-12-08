/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 把下面后缀的文件支持tailwindcss src是当前目录下的开发目录 /**/ *.指的是src下可以是子目录，所有目录
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

