const https = require('https')
const cheerio = require('cheerio')
const fs = require('fs')//node 里面自带的fs模块 与文件操作
https.get('https://movie.douban.com/top250',(res)=>{
    //因为数据过长，这个data会反复执行的
    let html = ''
    res.on('data',(chunk)=>{
        //监听数据的读取
        //输出的是十六进制的数据
        // console.log(chunk);
        //这样会获取到网页的源代码
        // console.log(chunk+'');

        html += chunk
    })
    res.on('end',()=>{
        //源代码获取完毕
        //doucument是浏览器赋予的，node里面不能写
        //导入nmp库 cheerio 就可以操作html了 node本身是不能操作html
        const $ = cheerio.load(html)
        // 定义一个数组，存储数据
        const result = []

        $('li .item').each(function(){
            // 拿到标题
            const title =  $('.info .title',this).text()
            // 拿到评分
            const star = $('.info .bd .rating_num',this).text()
            //拿到电影的图片，取.pic下面的img标签，我们读属性用attr
            const pic = $('.pic img',this).attr('src')
            //把数据放入到数组当中，数据放入对象当中存入数组，这是解构语法
            result.push(
                {
                    title,
                    star,
                    pic
                }
            )
        })

        console.log(result);
        fs.writeFile('./list.json', JSON.stringify(result),(err,data)=>{
            if(err)
            {
                throw err
            }
            console.log('文件写入成功！');
        })
    })
})