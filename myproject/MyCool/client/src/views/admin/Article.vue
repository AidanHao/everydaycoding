<template>
  <div class="article-manage">
    <div class="page-header">
      <h2>文章管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        新增文章
      </el-button>
    </div>

    <div class="search-bar">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item>
          <el-input
            v-model="searchForm.title"
            placeholder="文章标题"
            clearable
            :prefix-icon="Search"
            class="search-input"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.category"
            placeholder="文章分类"
            clearable
            class="search-select"
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.status"
            placeholder="发布状态"
            clearable
            class="search-select"
          >
            <el-option label="已发布" value="published" />
            <el-option label="草稿" value="draft" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="resetSearch">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- ... rest of the template ... -->
  </div>
</template>

<style lang="less" scoped>
.article-manage {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 24px;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-radius: 8px;
    color: #fff;

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .el-button {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: #fff;
      font-weight: 500;
      padding: 8px 16px;
      height: auto;
      transition: all 0.3s;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
      }

      .el-icon {
        margin-right: 4px;
      }
    }
  }

  .search-bar {
    margin-bottom: 24px;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .search-form {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      .el-form-item {
        margin-bottom: 0;
        margin-right: 0;
      }

      .search-input {
        width: 240px;

        :deep(.el-input__wrapper) {
          box-shadow: 0 0 0 1px #dcdfe6 inset;
          transition: all 0.3s;

          &:hover {
            box-shadow: 0 0 0 1px #409eff inset;
          }

          &.is-focus {
            box-shadow: 0 0 0 1px #409eff inset;
          }
        }

        :deep(.el-input__prefix) {
          color: #909399;
        }
      }

      .search-select {
        width: 200px;

        :deep(.el-input__wrapper) {
          box-shadow: 0 0 0 1px #dcdfe6 inset;
          transition: all 0.3s;

          &:hover {
            box-shadow: 0 0 0 1px #409eff inset;
          }

          &.is-focus {
            box-shadow: 0 0 0 1px #409eff inset;
          }
        }

        :deep(.el-input__inner) {
          &::placeholder {
            color: #909399;
          }
        }

        :deep(.el-select__placeholder) {
          color: #909399;
          font-size: 14px;
        }
      }

      .el-button {
        padding: 8px 16px;
        height: auto;
        font-weight: 500;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-1px);
        }

        .el-icon {
          margin-right: 4px;
        }
      }
    }
  }

  // ... rest of the styles ...
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Plus, Refresh } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

interface SearchForm {
  title: string
  category: string
  status: string
}

interface Category {
  value: string
  label: string
}

const searchForm = reactive<SearchForm>({
  title: '',
  category: '',
  status: ''
})

const categories = ref<Category[]>([
  { value: 'tech', label: '技术' },
  { value: 'life', label: '生活' },
  { value: 'other', label: '其他' }
])

const handleAdd = () => {
  // 处理新增文章
}

const handleSearch = () => {
  // 处理搜索
}

const resetSearch = () => {
  searchForm.title = ''
  searchForm.category = ''
  searchForm.status = ''
}
</script> 