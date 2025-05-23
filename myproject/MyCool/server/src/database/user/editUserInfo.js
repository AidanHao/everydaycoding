const sqlServer = require('../config');

// 编辑用户信息
const editUserInfo = async (userId, userData) => {
    try {
        const { nickName, avatar, desc } = userData;
        
        // 构建更新字段
        const updateFields = [];
        const values = [];
        
        if (nickName) {
            updateFields.push('nickName = ?');
            values.push(nickName);
        }
        
        if (avatar) {
            updateFields.push('avatar = ?');
            values.push(avatar);
        }

        if (desc) {
            updateFields.push('`desc` = ?');
            values.push(desc);
        }
        
        if (updateFields.length === 0) {
            return { affectedRows: 0 };
        }
        
        // 添加 userId 到 values 数组
        values.push(userId);
        
        const _sql = `UPDATE users SET ${updateFields.join(', ')} WHERE userId = ?`;
        return await sqlServer.query(_sql, values);
    } catch (error) {
        console.error('编辑用户信息失败:', error);
        throw error;
    }
}

module.exports = {
    editUserInfo
};
