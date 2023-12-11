<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">粥品香坊</span>
                </div>
                <div class="description">蜂鸟专送/38分钟送达</div>
                <div class="surport">
                    <!-- 出现一个稍稍有点复杂的东西 组件：当可以复用的时候，当具有独立的特性或者功能的时候 -->
                    <!--  -->
                    <span class="text">在线支付满28减5</span>
                </div>
            </div>
            <div class="support-count">
                <span class="count">5个</span>
                <i class="iconfont">></i>
            </div>
        </div>
        
        <div class="bulletin-wrapper">

        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
// 一定要打分号 @import和js中的import完全不是一个意思，一定要打分号
@import '@/common/style/variable.less';
@import '@/common/style/mixin.less';
    .header {
        background:@color-background-ss;
        .content-wrapper{
            position: relative;
            display: flex;
            padding: 24px 12px 18px 24px;
            .avatar{
                width:64px;
                height:64px;
                img{
                    width: 100%;
                    border-radius: 2px;
                }
            }
            .content{
                color: @color-white;
                // 剩下的都给你
                flex: 1;
                margin-left: 16px;
                .title{
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    .brand{
                        width: 30px;
                        height: 18px;
                        // 图片要定义一个函数
                        // background-image: url(./brand@2x.png);
                        .bg-image('./brand');
                        // 让图片覆盖整个容器
                        background-size: cover;
                    }
                    .name{
                        
                        margin-left: 6px;
                        font-size: @fontsize-large;
                        font-weight: bold;
                    }
                }
                .description{
                    font-size: @fontsize-small;
                    margin-bottom: 8px;
                }
                .surport{
                    display: flex;
                    align-items: center;
                    .text{
                        font-size: @fontsize-small-s;
                    }
                }
            }
            .support-count{
                position: absolute;
                right: 12px;
                bottom: 14px;
                padding: 0 8px;
                height: 24px;
                // 文字在竖直方向居中
                text-align: center;
                background: @color-background-sss;
                border-radius: 14px;
                display: flex;
                align-items: center;
                color: @color-white;
                .count{
                    font-size: @fontsize-small-s;
                    
                }
                .iconfont{
                    font-size: @fontsize-small-s;
                    margin-left: 2px;
                }
            }
        }
    }
</style>