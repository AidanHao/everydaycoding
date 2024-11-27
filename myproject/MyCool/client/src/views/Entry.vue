<template>
    <div class="Entry">
        <el-container class="Entry-Container">
            <el-header class="Entry-Container-Header">
                <div class="Entry-Container-Header-loginState">
                    <span>管理员</span>
                </div>
                <div class="Entry-Container-Header-logo">
                    MyCool
                </div>
                <div class="Entry-Container-Header-menu">
                    <el-menu default-active="Home" mode="horizontal" @select="HandleMenuSelect" router=true
                        background-color="transParent" text-color="white" active-text-color="yellow" :ellipsis="false"
                        class="Entry-Container-Header-menu-detail">
                        <el-menu-item index="Home">首页 </el-menu-item>
                        <el-menu-item index="Public">公共聊天室 </el-menu-item>
                        <el-menu-item index="Img">图片库 </el-menu-item>
                        <el-menu-item index="Other">其他 </el-menu-item>
                    </el-menu>
                </div>

            </el-header>
            <el-main class="Entry-Container-Main">
                <!-- <Transition name="move"> -->
                    <router-view></router-view>
                <!-- </Transition> -->
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
const menuKey = ref('Home');
const HandleMenuSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);

}

</script>

<style lang="less" scoped>
.Entry {
    width: 100vw;
    height: 100vh;

    .Entry-Container {
        width: 100%;
        height: 100%;
        position: relative;

        .Entry-Container-Header {
            color: rgb(255, 255, 255);
            position: fixed;
            top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background-color: rgba(156, 160, 152, 0.5);
            box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);


            .Entry-Container-Header-loginState {
                // text-align: center;
            }
            .Entry-Container-Header-menu{
                .el-menu{
                    border: 0;
                }
            }

            .Entry-Container-Header-logo {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 36px;
                //选择一个比较飘逸的英文字体


            }

            .Entry-Container-Header .el-menu-item {
                text-decoration: none !important;
                /* 去掉下划线 */
            }

        }

        ;

        .Entry-Container-Main {
            // background: url(../../public/你的名字.jpg);
            background-size: cover;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0;
            // background-color: aqua;
        }
    }
}

// /* 进入动画 */
// .move-enter-active,
// .move-leave-active {
//     /* ease 消散淡入淡出 */
//     transition: all 0.5s ease-out;
// }

// .move-enter-from,
// .move-leave-to {
//     transition: translateX(100vw); //从偏移x轴进入页面，回归到正常位置
//     opacity: 0;
// }
</style>