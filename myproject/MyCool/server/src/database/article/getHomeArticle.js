const sqlServer = require('../config');

// 获取首页文章数据（固定用户00001的文章）
const getHomeArticle = async (page = 1, pageSize = 10) => {
    // 强制限制最多返回10条
    const actualPageSize = Math.min(pageSize, 10);
    const offset = (page - 1) * actualPageSize;
    const userId = '00001';
    
    // 构建SQL查询，包含用户信息和热度计算
    const _sql = `
        SELECT 
            a.*,
            u.nickName as authorName,
            u.avatar as authorAvatar,
            (a.viewCount * 0.4 + COALESCE(a.commentCount, 0) * 0.3 + COALESCE(a.likeCount, 0) * 0.3) as hotScore
        FROM article a
        LEFT JOIN users u ON a.userId = u.userId
        WHERE a.userId = ? 
        AND a.status = '3'  -- 3表示已发布状态
        ORDER BY hotScore DESC, a.publishTime DESC 
        LIMIT ? OFFSET ?
    `;
    
    // 获取总记录数
    const countSql = `
        SELECT COUNT(*) as total
        FROM article a
        WHERE a.userId = ?
        AND a.status = '3'
    `;
    
    try {
        const [articles, totalResult] = await Promise.all([
            sqlServer.query(_sql, [userId, actualPageSize, offset]),
            sqlServer.query(countSql, [userId])
        ]);
        
        return {
            list: articles,
            total: totalResult[0].total,
            page,
            pageSize: actualPageSize
        };
    } catch (error) {
        console.error('获取首页文章失败:', error);
        throw error;
    }
}

module.exports = {
    getHomeArticle
}