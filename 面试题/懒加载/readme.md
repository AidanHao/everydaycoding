# 懒加载的实现
我们可以先让图片全部不显示！
怎么让图片不加载，只要img的src属性里面有图片，就会加载，所以我们可以给img的src属性设置一个空的图片，这样图片就不会加载了。
1. 先判断用户的屏幕尺寸有多高，图片有多高，一个屏幕能放多少张图片
2. 先让能放的下图片有值，放不下的图片不放值（本质上就是判断图片是否在可视区域，然后把data-original的值放到src上面）

