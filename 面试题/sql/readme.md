# 字节难度的sql知识
mysql是一个经典的关系型数据库，每个表都是行列式
写一条mysql sql,创建一个表 avatar 网站的用户头像、
    表的字段 字段的类型，字段是属性，
    索引(让表的查询更加快速) 要使用，为了查询，但是也不能乱建
    思考以后的查询需求，先写出来select语句
        主键Primary 查询速度最快
        普通索引 首页文字列表\个人主页都要根据用户id 查询头像内容 如果没有要全查！ 没有加索引命中不了索引，就会全查，如果加了索引，可以直接去索引里面看一下，直接拿到数据
        为什么要分开建表，不需要查询多个不必要的数据（作为公司，最大负载的就是用户表）


CREATE TABLE `avatar`(
    `id`  int(11) NOT NULL AUTO_INCREMENT,      //不能为空，还回自增
    `minitype` varchar(255) NOT NULL,           //字符串 长度255的变量 var是不定的
    `filename` varchar(255) NOT NULL,           //文件的名字
    `size` int(11) NOT NULL,                    //文件的大小
    `userId` int(11) NOT NULL,                  //外键 会和user表关联起来
    PRIMARY KEY (`id`),                         //主键
    KEY `userId` (`userId`),                    //一般索引 比较重要考点
    CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) //CONSTRAINT是一个约束，用户的内容可以放心的交给其他地方，这里声明的是一个foreign-key
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;//这个不需要我们管，这是mysql的一个存储规则

user 表建立的时候要考虑哪些东西 名字不能重复，
    主键索引 最快
    普通索引 方便查询 
    唯一索引 是一个绝对不能重复的值
    联合索引

    CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `comment`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `content` longtext NOT NULL,                //长文本
    `postId` int(11) NOT NULL,
    `userId` int(11) NOT NULL,
    `parentId` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `userId` (`userId`),
    KEY `postId` (`postId`),
    KEY `parentId` (`parentId`),
    CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),`
)


- 部署
    - 本地布置
            不仅仅要一个node环境，还要go java环境 还需要本地一个服务器部署
        测试数据和服务端代码 blog.sql 
    - 远程部署
        阿里云服务器 blog.sql mysql 运行一下

    - 分布式部署
        blog.sql mysql 运行一下