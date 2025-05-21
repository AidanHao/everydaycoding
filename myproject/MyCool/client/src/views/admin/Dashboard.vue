<template>
  <div class="dashboard">
    <div class="page-header">
      <h2>数据概览</h2>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.visits }}</span>
          <span class="stat-label">总访问量</span>
          <span class="stat-trend" :class="{ 'up': todayStats.visits > 0 }">
            <el-icon><ArrowUp v-if="todayStats.visits > 0" /><ArrowDown v-else /></el-icon>
            {{ Math.abs(todayStats.visits) }}
          </span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.users }}</span>
          <span class="stat-label">注册用户</span>
          <span class="stat-trend" :class="{ 'up': todayStats.users > 0 }">
            <el-icon><ArrowUp v-if="todayStats.users > 0" /><ArrowDown v-else /></el-icon>
            {{ Math.abs(todayStats.users) }}
          </span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.articles }}</span>
          <span class="stat-label">文章数量</span>
          <span class="stat-trend" :class="{ 'up': todayStats.articles > 0 }">
            <el-icon><ArrowUp v-if="todayStats.articles > 0" /><ArrowDown v-else /></el-icon>
            {{ Math.abs(todayStats.articles) }}
          </span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalStats.comments }}</span>
          <span class="stat-label">评论数量</span>
          <span class="stat-trend" :class="{ 'up': todayStats.comments > 0 }">
            <el-icon><ArrowUp v-if="todayStats.comments > 0" /><ArrowDown v-else /></el-icon>
            {{ Math.abs(todayStats.comments) }}
          </span>
        </div>
      </div>
    </div>

    <div class="charts-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>访问趋势</span>
                <el-radio-group v-model="visitTimeRange" size="small">
                  <el-radio-button label="week">本周</el-radio-button>
                  <el-radio-button label="month">本月</el-radio-button>
                  <el-radio-button label="year">全年</el-radio-button>
                </el-radio-group>
              </div>
            </template>
            <div class="chart-content">
              <div id="visitChart" style="width: 100%; height: 300px;"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>用户增长</span>
                <el-radio-group v-model="userTimeRange" size="small">
                  <el-radio-button label="week">本周</el-radio-button>
                  <el-radio-button label="month">本月</el-radio-button>
                  <el-radio-button label="year">全年</el-radio-button>
                </el-radio-group>
              </div>
            </template>
            <div class="chart-content">
              <div id="userChart" style="width: 100%; height: 300px;"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="data-cards">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="data-card">
            <template #header>
              <div class="card-header">
                <span>热门文章</span>
                <el-button type="primary" link>查看全部</el-button>
              </div>
            </template>
            <div class="card-content">
              <div v-for="(article, index) in hotArticles" :key="index" class="article-item">
                <span class="rank" :class="{ 'top': index < 3 }">{{ index + 1 }}</span>
                <div class="article-info">
                  <div class="title">{{ article.title }}</div>
                  <div class="meta">
                    <span class="views">
                      <el-icon><View /></el-icon>
                      {{ article.views }}
                    </span>
                    <span class="comments">
                      <el-icon><ChatDotRound /></el-icon>
                      {{ article.comments }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="data-card">
            <template #header>
              <div class="card-header">
                <span>活跃用户</span>
                <el-button type="primary" link>查看全部</el-button>
              </div>
            </template>
            <div class="card-content">
              <div v-for="(user, index) in activeUsers" :key="index" class="user-item">
                <el-avatar :size="32" :src="user.avatar" />
                <div class="user-info">
                  <div class="name">{{ user.username }}</div>
                  <div class="meta">
                    <span class="articles">
                      <el-icon><Document /></el-icon>
                      {{ user.articles }}
                    </span>
                    <span class="comments">
                      <el-icon><ChatDotRound /></el-icon>
                      {{ user.comments }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="data-card">
            <template #header>
              <div class="card-header">
                <span>最近活动</span>
                <el-button type="primary" link>查看全部</el-button>
              </div>
            </template>
            <div class="card-content">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in recentActivities"
                  :key="index"
                  :timestamp="activity.time"
                  :type="activity.type"
                  :color="getActivityColor(activity.type)"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import {
  ArrowUp,
  ArrowDown,
  TrendCharts,
  User,
  View,
  ChatDotRound,
  Document
} from '@element-plus/icons-vue'

// 统计数据
const totalStats = ref({
  visits: 1234,
  users: 789,
  articles: 345,
  comments: 1234
})

const todayStats = ref({
  visits: 8,
  users: 3,
  articles: 2,
  comments: 12
})

// 时间范围选择
const visitTimeRange = ref('week')
const userTimeRange = ref('week')

// 访问趋势数据
const visitTrendData = ref([
  { date: '05-14', visits: 12, users: 5 },
  { date: '05-15', visits: 8, users: 3 },
  { date: '05-16', visits: 15, users: 7 },
  { date: '05-17', visits: 9, users: 4 },
  { date: '05-18', visits: 11, users: 6 },
  { date: '05-19', visits: 7, users: 3 },
  { date: '05-20', visits: 8, users: 4 }
])

// 用户增长数据
const userGrowthData = ref([
  { date: '05-14', newUsers: 3, activeUsers: 15 },
  { date: '05-15', newUsers: 2, activeUsers: 12 },
  { date: '05-16', newUsers: 4, activeUsers: 18 },
  { date: '05-17', newUsers: 1, activeUsers: 10 },
  { date: '05-18', newUsers: 3, activeUsers: 14 },
  { date: '05-19', newUsers: 2, activeUsers: 11 },
  { date: '05-20', newUsers: 3, activeUsers: 13 }
])

// 热门文章
const hotArticles = ref([
  {
    title: 'Vue3 组合式 API 最佳实践',
    views: 256,
    comments: 23,
    likes: 45,
    author: '张三',
    category: '技术'
  },
  {
    title: 'TypeScript 类型系统深入解析',
    views: 189,
    comments: 18,
    likes: 34,
    author: '李四',
    category: '技术'
  },
  {
    title: 'Node.js 性能优化指南',
    views: 145,
    comments: 15,
    likes: 28,
    author: '王五',
    category: '技术'
  },
  {
    title: '前端工程化实践总结',
    views: 123,
    comments: 12,
    likes: 25,
    author: '赵六',
    category: '技术'
  },
  {
    title: '微服务架构设计模式',
    views: 112,
    comments: 10,
    likes: 23,
    author: '钱七',
    category: '架构'
  }
])

// 活跃用户
const activeUsers = ref([
  {
    username: '张三',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    articles: 5,
    comments: 12,
    likes: 34,
    lastActive: '10分钟前'
  },
  {
    username: '李四',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    articles: 3,
    comments: 8,
    likes: 25,
    lastActive: '30分钟前'
  },
  {
    username: '王五',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    articles: 2,
    comments: 6,
    likes: 18,
    lastActive: '1小时前'
  },
  {
    username: '赵六',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    articles: 1,
    comments: 4,
    likes: 12,
    lastActive: '2小时前'
  },
  {
    username: '钱七',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    articles: 1,
    comments: 3,
    likes: 8,
    lastActive: '3小时前'
  }
])

// 最近活动
const recentActivities = ref([
  {
    content: '用户 "张三" 发布了新文章《Vue3 最佳实践》',
    time: '今天 10:30',
    type: 'primary',
    user: '张三',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  },
  {
    content: '用户 "李四" 注册成为新用户',
    time: '今天 09:15',
    type: 'success',
    user: '李四',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  },
  {
    content: '文章《TypeScript 入门指南》被删除',
    time: '昨天 16:45',
    type: 'danger',
    user: '王五',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  },
  {
    content: '系统更新完成',
    time: '昨天 14:20',
    type: 'info',
    user: '系统',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  },
  {
    content: '用户 "赵六" 发表了评论',
    time: '昨天 11:30',
    type: 'warning',
    user: '赵六',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  }
])

// 获取活动颜色
const getActivityColor = (type: string) => {
  const colors: { [key: string]: string } = {
    primary: '#409EFF',
    success: '#67C23A',
    warning: '#E6A23C',
    danger: '#F56C6C',
    info: '#909399'
  }
  return colors[type] || colors.info
}

// 访问趋势图表实例
let visitChart: echarts.ECharts | null = null
// 用户增长图表实例
let userChart: echarts.ECharts | null = null

// 初始化访问趋势图表
const initVisitChart = () => {
  const chartDom = document.getElementById('visitChart')
  if (!chartDom) return
  
  visitChart = echarts.init(chartDom)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['访问量', '用户数'],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '60px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: visitTrendData.value.map(item => item.date),
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: visitTrendData.value.map(item => item.visits),
        itemStyle: {
          color: '#409EFF'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(64,158,255,0.3)'
            },
            {
              offset: 1,
              color: 'rgba(64,158,255,0.1)'
            }
          ])
        }
      },
      {
        name: '用户数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: visitTrendData.value.map(item => item.users),
        itemStyle: {
          color: '#67C23A'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(103,194,58,0.3)'
            },
            {
              offset: 1,
              color: 'rgba(103,194,58,0.1)'
            }
          ])
        }
      }
    ]
  }
  visitChart.setOption(option)
}

