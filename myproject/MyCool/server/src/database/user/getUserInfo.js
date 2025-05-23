const sqlServer = require('../config');

// 获取用户信息
const getUserInfo = async (userId) => {
    try {
        const _sql = `SELECT userId, userName, nickName, userPower, avatar, \`desc\` FROM users WHERE userId = ?`;
        const result = await sqlServer.query(_sql, [userId]);
        return result[0] || null; // 返回第一个匹配的用户信息，如果没有则返回null
    } catch (error) {
        console.error('获取用户信息失败:', error);
        throw error;
    }
}

module.exports = {
    getUserInfo
};
