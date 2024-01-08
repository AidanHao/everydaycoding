<template>
    <div class="note-list">
        <ul>
            <li>
                <div class="img">
                    <img src="https://tx-free-imgs2.acfun.cn/kimg/EJjM1y8qPQoFYWNmdW4SBWltYWdlGi02OTc0NDIyNF9jYWMxNThjZmVkMTQ0NWU3ODZiNmZjOGJmZmQ4ODY1Zi5wbmc.png" alt="">
                </div>
                <p class="time">2023/05/20</p>
                <p class="title">今天去吃了猪脚饭</p>
            </li>
            <li>
                <div class="img">
                    <img src="https://tx-free-imgs2.acfun.cn/kimg/EJjM1y8qPQoFYWNmdW4SBWltYWdlGi02OTc0NDIyNF9jYWMxNThjZmVkMTQ0NWU3ODZiNmZjOGJmZmQ4ODY1Zi5wbmc.png" alt="">
                </div>
                <p class="time">2023/05/20</p>
                <p class="title">今天去吃了猪脚饭</p>
            </li>
            <li>
                <div class="img">
                    <img src="https://tx-free-imgs2.acfun.cn/kimg/EJjM1y8qPQoFYWNmdW4SBWltYWdlGi02OTc0NDIyNF9jYWMxNThjZmVkMTQ0NWU3ODZiNmZjOGJmZmQ4ODY1Zi5wbmc.png" alt="">
                </div>
                <p class="time">2023/05/20</p>
                <p class="title">今天去吃了猪脚饭</p>
            </li>
        </ul>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.note-list{
    width: 100%;
    padding: 1rem 0.667rem 0;//rem会根据根字体进行变化
    ul{
        display: flex;
        // width: 8rem;
        justify-content:space-between;
        flex-wrap: wrap;//
        li{
            width: 50%;
            padding: 0 10px 0 10px;
            box-sizing: border-box;//把内边距算到自己的宽度里面

            img{
                width: 100%;
            }
        }
    }
}
</style>