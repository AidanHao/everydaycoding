# map + parseInt 经典题

- 我在解决这道题的时候，去看了一下MDN文档，
    map 支持接收一个callback 返回值是一个每一项组成的新数组 ，
    callback 会接收到 item 当前项(一定要) index 下标 array 数组本身
    parseInt 就是当前的callback 第一项是item 第二项是可选的参数?radix进制值 不传默认是十进制 0无效，使用10 
    一进制 item位2 为NaN 
    二进制item为3 NaN
    
# 云开发 laf.run
    集合就是一个数据表table
    {
        "text":"学习laf"
        "done":false
    }
