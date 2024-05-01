const Router = require("@koa/router"); //引入@koa/router
const router = new Router();
const diskUsage = require("diskusage");
const os = require("os");

// 进行计算机磁盘内容的获取
router.post("/mycomputer", async (ctx) => {
    try {
        const diskInfo = await new Promise((resolve, reject) => {
            diskUsage.check("/", (err, info) => {
                if (err) {
                    reject(err);
                } else resolve(info);
            });
        });
        // 用data承接
        let data = {
            total: diskInfo.total,
            free: diskInfo.free,
            used: diskInfo.used,
            usage: diskInfo.use,
        };
        ctx.body = {
            code: "8000",
            data: data,
            msg: "请求成功",
        };
    } catch (error) {
        ctx.body = {
            code: "8005",
            data: error,
            msg: "服务器异常",
        };
    }
});

//common js 规范 抛出 node里面要这样用
module.exports = router;