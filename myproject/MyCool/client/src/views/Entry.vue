<template>
    <div class="Entry">
        <el-container class="Entry-Container">
            <el-header class="Entry-Container-Header">
                
                <div class="Entry-Container-Header-menu">
                    <el-menu default-active="Home" mode="horizontal" @select="HandleMenuSelect" router=true
                        background-color="transParent" text-color="#F5F0DC" active-text-color="#F2D356" :ellipsis="false"
                        class="Entry-Container-Header-menu-detail"> 
                        <el-menu-item index="Home">首页 </el-menu-item>
                        <el-menu-item index="Self">个人中心</el-menu-item>

                        <!-- <el-menu-item index="Public">公共聊天室 </el-menu-item> -->
                        <!-- <el-menu-item index="Img">图片库 </el-menu-item> -->
                        <!-- <el-menu-item index="Other">其他 </el-menu-item> -->
                    </el-menu>
                </div>
                <div class="Entry-Container-Header-loginState">
                    <!-- <span>管理员</span> -->
                </div>
                <!-- <div class="Entry-Container-Header-filter">

                </div> -->
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
        .Entry-Container-Header {
            z-index: 999;
            color: rgb(0, 0, 0);
            position: fixed;
            top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 4rem;
            background-color: rgba(6, 72, 84, 0.5);
            backdrop-filter: blur(5px);
            
            box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
            .Entry-Container-Header-loginState {
                font-size: 1rem;
            }

            .Entry-Container-Header-menu {
                font-weight: bold;
                .el-menu {
                    border: 0;
                }
            }

            .Entry-Container-Header .el-menu-item {
                text-decoration: none !important;
                /* 去掉下划线 */
            }

        };

        .Entry-Container-Main {
            background-size: cover;
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            padding: 0;
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