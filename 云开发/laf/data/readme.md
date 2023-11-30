# 后端数据逻辑

- 查询
    - 数据库.collection(name).get()
    - where 条件
    - count 
        注册的时候， name + passworld
        {total} = where({name}).count()
        if(total >= 0){ return }
    - limit 限制数量
        如何拿到第五页的数据 .offset((page-1)*size).limit(size)一页多少个
- 
