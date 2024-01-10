module.exports = {
    presets:[
        // 降级规则
        '@babel/preset-env',
        //vue规则 vue解析规则
        '@vue/babel-preset-jsx'
    ],
    plugins:['@babel/plugin-transform-runtime'],//babel生效实际就是运行的时候
}