// 初始化用户增长图表
const initUserChart = () => {
  const chartDom = document.getElementById('userChart')
  if (!chartDom) return
  
  userChart = echarts.init(chartDom)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['新增用户', '活跃用户']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: userGrowthData.value.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '新增用户',
        type: 'bar',
        data: userGrowthData.value.map(item => item.newUsers),
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: '活跃用户',
        type: 'line',
        smooth: true,
        data: userGrowthData.value.map(item => item.activeUsers),
        itemStyle: {
          color: '#67C23A'
        }
      }
    ]
  }
  userChart.setOption(option)
}

// 监听时间范围变化
watch([visitTimeRange, userTimeRange], () => {
  // 这里可以根据时间范围重新获取数据
  // 暂时使用现有数据
  if (visitChart) {
    visitChart.setOption({
      xAxis: {
        data: visitTrendData.value.map(item => item.date)
      },
      series: [
        {
          data: visitTrendData.value.map(item => item.visits)
        },
        {
          data: visitTrendData.value.map(item => item.users)
        }
      ]
    })
  }
  
  if (userChart) {
    userChart.setOption({
      xAxis: {
        data: userGrowthData.value.map(item => item.date)
      },
      series: [
        {
          data: userGrowthData.value.map(item => item.newUsers)
        },
        {
          data: userGrowthData.value.map(item => item.activeUsers)
        }
      ]
    })
  }
})

