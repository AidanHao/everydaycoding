<template>
  <div class="admin-layout">
    <div class="admin-sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <h2 v-show="!isCollapsed">管理后台</h2>
        <el-icon v-show="isCollapsed" class="collapsed-icon"><Setting /></el-icon>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        @select="handleSelect"
        :collapse="isCollapsed"
      >
        <el-menu-item index="dashboard">
          <el-icon><DataLine /></el-icon>
          <template #title>数据概览</template>
        </el-menu-item>
        <el-menu-item index="articles">
          <el-icon><Document /></el-icon>
          <template #title>文章管理</template>
        </el-menu-item>
        <el-menu-item index="users">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
      <div class="sidebar-footer">
        <el-button
          type="primary"
          class="back-button"
          @click="handleBack"
        >
          <el-icon><Back /></el-icon>
          <span v-show="!isCollapsed">返回用户界面</span>
        </el-button>
      </div>
    </div>
    <div class="admin-content" :class="{ 'expanded': isCollapsed }">
      <div class="content-header">
        <div class="header-left">
          <el-button
            type="text"
            class="collapse-btn"
            @click="toggleCollapse"
          >
            <el-icon>
              <component :is="isCollapsed ? 'Expand' : 'Fold'" />
            </el-icon>
          </el-button>
          <h2>{{ pageTitle }}</h2>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" :src="userInfo.avatar" />
              <span>{{ userInfo.username }}</span>
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="content-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { DataLine, Document, User, Setting, Back, CaretBottom, Expand, Fold } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const activeMenu = ref('dashboard')
const isCollapsed = ref(false)
const userInfo = ref({
  username: '管理员',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const pageTitle = computed(() => {
  const titles: { [key: string]: string } = {
    dashboard: '数据概览',
    articles: '文章管理',
    users: '用户管理',
    settings: '系统设置'
  }
  return titles[activeMenu.value] || '管理后台'
})

const handleSelect = (key: string) => {
  activeMenu.value = key
  router.push(`/admin/${key}`)
}

const handleBack = () => {
  router.push('/home')
}

const handleLogout = () => {
  // 实现退出登录逻辑
  router.push('/login')
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// 响应式处理
const checkScreenSize = () => {
  const width = window.innerWidth
  if (width <= 768) {
    isCollapsed.value = true
  } else if (width <= 1024) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style lang="less" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;

  .admin-sidebar {
    width: 240px;
    background-color: #001529;
    color: #fff;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 1000;

    &.collapsed {
      width: 64px;

      .sidebar-header {
        padding: 0;
        justify-content: center;

        .collapsed-icon {
          font-size: 24px;
          color: #fff;
        }
      }

      .sidebar-menu {
        :deep(.el-menu-item) {
          padding: 0 20px;
        }
      }

      .sidebar-footer {
        padding: 8px;

        .back-button {
          padding: 8px;
          justify-content: center;

          span {
            display: none;
          }
        }
      }
    }

    .sidebar-header {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
      padding: 0 16px;

      h2 {
        color: #fff;
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }

    .sidebar-menu {
      flex: 1;
      border-right: none;
      background-color: transparent;

      :deep(.el-menu-item) {
        color: rgba(255, 255, 255, 0.65);
        height: 50px;
        line-height: 50px;
        margin: 4px 0;
        
        &:hover, &.is-active {
          color: #fff;
          background-color: #1890ff;
          border-radius: 4px;
          margin: 4px 8px;
        }

        .el-icon {
          margin-right: 10px;
          font-size: 18px;
        }
      }
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);

      .back-button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
        border: none;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
        }

        .el-icon {
          font-size: 16px;
        }
      }
    }
  }

  .admin-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 240px;
    transition: all 0.3s;

    &.expanded {
      margin-left: 64px;
    }

    .content-header {
      height: 64px;
      background-color: #fff;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      position: fixed;
      top: 0;
      right: 0;
      left: 240px;
      z-index: 999;
      transition: all 0.3s;

      .admin-content.expanded & {
        left: 64px;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 16px;

        .collapse-btn {
          padding: 8px;
          font-size: 20px;
          color: #606266;
          transition: all 0.3s;

          &:hover {
            color: #1890ff;
            transform: scale(1.1);
          }
        }

        h2 {
          margin: 0;
          font-size: 1.2rem;
          color: #001529;
          font-weight: 600;
        }
      }

      .header-right {
        .user-info {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: all 0.3s;

          &:hover {
            background-color: #f5f7fa;
          }

          span {
            margin: 0 8px;
            color: #001529;
          }

          .el-icon {
            color: #909399;
          }
        }
      }
    }

    .content-main {
      flex: 1;
      padding: 24px;
      margin-top: 64px;
      overflow-y: auto;
      background-color: #f5f7fa;
    }
  }
}

// 响应式布局
@media screen and (max-width: 1200px) {
  .admin-layout {
    .admin-content {
      .content-header {
        padding: 0 16px;
      }

      .content-main {
        padding: 16px;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .admin-layout {
    .admin-sidebar {
      transform: translateX(-100%);
      
      &.collapsed {
        transform: translateX(0);
      }
    }

    .admin-content {
      margin-left: 0 !important;

      .content-header {
        left: 0 !important;
        padding: 0 12px;
      }

      .content-main {
        padding: 12px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .admin-layout {
    .admin-sidebar {
      width: 100%;
      max-width: 300px;
      
      &.collapsed {
        width: 64px;
      }
    }

    .admin-content {
      .content-header {
        .header-left {
          h2 {
            font-size: 1rem;
          }
        }

        .header-right {
          .user-info {
            span {
              display: none;
            }
          }
        }
      }

      .content-main {
        padding: 8px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .admin-layout {
    .admin-sidebar {
      max-width: 100%;
      
      &.collapsed {
        width: 100%;
      }

      .sidebar-header {
        height: 48px;
      }

      .sidebar-menu {
        :deep(.el-menu-item) {
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .admin-content {
      .content-header {
        height: 48px;
        padding: 0 8px;

        .header-left {
          .collapse-btn {
            padding: 4px;
            font-size: 16px;
          }
        }
      }

      .content-main {
        margin-top: 48px;
      }
    }
  }
}

// 添加触摸滑动支持
@media (hover: none) and (pointer: coarse) {
  .admin-layout {
    .admin-sidebar {
      touch-action: pan-x;
      transition: transform 0.3s ease;
    }
  }
}
</style> 