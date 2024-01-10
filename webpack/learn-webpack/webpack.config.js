const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // npm i html-webpack-plugin -D 引入这个安装的插件，loader只能读懂，插件还能做其他操作
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 一个插件 用于创建一个css文件，还会引入这个css到html中
const {VueLoaderPlugin} = require('vue-loader')


// 这个文件配置给webpack看的，告诉他开发模式，入口文件，建议好后放到 出口
module.exports = {
    mode: 'development',  // 开发模式，还有个production 生产环境，生产环境考虑的东西会很多
    entry: {
        main: './src/main.js',  // 入口文件  
    },
    output: {
        path: path.resolve(__dirname, './dist'),  // 拿到learn-pack的绝对路径，给你处理后放到dist文件夹
        filename: 'js/chunk-[contenthash].js',  // contenthash是hash值，不能乱写，这个意义打包出来就是不一样的文件 为什么chunk放hash值 只要代码没有变更hash值就不会变化，只要变更了hash就会变化 这里涉及到了cdn的缓存问题防止有缓存，让你访问到老的内容
        clean: true, // 自动清理上次打包的结果
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',  // 生成index.html
            inject: 'body',  // 植入到index.html的body标签，有些js必须出现在body之前就是head,所以没有默认放在body中
        }),
        new MiniCssExtractPlugin({
            filename: '.styles/chunk-[contenthash].css',//会在dist下面生成一个文件styles
            ignoreOrder: true,// 忽略指令
        }),
        new VueLoaderPlugin({

        })
    ],
    module: {
        rules: [
            // 匹配规则 为一个数组
            {
                test: /\.css$/i,//碰到文件后缀为css的就去use
                use: [MiniCssExtractPlugin.loader, 'css-loader']//从右往左生效的 style-loader 让css文件以style的标签写入到html中 ， css-loader 让webpack能读懂css
                // 把css文件写入到js当中去了
            },
            {

                test: /\.(png|jpe?g|gif|svg)$/,//$代表后缀,
                type: 'asset',
                // parser:{
                //     dataUrlCondition:{//转成base64
                //         maxSize:5*1024*1024  //1024代表1kb 1024*1024代表1mb 5*1024*1024代表5mb
                //     },
                // },
                generator: {
                    filename: 'images/[contenthash][ext][query]'//[query是后面的参数] 
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,//忽略这个文件 不对它降级处理
                use: ['babel-loader']
            },
            //让webpack读懂vue
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }

        ]
    }
}