// 监听窗口大小变化
window.addEventListener('resize', () => {
  visitChart?.resize()
  userChart?.resize()
})

onMounted(() => {
  initVisitChart()
  initUserChart()
})
</script>

<style lang="less" scoped>
.dashboard {
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
      flex-wrap: wrap;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        min-width: 160px;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;

        .stat-value {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }

        .stat-trend {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 10px;
          z-index: 1;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

          &.up {
            color: #00ff00;
            background: rgba(0, 255, 0, 0.15);
            border: 1px solid rgba(0, 255, 0, 0.3);
          }

          &:not(.up) {
            color: #ff0000;
            background: rgba(255, 0, 0, 0.15);
            border: 1px solid rgba(255, 0, 0, 0.3);
          }
        }
      }
    }
  }

  .charts-container {
    margin-bottom: 24px;

    .chart-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #f0f0f0;

        span {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }
      }

      .chart-content {
        padding: 20px;
        height: 300px;
      }
    }
  }

  .data-cards {
    .data-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #f0f0f0;

        span {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }
      }

      .card-content {
        padding: 20px;

        .article-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .rank {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f7fa;
            border-radius: 4px;
            font-weight: 600;
            color: #909399;

            &.top {
              background: #1890ff;
              color: #fff;
            }
          }

          .article-info {
            flex: 1;

            .title {
              font-size: 14px;
              color: #303133;
              margin-bottom: 4px;
            }

            .meta {
              display: flex;
              gap: 16px;
              color: #909399;
              font-size: 12px;

              span {
                display: flex;
                align-items: center;
                gap: 4px;
              }
            }
          }
        }

        .user-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .user-info {
            flex: 1;

            .name {
              font-size: 14px;
              color: #303133;
              margin-bottom: 4px;
            }

            .meta {
              display: flex;
              gap: 16px;
              color: #909399;
              font-size: 12px;

              span {
                display: flex;
                align-items: center;
                gap: 4px;
              }
            }
          }
        }

        :deep(.el-timeline-item) {
          .el-timeline-item__node {
            width: 12px;
            height: 12px;
          }

          .el-timeline-item__content {
            display: flex;
            align-items: center;
            gap: 8px;

            .user-info {
              display: flex;
              align-items: center;
              gap: 8px;

              .el-avatar {
                width: 24px;
                height: 24px;
              }

              .username {
                color: #409EFF;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }

  .chart-card {
    .chart-content {
      .chart-placeholder {
        .el-icon {
          font-size: 64px;
          opacity: 0.2;
          color: #409EFF;
        }

        span {
          font-size: 18px;
          color: #606266;
        }
      }
    }
  }
}
</style> 