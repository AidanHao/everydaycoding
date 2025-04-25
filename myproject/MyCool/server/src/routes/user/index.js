const Router = require("koa-router");
const router = new Router();
const { userLogin } = require("../../database/user/login");
//引入jwt
const jwt = require("../../utils/jwt");
const { userFind, userRegister } = require("../../database/user/register");

let sessionData = {};

//定义登录接口
router.post("/login", async (ctx) => {
  //从前端获取账户和密码，去数据库校验
  const { userName, passWord } = ctx.request.body; //前端参数在请求体当中，使用解构语法
  console.log(userName, passWord);
  try {
    const result = await userLogin(userName, passWord); //调用数据库校验方法
    if (result.length) {
      let data = {
        userId: result[0].userId,
        nickName: result[0].nickName,
        userName: result[0].userName,
        userPower: result[0].userPower,
      };
      sessionData = {
        userId: result[0].userId,
        nickName: result[0].nickName,
        userName: result[0].userName,
        userPower: result[0].userPower,
      };
      data = {
        jsonToken: jwt.sign(data),
        nickName: result[0].nickName,
        userId: result[0].userId,
      };
      ctx.body = {
        code: "8000", //不是状态码
        data: data,
        msg: "登录成功",
      };
    } else {
      //后端错误两种情况，网络请求没走通，逻辑错误，或者后端代码错误，服务器端异常
      ctx.body = {
        code: "8004",
        data: "error",
        msg: "账号或密码错误",
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

//common js 规范 抛出 node里面要这样用
module.exports = router;
