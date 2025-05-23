const sqlServer = require('../config');

// 获取推荐文章
const getRecommendedArticles = async (page = 1, pageSize = 5) => {
    const offset = (page - 1) * pageSize;
    
    // 获取已发布且按综合热度排序的文章
    const _sql = `
        SELECT 
            a.*,
            u.nickName as authorName,
            u.avatar as authorAvatar,
            (a.viewCount * 0.4 + COALESCE(a.commentCount, 0) * 0.3 + COALESCE(a.likeCount, 0) * 0.3) as hotScore
        FROM article a
        LEFT JOIN users u ON a.userId = u.userId
        WHERE a.status = '3'  -- 3表示已发布状态
        ORDER BY hotScore DESC, a.publishTime DESC
        LIMIT ?, ?
    `;
    
    // 获取总记录数
    const countSql = `
        SELECT COUNT(*) as total
        FROM article a
        WHERE a.status = '3'
    `;
    
    try {
        const [articles, totalResult] = await Promise.all([
            sqlServer.query(_sql, [offset, pageSize]),
            sqlServer.query(countSql)
        ]);
        
        return {
            list: articles,
            total: totalResult[0].total,
            page,
            pageSize
        };
    } catch (error) {
        console.error('获取推荐文章失败:', error);
        throw error;
    }
}

module.exports = {
    getRecommendedArticles
}