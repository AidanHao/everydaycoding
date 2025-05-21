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

// 插入新文章数据
const publishArticle = async(userId, title, content, articleLabel, articleType, articleDesc, coverImg) => {
    try {
        // 生成唯一的文章ID
        const articleId = await getAvailableArticleId();

        // 设置默认值
        const viewCount = 0;
        const publishTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const status = 1;

        // 使用参数化查询来防止SQL注入
        let _sql = `INSERT INTO article (articleId, userId, title, content, status, viewCount, publishTime, articleLabel, articleType, articleDesc, coverImg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let values = [articleId, userId, title, content, status, viewCount, publishTime, articleLabel, articleType, articleDesc, coverImg];
        
        // 执行查询
        const result = await sqlServer.query(_sql, values);
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