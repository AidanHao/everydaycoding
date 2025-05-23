const Router = require("koa-router");
const router = new Router();
const { userLogin } = require("../../database/user/login");
//引入jwt
const jwt = require("../../utils/jwt");
const { userFind, userRegister } = require("../../database/user/register");
const { editUserInfo } = require("../../database/user/editUserInfo");
const { getUserInfo } = require("../../database/user/getUserInfo");
const { changePassword } = require("../../database/user/changePassWorld");

let sessionData = {};

//定义登录接口
router.post("/login", async (ctx) => {
  const { userName, passWord } = ctx.request.body;
  try {
    const result = await userLogin(userName, passWord);
    if (result.length) {
      // JWT payload only contains essential identification data
      const jwtPayload = {
        userId: result[0].userId,
        userName: result[0].userName,
        userPower: result[0].userPower
      };

      const data = {
        jsonToken: jwt.sign(jwtPayload),
        nickName: result[0].nickName,
        userId: result[0].userId
      };

      ctx.body = {
        code: "8000",
        data: data,
        msg: "登录成功"
      };
    } else {
      ctx.body = {
        code: "8004",
        data: "error",
        msg: "账号或密码错误"
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常"
    };
  }
});

//定义注册接口
router.post("/register", async (ctx) => {
  const { userName, passWord, nickName } = ctx.request.body; //前端参数在请求体当中，使用解构语法
  //后端校验数据
  if (!userName || !passWord || !nickName) {
    ctx.body = {
      code: "8001",
      msg: "账号，密码或者昵称不能为空",
    };
    return;
  }
  //校验账号是否重复
  try {
    const findRes = await userFind(userName);
    //找到了是一个数组
    if (findRes.length) {
      ctx.body = {
        code: "8003",
        data: "error",
        msg: "账号已存在",
      };
      return;
    }
    //注册逻辑
    const registerRes = await userRegister([userName, passWord, nickName]);
    if (registerRes.affectedRows !== 0) {
      ctx.body = {
        code: "8000",
        data: "success",
        msg: "注册成功",
      };
    } else {
      ctx.body = {
        code: "8004",
        data: "error",
        msg: "注册失败",
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常",
    };
  }
});

//获取用户信息
router.get("/getUserInfo", jwt.verify(), async (ctx) => {
  try {
    // 从 JWT 中间件中获取用户基本信息
    const userInfo = ctx.state.user;
    if (!userInfo || !userInfo.userId) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "用户未登录或登录已过期"
      };
      return;
    }

    // 从数据库获取完整的用户信息
    const dbUserInfo = await getUserInfo(userInfo.userId);
    if (!dbUserInfo) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "获取用户信息失败"
      };
      return;
    }

    // 生成新的 token，只包含基本身份信息
    const newToken = jwt.sign({
      userId: dbUserInfo.userId,
      userName: dbUserInfo.userName,
      userPower: dbUserInfo.userPower
    });

    ctx.body = {
      code: "8000",
      data: {
        ...dbUserInfo,
        jsonToken: newToken
      },
      msg: "获取用户信息成功"
    };
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常"
    };
  }
});

//编辑用户信息
router.post("/editUserInfo", jwt.verify(), async (ctx) => {
  try {
    // 从 JWT 中间件中获取用户基本信息
    const userInfo = ctx.state.user;
    if (!userInfo || !userInfo.userId) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "用户未登录或登录已过期"
      };
      return;
    }

    const { nickName, avatar, desc } = ctx.request.body;
    
    // 验证数据
    if (!nickName && !avatar && !desc) {
      ctx.body = {
        code: "8001",
        data: null,
        msg: "至少需要提供一个要更新的字段"
      };
      return;
    }

    // 更新用户信息
    const result = await editUserInfo(userInfo.userId, { nickName, avatar, desc });
    
    if (result.affectedRows > 0) {
      // 获取更新后的用户信息
      const updatedUserInfo = await getUserInfo(userInfo.userId);
      
      // 生成新的 token，只包含基本身份信息
      const newToken = jwt.sign({
        userId: updatedUserInfo.userId,
        userName: updatedUserInfo.userName,
        userPower: updatedUserInfo.userPower
      });

      ctx.body = {
        code: "8000",
        data: {
          ...updatedUserInfo,
          jsonToken: newToken
        },
        msg: "更新用户信息成功"
      };
    } else {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "更新用户信息失败"
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常"
    };
  }
});

//修改密码接口
router.post("/changePassword", jwt.verify(), async (ctx) => {
  try {
    // 从 JWT 中间件中获取用户基本信息
    const userInfo = ctx.state.user;
    if (!userInfo || !userInfo.userId) {
      ctx.body = {
        code: "8004",
        data: null,
        msg: "用户未登录或登录已过期"
      };
      return;
    }

    const { oldPassword, newPassword } = ctx.request.body;
    
    // 验证数据
    if (!oldPassword || !newPassword) {
      ctx.body = {
        code: "8001",
        data: null,
        msg: "旧密码和新密码不能为空"
      };
      return;
    }

    // 验证新密码不能与旧密码相同
    if (oldPassword === newPassword) {
      ctx.body = {
        code: "8001",
        data: null,
        msg: "新密码不能与旧密码相同"
      };
      return;
    }

    // 修改密码
    const result = await changePassword(userInfo.userId, oldPassword, newPassword);
    
    if (result.success) {
      ctx.body = {
        code: "8000",
        data: null,
        msg: result.message
      };
    } else {
      ctx.body = {
        code: "8004",
        data: null,
        msg: result.message
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常"
    };
  }
});

//common js 规范 抛出 node里面要这样用
module.exports = router;
