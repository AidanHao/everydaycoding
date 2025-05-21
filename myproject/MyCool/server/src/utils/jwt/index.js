//封装一个可用于创建token的函数
const jwt = require('jsonwebtoken')

// JWT 配置
const JWT_CONFIG = {
    secret: process.env.JWT_SECRET || 'userInfo', // 建议使用环境变量
    expiresIn: '24h', // token 过期时间
    refreshExpiresIn: '7d', // 刷新 token 过期时间
};

// 生成 token
function sign(payload) {
    return jwt.sign(payload, JWT_CONFIG.secret, {
        expiresIn: JWT_CONFIG.expiresIn
    });
}

// 生成刷新 token
function signRefreshToken(payload) {
    return jwt.sign(payload, JWT_CONFIG.secret, {
        expiresIn: JWT_CONFIG.refreshExpiresIn
    });
}

// 验证 token 中间件
const verify = () => async (ctx, next) => {
    try {
        const jwtToken = ctx.req.headers.authorization;
        
        if (!jwtToken) {
            ctx.status = 401;
            ctx.body = {
                status: 401,
                msg: '您还未登录~'
            };
            return;
        }

        // 移除 Bearer 前缀
        const token = jwtToken.startsWith('Bearer ') ? jwtToken.slice(7) : jwtToken;
        
        try {
            const decoded = jwt.verify(token, JWT_CONFIG.secret);
            ctx.state.user = decoded; // 将解码后的用户信息存储在 ctx.state 中
            await next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                ctx.status = 401;
                ctx.body = {
                    status: 401,
                    msg: 'token已过期，请重新登录'
                };
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 401,
                    msg: 'token无效'
                };
            }
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            msg: '服务器错误'
        };
    }
};

// 解析 token 内容
const parseToken = (token) => {
    try {
        // 移除可能的 Bearer 前缀
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        
        const decoded = jwt.verify(token, JWT_CONFIG.secret);
        return {
            success: true,
            data: decoded
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// 刷新 token
const refreshToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, JWT_CONFIG.secret);
        const newToken = sign(decoded);
        return {
            success: true,
            data: {
                token: newToken,
                user: decoded
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = {
    sign,
    signRefreshToken,
    verify,
    parseToken,
    refreshToken
};