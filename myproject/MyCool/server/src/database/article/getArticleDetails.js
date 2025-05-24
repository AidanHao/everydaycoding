const sqlServer = require('../config');

async function getArticleDetails(articleId) {
    try {
        // First update the view count
        const updateViewSql = `
            UPDATE article 
            SET viewCount = viewCount + 1 
            WHERE articleId = ?
        `;
        await sqlServer.query(updateViewSql, [articleId]);

        // Then get the article details
        const getArticleSql = `
            SELECT 
                a.articleId,
                a.userId,
                a.title,
                a.content,
                a.status,
                a.viewCount,
                a.publishTime,
                a.articleLabel,
                a.articleType,
                a.articleDesc,
                a.coverImg,
                a.likeCount,
                a.commentCount,
                u.username,
                u.avatar
            FROM article a
            LEFT JOIN users u ON a.userId = u.userId
            WHERE a.articleId = ?
        `;
        const [article] = await sqlServer.query(getArticleSql, [articleId]);

        return article;
    } catch (error) {
        console.error('获取文章详情失败:', error);
        throw error;
    }
}

module.exports = {
    getArticleDetails
};