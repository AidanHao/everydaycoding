import openai
openai.api_key = "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" #openai 的sdk
COMPLETION_MODEL = "text-davinci-003"#模型常量 达芬奇 自动完成 生成内容


# 字符串模板
#换行
#描述的细节需求
#分布去执行
#输出的格式
prompt = """
Consideration product:工厂现货PVC充气青蛙夜市地摊热卖充气玩具发光蛙儿童水上玩具
1.Compose human readable product title used
on Amazon in english within 20 words
2. Write 5 selling points for the products in Amazon
3. Evaluat a price range for this product in U.S.

Output the result in json format wiht three properties called title,
selling_points and price_range
"""
# def定义一个函数 封装和ChatGPT聊天的内容
def get_response(prompt):#冒号表示内容的开始
    completions = openai.Completion.create(
        #大模型很值钱 发送请求
        engine = COMPLETION_MODEL,#模型 选择模型
        prompt = prompt,#获取描述的东西 提示词
        max_tokens = 512,#控制算力，省点钱
        n = 1,#返回一条结果
        stop=None,#不要停下来
        temperature=0.0  #自由发挥度0-2之间，值越大越随意
    )
    # print(completions)
    message = completions.choices[0].text #
    return message
print(get_response(prompt))



# {
#     title: "",
#     selling_points:"",
#     price_range: ,
# }