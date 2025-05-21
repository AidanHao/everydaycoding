const Router = require("koa-router");
const router = new Router();
const { userLogin } = require("../../database/user/login");
//引入jwt
const jwt = require("../../utils/jwt");
const { userFind, userRegister } = require("../../database/user/register");
const { publishArticle } = require("../../database/article/publishArticle");
const { getUserArticle } = require("../../database/article/getUserArticle");
const { draftArticle } = require("../../database/article/draftArticle");
const { deleteArticle } = require("../../database/article/deleteArticle");

let sessionData = {};

//发布新文章
router.post("/publishArticle", jwt.verify(), async (ctx) => {
  try {
    // 从 JWT 中间件中获取用户信息
    const userInfo = ctx.state.user;
    const userId = userInfo.userId; // 获取用户ID

    if (!userInfo && !userId) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "获取用户信息失败",
      };
      return;
    }

    const {
      articleId,
      title,
      content,
      articleLabel,
      articleType,
      articleDesc,
      coverImg,
    } = ctx.request.body;

    // 参数验证
    if (!title || !content) {
      ctx.body = {
        code: "8005",
        data: null,
        msg: "标题和内容不能为空",
      };
      return;
    }

    // 调用发布文章方法
    const result = await publishArticle(
      userId,
      title,
      content,
      articleLabel || "",
      articleType || "",
      articleDesc || "",
      coverImg || "",
      articleId || null
    );

    ctx.body = {
      code: "8000",
      data: {
        articleId: result.insertId || articleId,
      },
      msg: "文章发布成功",
    };
  } catch (error) {
    console.error("发布文章失败:", error);
    ctx.body = {
      code: "8006",
      data: null,
      msg: "发布文章失败",
    };
  }
});
//查询个人文章
router.post("/getUserArticles", jwt.verify(), async (ctx) => {
  try {
    // 从 JWT 中间件中获取用户信息
    const userInfo = ctx.state.user;
    const userId = userInfo.userId; // 获取用户ID
    const { status } = ctx.request.body; // 获取状态参数

    if (!userInfo && !userId) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "获取用户信息失败",
      };
      return;
    }

    // 调用获取文章方法，传入状态参数
    const result = await getUserArticle(userId, status);
    console.log("文章数据", result);

    ctx.body = {
      code: "8000",
      data: result,
      msg: "获取文章成功",
    };
  } catch (error) {
    console.error("查询用户文章失败:", error);
    ctx.body = {
      code: "8006",
      data: null,
      msg: "查询用户文章失败",
    };
  }
});
//发布草稿
router.post("/draftArticle", jwt.verify(), async (ctx) => {
  try {
    // 从 JWT 中间件中获取用户信息
    const userInfo = ctx.state.user;
    const userId = userInfo.userId; // 获取用户ID

    if (!userInfo && !userId) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "获取用户信息失败",
      };
      return;
    }

    const {
      articleId,
      title,
      content,
      articleLabel,
      articleType,
      articleDesc,
      coverImg,
    } = ctx.request.body;

    // 参数验证
    if (!title || !content) {
      ctx.body = {
        code: "8005",
        data: null,
        msg: "标题和内容不能为空",
      };
      return;
    }

    // 调用发布文章方法
    const result = await draftArticle(
      userId,
      title,
      content,
      articleLabel || "",
      articleType || "",
      articleDesc || "",
      coverImg || "",
      articleId || null
    );

    ctx.body = {
      code: "8000",
      data: {
        articleId: result.insertId || articleId,
      },
      msg: "草稿保存成功",
    };
  } catch (error) {
    console.error("草稿保存失败:", error);
    ctx.body = {
      code: "8006",
      data: null,
      msg: "草稿保存失败",
    };
  }
});
//删除文章或者草稿
router.post("/deleteArticle", jwt.verify(), async (ctx) => {
  try {
    // 从 JWT 中间件中获取用户信息
    const userInfo = ctx.state.user;
    const userId = userInfo.userId; // 获取用户ID

    if (!userInfo && !userId) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "获取用户信息失败",
      };
      return;
    }
    const { articleId } = ctx.request.body;

    const result = await deleteArticle(articleId, userId);
    ctx.body = {
      code: "8000",
      data: result,
      msg: "删除成功",
    };
  } catch (err) {
    console.log('删除文章失败', err)
    ctx.body = {
      code: "8006",
      data: null,
      msg: "删除失败",
    };

  }
});

//common js 规范 抛出 node里面要这样用
module.exports = router;
