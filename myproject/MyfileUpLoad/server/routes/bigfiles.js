const Router = require("@koa/router"); //引入@koa/router
const router = new Router();
const multiparty = require("koa2-multiparty");
const path = require("path");
const fse = require("fs-extra");
// npm i multiparty

// resolve 的作用是将路径进行合并， __dirname 是当前文件的绝对路径，../是上一级，文件夹就叫 chunks
const UPLOAD_DIR = path.resolve(__dirname, "../", "chunks"); //准备好地址存放切片

// 判断文件夹存不存在，不存在则创建
// node 中很多方法都有同步版本，比如这里 mkdirsSync 是同步创建目录以及父目录， Sync 就是表示同步，没有这个就是异步
if (!fse.existsSync(UPLOAD_DIR)) {
  fse.mkdirSync(UPLOAD_DIR);
}

// 用全局变量存储文件名和切片名

// 定义上传接口
router.post("/upload", multiparty(), async (ctx) => {
  // console.log(ctx.req.body,ctx.req.files);
  // 拿到切片，文件名和切片名
  const file = ctx.req.files.file;
  const fileName = ctx.req.body.fileName;
  const chunkName = ctx.req.body.chunkName;

  // 将切片放入文件夹当中
  fse.moveSync(file.path, `${UPLOAD_DIR}/${chunkName}`);

  ctx.body = {
    code: "8000",
    data: "上传成功",
  };
});

// 定义合并接口
router.post("/merge", async (ctx) => {
  // 解构拿到文件名和切片大小
  const { fileName, size } = ctx.request.body;

  // 调用合并切片函数
  mergeFileChunks(UPLOAD_DIR, fileName, size);

  ctx.body = {
    code: "8000",
    data: "合并成功",
  };
});

// 合并切片函数
const mergeFileChunks = async (filePath, fileName, size) => {
  //读取文件夹中的所有文件
  const chunks = await fse.readdir(filePath);

  // 对chunks数组进行排序
  chunks.sort((a, b) => a.split("-")[1] - b.split("-")[1]);

  // 创建一个用于合并的WriteStream
  const writeStream = fse.createWriteStream(path.resolve(filePath, fileName));

  // 合并之前需要将切片转为流类型 chunkPath相当于item


  const arr = chunks.map((chunkPath, index) => {
    return pipeStream(
      path.resolve(filePath, chunkPath),
      fse.createWriteStream(//合并的位置
        path.resolve(filePath, fileName),
        {
        start: index * size, // 0-10M,10M-20M ..
        end: (index + 1) * size,
      }
    )
    );
  });

  await Promise.all(arr);


    // await Promise.all(
  //   chunks.map(async (chunkPath, index) => {
  //     const readSteam = fse.createReadStream(path.resolve(filePath, chunkPath));
  //     return new Promise((resolve, reject) => {
  //       readSteam.on("end", resolve);
  //       readSteam.on("error", reject);
  //       readSteam.pipe(writeStream, { end: false }); // 注意这里设置 end: false，防止每个切片结束时关闭 writeStream
  //     });
  //   })
  // );

  // // 关闭writeSteam,完成合并
  // writeStream.end();

  // // 删除已合成的切片文件
  // chunks.forEach((chunkPath) => {
  //   fse.unlinkSync(path.resolve(filePath, chunkPath));
  // });
};

// 声明一个转为流的函数
const pipeStream = (filePath, writeStream) => {
  return new Promise((resolve, reject) => {
    const readSteam = fse.createReadStream(filePath);
    readSteam.on("end", () => {
      fse.unlinkSync(filePath); //移除切片
      resolve();
    });
    readSteam.pipe(writeStream); //将切片读成流汇入到可写流中
  });
};

//common js 规范 抛出 node里面要这样用
module.exports = router;
