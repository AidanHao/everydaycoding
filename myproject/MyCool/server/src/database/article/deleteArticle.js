const sqlServer = require('../config');

//删除文章
const deleteArticle = async (articleId, userId) => {
    try {
        const _sql = `DELETE FROM article WHERE articleId = ? AND userId = ?`;
        const result = await sqlServer.query(_sql, [articleId, userId]);
        return result;
    } catch (error) {
        console.error('删除文章失败:', error);
        throw error;
    }
}

module.exports = {
    deleteArticle
}