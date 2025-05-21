<template>
  <div class="articles">
    <div class="page-header">
      <h2>文章管理</h2>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.total }}</span>
          <span class="stat-label">总文章数</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.pending }}</span>
          <span class="stat-label">待审核</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.published }}</span>
          <span class="stat-label">已发布</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.rejected }}</span>
          <span class="stat-label">已拒绝</span>
        </div>
      </div>
    </div>

    <div class="filter-bar">
      <el-form :inline="true" :model="filterForm">
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="选择状态">
            <el-option label="全部" value="" />
            <el-option label="待审核" value="pending" />
            <el-option label="已发布" value="published" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="filterForm.category" placeholder="选择分类">
            <el-option label="全部" value="" />
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model="filterForm.keyword"
            placeholder="标题/作者"
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
        :data="articleList"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{
          background: '#f5f7fa',
          color: '#606266',
          fontWeight: '600'
        }"
      >
        <el-table-column prop="title" label="标题" min-width="200">
          <template #default="{ row }">
            <div class="article-title">
              <div class="title-content">
                <span class="title-text">{{ row.title }}</span>
                <div class="title-tags">
                  <el-tag
                    v-if="row.status === 'pending'"
                    type="warning"
                    size="small"
                    effect="dark"
                  >待审核</el-tag>
                  <el-tag
                    v-else-if="row.status === 'rejected'"
                    type="danger"
                    size="small"
                    effect="dark"
                  >已拒绝</el-tag>
                </div>
              </div>
              <div class="article-meta">
                <span class="author">
                  <el-icon><User /></el-icon>
                  {{ row.author }}
                </span>
                <span class="time">
                  <el-icon><Clock /></el-icon>
                  {{ row.createTime }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag effect="dark">{{ getCategoryLabel(row.category) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="100">
          <template #default="{ row }">
            <div class="stat-item">
              <el-icon><View /></el-icon>
              {{ row.views }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="comments" label="评论数" width="100">
          <template #default="{ row }">
            <div class="stat-item">
              <el-icon><ChatDotRound /></el-icon>
              {{ row.comments }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                v-if="row.status === 'pending'"
                type="success"
                size="small"
                class="action-button"
                @click="handleApprove(row)"
              >
                <el-icon><Check /></el-icon>
                通过
              </el-button>
              <el-button
                v-if="row.status === 'pending'"
                type="danger"
                size="small"
                class="action-button"
                @click="handleReject(row)"
              >
                <el-icon><Close /></el-icon>
                拒绝
              </el-button>
              <el-button
                type="primary"
                size="small"
                class="action-button"
                @click="handlePreview(row)"
              >
                <el-icon><View /></el-icon>
                预览
              </el-button>
              <el-button
                type="danger"
                size="small"
                class="action-button"
                @click="handleDelete(row)"
              >
                <el-icon><Delete /></el-icon>
                删除
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

    <!-- 预览对话框 -->
    <el-dialog
      v-model="previewDialogVisible"
      title="文章预览"
      width="70%"
      class="preview-dialog"
    >
      <div class="article-preview">
        <h1>{{ currentArticle.title }}</h1>
        <div class="article-meta">
          <span class="author">
            <el-icon><User /></el-icon>
            {{ currentArticle.author }}
          </span>
          <span class="time">
            <el-icon><Clock /></el-icon>
            {{ currentArticle.createTime }}
          </span>
          <span class="category">
            <el-icon><Collection /></el-icon>
            {{ getCategoryLabel(currentArticle.category) }}
          </span>
        </div>
        <div class="article-content" v-html="currentArticle.content"></div>
      </div>
    </el-dialog>

    <!-- 拒绝原因对话框 -->
    <el-dialog
      v-model="rejectDialogVisible"
      title="拒绝原因"
      width="30%"
      class="reject-dialog"
    >
      <el-form :model="rejectForm">
        <el-form-item label="拒绝原因">
          <el-input
            v-model="rejectForm.reason"
            type="textarea"
            :rows="3"
            placeholder="请输入拒绝原因"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rejectDialogVisible = false" class="action-button">取消</el-button>
          <el-button type="primary" @click="confirmReject" class="action-button">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Refresh,
  Check,
  Close,
  View,
  Delete,
  User,
  Clock,
  ChatDotRound,
  Collection
} from '@element-plus/icons-vue'

// 分类选项
const categories = [
  { value: 'tech', label: '技术' },
  { value: 'life', label: '生活' },
  { value: 'travel', label: '旅行' }
]

// 筛选表单
const filterForm = reactive({
  status: '',
  category: '',
  keyword: ''
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const loading = ref(false)

// 文章列表
const articleList = ref([
  {
    id: '1',
    title: 'Vue3 组合式 API 最佳实践',
    author: '张三',
    category: 'tech',
    createTime: '2025-04-20 10:30:00',
    views: 256,
    comments: 12,
    status: 'pending',
    content: '文章内容...'
  },
  {
    id: '2',
    title: 'TypeScript 类型系统深入解析',
    author: '李四',
    category: 'tech',
    createTime: '2025-04-19 14:20:00',
    views: 189,
    comments: 8,
    status: 'published',
    content: '文章内容...'
  }
])

// 预览相关
const previewDialogVisible = ref(false)
const currentArticle = ref<any>({})

// 拒绝相关
const rejectDialogVisible = ref(false)
const rejectForm = reactive({
  reason: ''
})
const currentRejectArticle = ref<any>({})

// 统计数据
const totalStats = reactive({
  total: 1000,
  pending: 50,
  published: 900,
  rejected: 50
})

// 获取分类标签
const getCategoryLabel = (value: string) => {
  const category = categories.find(item => item.value === value)
  return category ? category.label : value
}

// 搜索
const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索条件：', filterForm)
}

// 重置筛选
const resetFilter = () => {
  filterForm.status = ''
  filterForm.category = ''
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

// 文章操作
const handleApprove = (article: any) => {
  ElMessageBox.confirm(
    '确定要通过这篇文章吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 实现通过逻辑
    ElMessage.success('已通过审核')
  })
}

const handleReject = (article: any) => {
  currentRejectArticle.value = article
  rejectDialogVisible.value = true
}

const confirmReject = () => {
  if (!rejectForm.reason) {
    ElMessage.warning('请输入拒绝原因')
    return
  }
  // 实现拒绝逻辑
  ElMessage.success('已拒绝文章')
  rejectDialogVisible.value = false
  rejectForm.reason = ''
}

const handlePreview = (article: any) => {
  currentArticle.value = article
  previewDialogVisible.value = true
}

const handleDelete = (article: any) => {
  ElMessageBox.confirm(
    '确定要删除这篇文章吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 实现删除逻辑
    ElMessage.success('删除成功')
  })
}
</script>

<style lang="less" scoped>
.articles {
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

    .article-title {
      .title-content {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;

        .title-text {
          font-weight: 500;
          color: #303133;
        }

        .title-tags {
          display: flex;
          gap: 4px;
        }
      }

      .article-meta {
        display: flex;
        gap: 16px;
        color: #909399;
        font-size: 12px;

        .author, .time {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #606266;
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

  .preview-dialog, .reject-dialog {
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

  .article-preview {
    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
    }

    .article-meta {
      display: flex;
      gap: 24px;
      color: #909399;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .article-content {
      line-height: 1.8;
      color: #606266;
    }
  }
}
</style> 