const sqlServer = require('../config');

// 获取最新文章
const getLatestArticles = async (page = 1, pageSize = 5) => {
    const offset = (page - 1) * pageSize;
    
    // 获取已发布且按发布时间排序的文章
    const _sql = `
        SELECT 
            a.*,
            u.nickName as authorName,
            u.avatar as authorAvatar
        FROM article a
        LEFT JOIN users u ON a.userId = u.userId
        WHERE a.status = '3'  -- 3表示已发布状态
        ORDER BY a.publishTime DESC
        LIMIT ? OFFSET ?
    `;
    
    return sqlServer.query(_sql, [pageSize, offset]);
}

module.exports = {
    getLatestArticles
}