const sqlServer = require('../config');

// 登录
const userLogin = (userName,passWord)=>{
    let _sql = `select * from users where userName='${userName}' and passWord='${passWord}'`
    return sqlServer.query(_sql)//返回一个promise对象
}

module.exports = {
    userLogin
}