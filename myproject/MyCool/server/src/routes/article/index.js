const Router = require("koa-router");
const router = new Router();
const { userLogin } = require("../../database/user/login");
//引入jwt
const jwt = require("../../utils/jwt");
const { userFind, userRegister } = require("../../database/user/register");
const { publishArticle } = require("../../database/article/publishArticle");

let sessionData = {};

router.post('/publishArticle', jwt.verify(), async (ctx) => {
    try {
        // 从 JWT 中间件中获取用户信息
        const userInfo = ctx.state.user;
        const userId = userInfo.userId; // 获取用户ID

        if (!userInfo) {
            ctx.body = {
                code: "8004",
                data: null,
                msg: "获取用户信息失败"
            };
            return;
        }

        const { title, content, articleLabel, articleType, articleDesc, coverImg } = ctx.request.body;

        // 参数验证
        if (!title || !content) {
            ctx.body = {
                code: "8005",
                data: null,
                msg: "标题和内容不能为空"
            };
            return;
        }

        // 调用发布文章方法
        const result = await publishArticle(
            userId,
            title,
            content,
            articleLabel || '',
            articleType || '',
            articleDesc || '',
            coverImg || ''
        );

        ctx.body = {
            code: "8000",
            data: {
                articleId: result.insertId
            },
            msg: "文章发布成功"
        };
    } catch (error) {
        console.error('发布文章失败:', error);
        ctx.body = {
            code: "8006",
            data: null,
            msg: "发布文章失败"
        };
    }
});

//common js 规范 抛出 node里面要这样用
module.exports = router;
