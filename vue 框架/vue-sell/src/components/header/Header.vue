<template>
    
    <div class="header" >
        <div class="content-wrapper">
            <div class="bg" style="background-image: url(http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg);"></div>
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
                    <!-- 引入一个组件 -->
                    <!-- <support-icon/> -->
                    <!-- 父组件给子组件传值 -->
                    <SupportIcon :size="1" :type="0"/>
                    <span class="text">在线支付满28减5</span>
                </div>
            </div>
            <div class="support-count">
                <span class="count">5个</span>
                <i class="iconfont icon-youjiantou"></i>
            </div>
        </div>
        
        <div class="bulletin-wrapper">
            
        </div>
    </div>
</template>

<script>
import SupportIcon from "@/components/support/Support-icon.vue"
    export default {
        components:{
            SupportIcon
        }
    }
</script>

<style lang="less" scoped>
// 一定要打分号 @import和js中的import完全不是一个意思，一定要打分号
@import '@/common/style/variable.less';
@import '@/common/style/mixin.less';
    .header {
        position: relative;
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
                        margin-left: 4px;
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
        .bg{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            
            background-size: 100% 100%;
            z-index: -1;
            filter: blur(10px);
        }
    }
</style>