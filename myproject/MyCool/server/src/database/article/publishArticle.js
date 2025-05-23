const sqlServer = require('../config');

// 生成随机文章ID
const generateArticleId = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `article_${timestamp}_${random}`;
}

// 检查文章ID是否存在
const checkArticleIdExists = async (articleId) => {
    const _sql = `SELECT articleId FROM article WHERE articleId = ?`;
    const result = await sqlServer.query(_sql, [articleId]);
    return result.length > 0;
}

// 获取可用的文章ID
const getAvailableArticleId = async () => {
    let articleId;
    let exists = true;
    
    while (exists) {
        articleId = generateArticleId();
        exists = await checkArticleIdExists(articleId);
    }
    
    return articleId;
}

// 发布文章或更新文章状态
const publishArticle = async(userId, title, content, articleLabel, articleType, articleDesc, coverImg, articleId = null) => {
    try {
        let result;
        if (articleId) {
            // 更新现有文章
            const _sql = `UPDATE article SET 
                title = ?, 
                content = ?, 
                articleLabel = ?, 
                articleType = ?, 
                articleDesc = ?, 
                coverImg = ?,
                status = 1,
                publishTime = NOW()
                WHERE articleId = ? AND userId = ?`;
            
            result = await sqlServer.query(_sql, [
                title, 
                content, 
                articleLabel, 
                articleType, 
                articleDesc, 
                coverImg,
                articleId,
                userId
            ]);
        } else {
            // 创建新文章
            articleId = await getAvailableArticleId();
            const _sql = `INSERT INTO article (articleId, userId, title, content, status, viewCount, publishTime, articleLabel, articleType, articleDesc, coverImg) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)`;
            result = await sqlServer.query(_sql, [
                articleId,
                userId, 
                title, 
                content, 
                1, // status = 1 表示待审核
                0, // viewCount = 0
                articleLabel, 
                articleType, 
                articleDesc, 
                coverImg
            ]);
        }
        
        return result;
    } catch (error) {
        console.error('发布文章失败:', error);
        throw error;
    }
}

module.exports = {
    publishArticle,
    checkArticleIdExists,
    generateArticleId
}