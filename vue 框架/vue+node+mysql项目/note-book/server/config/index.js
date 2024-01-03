// 专门用来声明mysql

const config = {
    database:{
        DATABASE:'nodebook',
        USERNAME:'root',
        PASSWORD:'123456',
        PORT:'3306',
        HOST:'localhost'//将来这个地址可以修改的
    }
}

//抛出
module.exports = config