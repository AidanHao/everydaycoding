const sqlServer = require('../config');

// 修改密码
const changePassword = async (userId, oldPassword, newPassword) => {
    try {
        // 首先验证旧密码是否正确
        const checkSql = `SELECT * FROM users WHERE userId = ? AND passWord = ?`;
        const checkResult = await sqlServer.query(checkSql, [userId, oldPassword]);
        
        if (checkResult.length === 0) {
            return { success: false, message: '旧密码错误' };
        }

        // 更新密码
        const updateSql = `UPDATE users SET passWord = ? WHERE userId = ?`;
        const result = await sqlServer.query(updateSql, [newPassword, userId]);
        
        if (result.affectedRows > 0) {
            return { success: true, message: '密码修改成功' };
        } else {
            return { success: false, message: '密码修改失败' };
        }
    } catch (error) {
        console.error('修改密码失败:', error);
        throw error;
    }
}

module.exports = {
    changePassword
};