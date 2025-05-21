const sqlServer = require('../config');

//获取用户文章数据
const getUserArticle = async(userId) => {
    let _sql = `select * from article where userId = ${userId}`
    return sqlServer.query(_sql)//返回一个promise对象
}


module.exports = {
    getUserArticle
}