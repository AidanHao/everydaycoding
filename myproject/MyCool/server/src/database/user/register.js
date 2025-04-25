const sqlServer = require('../config');

//生成五位随机数
const generateRandomId = async () => {
    while (true) {
        const randomId = Math.floor(10000 + Math.random() * 90000).toString();
        const checkSql = `select * from users where userId='${randomId}'`;
        const result = await sqlServer.query(checkSql);
        if (result.length === 0) {
            return randomId;
        }
    }
}

//查找是否同名
const userFind = (userName)=>{
    let _sql = `select * from users where userName='${userName}'`
    return sqlServer.query(_sql)
}

//注册成功的sql
const userRegister = async (values)=>{//values = [userName,password,nickname]要写成整体就用数组
    console.log('数据库', values)
    const userId = await generateRandomId();
    let _sql = `insert into users set userId = ?, userName = ?, passWord = ?, nickName = ?, userPower = 0;`
    return sqlServer.query(_sql, [userId, ...values])//value必须要和sql语句中的顺序一一对应上
}

module.exports = {
    userFind,
    userRegister
}