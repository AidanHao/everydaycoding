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
            const _sql = `INSERT INTO article (articleId, userId, title, content, status, viewCount, publishTime, articleLabel, articleType, articleDesc, coverImg, likeCount, commentCount) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)`;
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
                coverImg,
                0, // likeCount = 0
                0  // commentCount = 0
            ]);
        }
        
        return result;
    } catch (error) {
        console.error('发布文章失败:', error);
        throw error;
    }
}

/**
 * 搜索文章
 * @param {Object} params 搜索参数
 * @param {string} [params.keyword] 关键词（标题或描述）
 * @param {string} [params.tag] 标签
 * @param {string} [params.type] 文章类型
 * @param {string} [params.userId] 用户ID
 * @param {number} [params.page=1] 页码
 * @param {number} [params.pageSize=10] 每页数量
 * @returns {Promise<Array>} 文章列表
 */
const searchArticles = async (params = {}) => {
    try {
        const {
            keyword,
            tag,
            type,
            userId,
            page = 1,
            pageSize = 10
        } = params;

        // 构建基础SQL查询
        let sql = `
            SELECT 
                a.*,
                u.userName as authorName
            FROM article a
            LEFT JOIN users u ON a.userId = u.userId
            WHERE a.status = '3'
        `;
        const values = [];

        // 添加搜索条件
        if (keyword) {
            sql += ` AND a.title LIKE ?`;
            values.push(`%${keyword}%`);
        }

        if (tag) {
            sql += ` AND a.articleLabel LIKE ?`;
            values.push(`%${tag}%`);
        }

        if (type) {
            sql += ` AND a.articleType = ?`;
            values.push(type);
        }

        if (userId) {
            sql += ` AND a.userId = ?`;
            values.push(userId);
        }

        // 添加排序和分页
        sql += ` ORDER BY a.publishTime DESC LIMIT ? OFFSET ?`;
        const offset = (page - 1) * pageSize;
        values.push(pageSize, offset);

        // 执行查询
        const articles = await sqlServer.query(sql, values);

        // 获取总数
        const countSql = `
            SELECT COUNT(*) as total 
            FROM article a
            LEFT JOIN users u ON a.userId = u.userId
            WHERE a.status = '3'
            ${keyword ? ' AND a.title LIKE ?' : ''}
            ${tag ? ' AND a.articleLabel LIKE ?' : ''}
            ${type ? ' AND a.articleType = ?' : ''}
            ${userId ? ' AND a.userId = ?' : ''}
        `;
        const countValues = values.slice(0, -2); // 移除分页参数
        const countResult = await sqlServer.query(countSql, countValues);
        const total = countResult[0]?.total || 0;

        return {
            articles,
            total,
            page,
            pageSize
        };
    } catch (error) {
        console.error('搜索文章失败:', error);
        throw error;
    }
};

module.exports = {
    publishArticle,
    checkArticleIdExists,
    generateArticleId,
    searchArticles
}