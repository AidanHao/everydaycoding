<template>
  <div class="users">
    <div class="page-header">
      <h2>用户管理</h2>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.total }}</span>
          <span class="stat-label">总用户数</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.active }}</span>
          <span class="stat-label">活跃用户</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.banned }}</span>
          <span class="stat-label">已封禁</span>
        </div>
      </div>
    </div>

    <div class="filter-bar">
      <el-form :inline="true" :model="filterForm">
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="选择状态">
            <el-option label="全部" value="" />
            <el-option label="正常" value="active" />
            <el-option label="已封禁" value="banned" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="filterForm.role" placeholder="选择角色">
            <el-option label="全部" value="" />
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model="filterForm.keyword"
            placeholder="用户名/邮箱"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" class="action-button">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="resetFilter" class="action-button">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-container">
      <el-table
        :data="userList"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{
          background: '#f5f7fa',
          color: '#606266',
          fontWeight: '600'
        }"
      >
        <el-table-column prop="username" label="用户名" min-width="120">
          <template #default="{ row }">
            <div class="user-info">
              <el-avatar :size="32" :src="row.avatar || defaultAvatar" />
              <span>{{ row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'success'" effect="dark">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'" effect="dark">
              {{ row.status === 'active' ? '正常' : '已封禁' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="180" />
        <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                v-if="row.status === 'active'"
                type="danger"
                size="small"
                class="action-button"
                @click="handleBan(row)"
              >
                <el-icon><Lock /></el-icon>
                封禁
              </el-button>
              <el-button
                v-else
                type="success"
                size="small"
                class="action-button"
                @click="handleUnban(row)"
              >
                <el-icon><Unlock /></el-icon>
                解封
              </el-button>
              <el-button
                v-if="row.role === 'user'"
                type="warning"
                size="small"
                class="action-button"
                @click="handlePromote(row)"
              >
                <el-icon><ArrowUp /></el-icon>
                提升为管理员
              </el-button>
              <el-button
                v-else
                type="info"
                size="small"
                class="action-button"
                @click="handleDemote(row)"
              >
                <el-icon><ArrowDown /></el-icon>
                降级为普通用户
              </el-button>
              <el-button
                type="primary"
                size="small"
                class="action-button"
                @click="handleEdit(row)"
              >
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 编辑用户对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑用户"
      width="30%"
      class="edit-dialog"
    >
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editForm.role">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editForm.status">
            <el-option label="正常" value="active" />
            <el-option label="已封禁" value="banned" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false" class="action-button">取消</el-button>
          <el-button type="primary" @click="confirmEdit" class="action-button">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Lock, Unlock, ArrowUp, ArrowDown, Edit } from '@element-plus/icons-vue'

// 默认头像
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

// 统计数据
const totalStats = reactive({
  total: 1000,
  active: 850,
  banned: 150
})

// 筛选表单
const filterForm = reactive({
  status: '',
  role: '',
  keyword: ''
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const loading = ref(false)

// 用户列表
const userList = ref([
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    registerTime: '2025-04-01 00:00:00',
    lastLoginTime: '2025-04-20 10:30:00'
  },
  {
    id: '2',
    username: 'user1',
    email: 'user1@example.com',
    role: 'user',
    status: 'active',
    registerTime: '2025-04-15 00:00:00',
    lastLoginTime: '2025-04-19 14:20:00'
  }
])

// 编辑相关
const editDialogVisible = ref(false)
const editForm = reactive({
  id: '',
  username: '',
  email: '',
  role: '',
  status: ''
})

// 搜索
const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索条件：', filterForm)
}

// 重置筛选
const resetFilter = () => {
  filterForm.status = ''
  filterForm.role = ''
  filterForm.keyword = ''
  handleSearch()
}

// 分页处理
const handleSizeChange = (val: number) => {
  pageSize.value = val
  handleSearch()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleSearch()
}

// 用户操作
const handleBan = (user: any) => {
  ElMessageBox.confirm(
    '确定要封禁该用户吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 实现封禁逻辑
    ElMessage.success('已封禁用户')
  })
}

const handleUnban = (user: any) => {
  ElMessageBox.confirm(
    '确定要解封该用户吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    // 实现解封逻辑
    ElMessage.success('已解封用户')
  })
}

const handlePromote = (user: any) => {
  ElMessageBox.confirm(
    '确定要将该用户提升为管理员吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 实现提升逻辑
    ElMessage.success('已提升为管理员')
  })
}

const handleDemote = (user: any) => {
  ElMessageBox.confirm(
    '确定要将该管理员降级为普通用户吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 实现降级逻辑
    ElMessage.success('已降级为普通用户')
  })
}

const handleEdit = (user: any) => {
  Object.assign(editForm, user)
  editDialogVisible.value = true
}

const confirmEdit = () => {
  // 实现编辑逻辑
  ElMessage.success('修改成功')
  editDialogVisible.value = false
}
</script>

<style lang="less" scoped>
.users {
  .page-header {
    margin-bottom: 24px;
    padding: 24px;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-radius: 8px;
    color: #fff;

    h2 {
      margin: 0 0 16px 0;
      font-size: 24px;
      font-weight: 600;
    }

    .header-stats {
      display: flex;
      gap: 32px;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .stat-value {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }
      }
    }
  }

  .filter-bar {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    .action-button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .table-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    padding: 20px;
    margin-bottom: 20px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .el-avatar {
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .action-button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .el-icon {
        font-size: 14px;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  }

  .edit-dialog {
    :deep(.el-dialog__header) {
      padding: 20px;
      margin: 0;
      border-bottom: 1px solid #f0f0f0;
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
      color: #fff;

      .el-dialog__title {
        color: #fff;
      }

      .el-dialog__close {
        color: #fff;
      }
    }

    :deep(.el-dialog__body) {
      padding: 24px;
    }

    :deep(.el-dialog__footer) {
      padding: 16px 24px;
      border-top: 1px solid #f0f0f0;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
}
</style> 