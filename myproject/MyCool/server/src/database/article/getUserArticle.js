const sqlServer = require('../config');

//获取用户文章数据
const getUserArticle = async(userId, status = null) => {
    let _sql = 'SELECT * FROM article WHERE userId = ?';
    let params = [userId];
    
    // 如果指定了状态，添加状态筛选条件
    if (status !== null) {
        _sql += ' AND status = ?';
        params.push(status);
    }
    
    // 按发布时间倒序排序
    _sql += ' ORDER BY publishTime DESC';
    
    return sqlServer.query(_sql, params);
}

module.exports = {
    getUserArticle
}