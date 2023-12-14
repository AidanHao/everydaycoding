进入colab
# !pip install langchain==0.0.316 安装框架 极简AI开发框架

面试官：0.0.316是什么意思 第一个版本是大版本，第二个版本是小版本 那个是功能是小补丁，有些小的缝缝补补 第二个表示是有一些内容的更新，但是不是完全过呢更新 第三个是一些小更新
版本号通常由三个数字组成，形式为 X.Y.Z。在您提供的版本号 "0.0.316" 中：

X: 主版本号。当进行重大更改或不向后兼容的更改时，递增 X。
Y: 次版本号。当添加新功能或进行向后兼容的更改时，递增 Y。
Z: 补丁版本号。通常是修复错误或进行其他小的改进时递增 Z。
根据这个规则，"0.0.316" 可能是一个非常早期或者是一个处于开发阶段的版本号。在大多数情况下，主版本号为零表示产品可能处于早期开发或测试阶段，而不稳定或者可能会发生重大更改。
还没有正式公测，正式公测的时候要负商业责任

请注意，这个解释是基于通常的软件版本号规则，不同的组织和项目可能有不同的规定。如果这是特定软件或项目的版本号，请查看相关文档或联系项目负责人以获取更确切的信息。

# !pip install openai 安装openAI
注意，没有指定版本，默认安装最新版本
# 重新安装一下：!pip install openai==0.28.1

代码是一起的
# from langchain.chat_models import ChatOpenAI
LangChain 怎么优化OpenAI 开发的
实现聊天 
导入一个聊天模型，指定一个角色 我们是HumanMessage OpenAI是system
# from langchain.schema import HumanMessage
分为三种角色system assistant(助理) user(human人类)
HumanMessage？问题传给他就好了。
# import os # 引入一下文件系统
#设置环境变量，LangChain自动来拿
# os.environ['OPENAI_API_KEY']='放你的key'
# chat = ChatOpenAI(temperature=0,model_name="gpt-3.5-turbo")
temperature为自由度
# response = chat([HumanMessage(content="Hello LangChain!")])
openai 接受的就是一个数组
# print(response)
 在colab使用代码报这个错误module 'openai' has no attribute 'error' 是因为没有安装指定版本的openai
 # 重新安装一下：!pip install openai==0.28.1