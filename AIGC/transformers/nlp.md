# 机器学习任务
transformers huggingface的核心库
- pipeline 分发任务
    pipeline(task,model)
- 数组和 hashTable|Dict
    - 相同点
        数据容器 线性
    - 区别
        数组，Dic和栈 队列 链表 连续和不连续 内存空间！
        非线性 树 图
        查找线性容器里 5?
- transformers 支持哪些nlp 任务
    SUPPORTED_TASKS 常量
    items值是一个Dict JS JSON
    for k,v in  for 计数循环
    图解HTTP 协议 可以读一下
    计算机组成原理
- 读/写 操作系统 I/O 操作 Input 内存之中
Output 到显示器 硬盘
    同步代码 I/O 远程->内存|硬盘 网络传输
    的耗时 
    img = Image.open(requests.get(url, stream=True).raw)会进行阻塞
    for() ms 结束 多进程切换 轮循
    阻塞
- 人生苦短，我用Python
    -requests 网络请求
    request.get(url,stream = True).raw
    http 请求的方法 get 明文请求 a
    post 提交的表单
    - PIL库 图片的读写等..
        Image图片的读写等，获取图像二进制包交给Image对象
        ImageDraw 负责写w
    - object-detection
