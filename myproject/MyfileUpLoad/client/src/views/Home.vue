<template>
  <div class="common-layout">
    <el-container>
      <el-header class="head_all">
        <div class="head_detail">
          <div class="head_left">
            <text>欢迎您！！</text>
          </div>
          <div class="head_center">
            <text>Aidan资源库</text>
          </div>
          <div class="head_right">
            <text>你好</text>
          </div>
        </div>
      </el-header>

      <!-- 侧边 -->
      <el-container class="body-side">
        <el-aside>
          <el-row class="tac">
            <el-col :span="15">
              <el-menu adefault-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location />
                    </el-icon>
                    <span>图片资源</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>大文件资源</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>敬请期待</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>音频资源</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <el-icon><icon-menu /></el-icon>
                  <span>其他资源</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <el-icon><icon-menu /></el-icon>
                  <span>其他资源</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <el-icon><icon-menu /></el-icon>
                  <span>其他资源</span>
                </el-menu-item>
                

              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import { ref } from 'vue'


</script>

<style lang="less" scoped>
.common-layout {
  .head_all {
    margin-bottom: 1rem;
    text{
      // 设置字体颜色渐变
      background: linear-gradient(to right, rgb(5, 246, 250), rgb(238, 0, 255));
      -webkit-background-clip: text;
      /*将设置的背景颜色限制在文字中*/
      -webkit-text-fill-color: transparent;
      /*给文字设置成透明*/
    }

    // background: linear-gradient(to right, rgb(0, 217, 255), rgb(197, 5, 250));
    background: url(https://img95.699pic.com/photo/40162/1594.jpg_wh860.jpg);
    width: 100vw;
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

      .head_right {
        float: right;
      }
    }
  }

  .body_side {
    height: max-content;
  }
}
</style>