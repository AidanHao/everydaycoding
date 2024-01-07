localStorage 前端可以使用key-value的存储

# 百度考点


- 前端考点 
    - JS语法
        小黄书
    - HTML5
        LocalStorage 前端持久化存储
        浏览器的能力提升
        这个属于BOM
    - DOM BOM
    - CSS3 / Less / tailwindcss
    - VUE/React
    - Webpack 前端工程化
    - node 大前端考点，写后端的
    - ES6+

- localStorage
    html5 提供的持久化存储能力
    localStorage.getItem(key)
    localStorage.setItem(key, value)
    localStorage.removeItem(key) 移除
    localStorage.clear() 清空

- HTML5表单能力
    - 提升用户体验
        如果用户再提交表单时，受挫，会体验不好，要考虑小白
        小白用户犯错能不能避免
        require
        placeholder = ""可以提示用户

- JSON.parse + JSON.stringify
    localStorage 不能存对象 ， toString 一下

- label + input + 事件冒泡 用户体验优化
    label for = input 扩大操作范围 ， 特别是在移动端
    事件监听只能在一个元素上，所以列表一定要坐事件委托，
    利用冒泡机制 只监听父元素上的事件


- populateList 封装 很牛逼
    Don`t repeat yourself
    const items = JSON.parse()||[]