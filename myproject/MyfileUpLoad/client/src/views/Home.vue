<template>
  <Newjoin v-if="state.showNewJoin" :showNewJoin="state.showNewJoin" :Show="ShowNewJoin" />
  <div class="common-layout">
    <el-container>
      <el-header class="head_all">
        <div class="head_detail">
          <div class="head_left">
            <text>欢迎您！！</text>
          </div>
          <div class="head_center">
            <text>项目库</text>
          </div>
          <div class="head_avatar">
            <el-avatar src="../../public/img/login-avatar.jpg" v-if="state.islogin" </el-avatar>
              <el-avatar v-else>null</el-avatar>
          </div>
          <div class="head_right">
            <el-dropdown>

              <span class="el-dropdown-link">
                <text>{{ state.islogin ? state.nickname : '未登录' }}</text>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogin" v-if="!state.islogin">登录</el-dropdown-item>
                  <el-dropdown-item @click="ShowNewJoin">查看弹窗</el-dropdown-item>
                  <el-dropdown-item @click="handleExit" v-if="state.islogin">退出登录</el-dropdown-item>
                  <!-- <el-dropdown-item divided>退出登录</el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <!-- 侧边和body -->
      <el-container class="body_all">

        <!-- 侧边 -->
        <el-aside class="body_side">
          <el-row class="tac">
            <el-col>
              <el-menu router :default-active='nowindex' class="el-menu-vertical-demo" @select="handleSelect" background-color="#ecf5ff" >     
                <el-menu-item index="1" route="/first" @click="handleClick">
                  <el-icon><icon-menu /></el-icon>
                  <span>首页</span>
                </el-menu-item>

                <el-menu-item index="2" route="/bigfiles" @click="handleClick">
                  <el-icon><icon-menu /></el-icon>
                  <span>大文件资源</span>
                </el-menu-item>

                <el-menu-item index="3" route="/video" @click="handleClick">
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>视频资源</span>
                </el-menu-item>

                <el-menu-item index="4" route="/radio" @click="handleClick">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>音频资源</span>
                </el-menu-item>

                <el-menu-item index="5" route="/image" @click="handleClick">
                  <el-icon><icon-menu /></el-icon>
                  <span>图片资源</span>
                </el-menu-item>

                <el-menu-item index="6" route="/another" @click="handleClick">
                  <el-icon><icon-menu /></el-icon>
                  <span>其他资源</span>
                </el-menu-item>
                <el-menu-item index="7" disabled>
                  <el-icon><icon-menu /></el-icon>
                  <span>敬请期待</span>
                </el-menu-item>


              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <!-- 主体 -->
        <el-main class="body_main">
          <router-view></router-view>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>


<script setup>
// 引入一个组件
import Newjoin from "../components/NewJoin.vue";
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, reactive } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

// 引入pinia
import { userStore } from '../store'
import { storeToRefs } from 'pinia'
const store = userStore()

// 声明路由
const router = useRouter()
const route = useRoute()

const state = reactive({
  showNewJoin: false,
  islogin: false,
  nickname: '未登录'
})

// 保存用户登录状态
const { nickname, islogin } = storeToRefs(store)
nickname.value = state.nickname
islogin.value = state.islogin


// 当前总和路径
const allurl = ['/first', '/bigfiles', '/video', '/radio', '/image', '/another']
// 拿到当前路径
const nowurl = window.location.pathname
// 拿到当前下标
const numindex = allurl.indexOf(nowurl) + 1
const nowindex = '' + numindex

// 获取登录状态
onBeforeMount(() => {
  let userdata = sessionStorage.getItem("userInfo");
  userdata = JSON.parse(userdata)
  if (userdata !== null) {
    state.islogin = true
    state.nickname = userdata.nickname
    // 保存到pinia
    nickname.value = state.nickname
    islogin.value = state.islogin
  }
})


const handleExit = () => {
  sessionStorage.removeItem("userInfo")
  state.islogin = false
  state.nickname = '未登录'
  // 保存到pinia
  nickname.value = state.nickname
  islogin.value = state.islogin
  router.push('/login')
}


const handleSelect = (key, path) => {

}

const handleClick = (item) => {
  // console.log(item);
}

const handleLogin = function () {
  router.push('/login')
}

const ShowNewJoin = (showNewJoin) => {
  state.showNewJoin = !state.showNewJoin
}



</script>

<style lang="less" scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: auto;

  .head_all {

    // margin-bottom: 10px;
    text {
      // 设置字体颜色渐变
      background: linear-gradient(to right, rgb(50, 5, 250), rgb(224, 41, 241));
      -webkit-background-clip: text;
      /*将设置的背景颜色限制在文字中*/
      -webkit-text-fill-color: transparent;
      /*给文字设置成透明*/
    }

    // background: linear-gradient(to right, rgb(0, 217, 255), rgb(197, 5, 250));
    // background: url(https://img95.699pic.com/photo/40162/1594.jpg_wh860.jpg);
    background-color: #c6e2ff;
    width: 100%;
    height: 5rem;

    .head_detail {
      height: 100%;
      display: flex;
      align-items: center;

      .head_left {
        float: left;
      }

      .head_center {
        font-size: 2rem;
        flex: auto;
        text-align: center;
      }

      .head_avatar {}

      .head_right {
        float: right;
        text-align: center;

        text {
          font-size: 1rem;
        }
      }
    }
  }

  .body_all {
    flex: 1;
    background-color: #d9ecff;


    .body_side {
      height: 100%;

      // background: #ecf5ff;
      .tac {
        height: 100%;

        .el-menu-vertical-demo {
          height: 100%;
        }
      }
    }

    .body_main {
      padding: 0;
      padding-left: 10px;
    }

  }
}
</style>