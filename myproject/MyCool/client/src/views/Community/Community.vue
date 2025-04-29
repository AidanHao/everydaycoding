<template>
  <div class="community">
    <div class="community-header">
      <h2>社区讨论</h2>
      <el-button type="primary" @click="handlePost">
        <el-icon><Plus /></el-icon>
        发布讨论
      </el-button>
    </div>

    <div class="community-sidebar">
      <div class="sidebar-section">
        <h3>分类</h3>
        <div class="category-list">
          <div class="category-item" v-for="category in categories" :key="category.value">
            <el-icon><Folder /></el-icon>
            <span>{{ category.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="community-content">
      <div class="post-list">
        <el-card v-for="post in posts" :key="post.id" class="post-card" @click="viewPostDetail(post)">
          <div class="post-header">
            <div class="user-info">
              <el-avatar :size="40" :src="post.avatar" />
              <div class="user-details">
                <span class="username">{{ post.username }}</span>
                <span class="time">{{ post.time }}</span>
              </div>
            </div>
            <el-dropdown>
              <el-button type="text">
                <el-icon><More /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="post-content">
            <p class="text">{{ post.content }}</p>
            <div class="images" v-if="post.images && post.images.length">
              <el-image
                v-for="(image, index) in post.images"
                :key="index"
                :src="image"
                :preview-src-list="post.images"
                fit="cover"
                class="post-image"
              />
            </div>
          </div>
          <div class="post-footer">
            <div class="actions">
              <el-button type="text" @click.stop="handleLike(post)">
                <el-icon><Star /></el-icon>
                {{ post.likes }}
              </el-button>
              <el-button type="text" @click.stop="handleComment(post)">
                <el-icon><ChatDotRound /></el-icon>
                {{ post.comments }}
              </el-button>
              <el-button type="text" @click.stop="handleShare(post)">
                <el-icon><Share /></el-icon>
                分享
              </el-button>
            </div>
          </div>
          <div class="hot-comment" v-if="post.hotComment">
            <div class="comment-item">
              <el-avatar :size="32" :src="post.hotComment.avatar" />
              <div class="comment-content">
                <div class="comment-header">
                  <span class="username">{{ post.hotComment.username }}</span>
                  <span class="time">{{ post.hotComment.time }}</span>
                </div>
                <p class="text">{{ post.hotComment.content }}</p>
                <div class="comment-actions">
                  <el-button type="text" size="small">
                    <el-icon><Star /></el-icon>
                    {{ post.hotComment.likes }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <div v-if="loading" class="loading-more">
          <el-icon class="is-loading"><Loading /></el-icon>
          加载更多...
        </div>
      </div>
    </div>

    <div class="community-rightbar">
      <div class="rightbar-section">
        <h3>热门话题</h3>
        <div class="hot-topics">
          <div class="topic-item" v-for="topic in hotTopics" :key="topic.id">
            <div class="topic-info">
              <div class="title">{{ topic.title }}</div>
              <div class="meta">
                <span>{{ topic.views }} 浏览</span>
                <span>{{ topic.comments }} 评论</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布讨论对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="发布讨论"
      width="50%"
    >
      <el-form :model="postForm" label-width="80px">
        <el-form-item label="内容">
          <el-input
            v-model="postForm.content"
            type="textarea"
            :rows="4"
            placeholder="分享你的想法..."
          />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleImageChange"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPost">发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Plus, Star, ChatDotRound, Share, More, Folder, Loading } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Post {
  id: number
  username: string
  avatar: string
  time: string
  content: string
  images?: string[]
  likes: number
  comments: number
  showComments: boolean
  commentList: Comment[]
  newComment: string
  hotComment?: Comment
}

interface Comment {
  id: number
  username: string
  avatar: string
  time: string
  content: string
  likes: number
}

interface Category {
  value: string
  label: string
}

interface HotTopic {
  id: number
  title: string
  views: number
  comments: number
}

interface PostForm {
  content: string
  images: string[]
}

const categories = ref<Category[]>([
  { value: 'tech', label: '技术讨论' },
  { value: 'life', label: '生活分享' },
  { value: 'study', label: '学习交流' },
  { value: 'work', label: '工作心得' },
  { value: 'other', label: '其他' }
])

const posts = ref<Post[]>([
  {
    id: 1,
    username: '张三',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    time: '10分钟前',
    content: '今天天气真好，准备去公园散步！',
    images: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/7aa00ed178a4b8366a78e6f7c88dbjpeg.jpeg'
    ],
    likes: 12,
    comments: 3,
    showComments: false,
    commentList: [
      {
        id: 1,
        username: '李四',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        time: '5分钟前',
        content: '我也想去！',
        likes: 5
      },
      {
        id: 2,
        username: '王五',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        time: '3分钟前',
        content: '公园的樱花开了，特别美！',
        likes: 3
      }
    ],
    newComment: '',
    hotComment: {
      id: 1,
      username: '李四',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: '5分钟前',
      content: '我也想去！',
      likes: 5
    }
  },
  {
    id: 2,
    username: '王五',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    time: '1小时前',
    content: '分享一个有趣的技术文章：Vue3 组合式 API 最佳实践',
    likes: 8,
    comments: 2,
    showComments: false,
    commentList: [
      {
        id: 1,
        username: '赵六',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        time: '30分钟前',
        content: '这篇文章写得很好，学到了很多！',
        likes: 4
      }
    ],
    newComment: '',
    hotComment: {
      id: 1,
      username: '赵六',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: '30分钟前',
      content: '这篇文章写得很好，学到了很多！',
      likes: 4
    }
  },
  {
    id: 3,
    username: '李四',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    time: '2小时前',
    content: '最近在学习 TypeScript，感觉类型系统真的很强大，推荐大家也来学习！',
    likes: 15,
    comments: 5,
    showComments: false,
    commentList: [
      {
        id: 1,
        username: '张三',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        time: '1小时前',
        content: 'TypeScript 确实很棒，特别是对大型项目的帮助很大！',
        likes: 7
      }
    ],
    newComment: '',
    hotComment: {
      id: 1,
      username: '张三',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: '1小时前',
      content: 'TypeScript 确实很棒，特别是对大型项目的帮助很大！',
      likes: 7
    }
  }
])

// 生成更多假数据
const generateMorePosts = (): Post[] => {
  const newPosts: Post[] = []
  for (let i = 0; i < 5; i++) {
    const post: Post = {
      id: posts.value.length + i + 1,
      username: `用户${posts.value.length + i + 1}`,
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: `${Math.floor(Math.random() * 24)}小时前`,
      content: `这是第${posts.value.length + i + 1}条讨论内容，分享一些有趣的想法...`,
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20),
      showComments: false,
      commentList: [],
      newComment: ''
    }
    newPosts.push(post)
  }
  return newPosts
}

// 滚动加载
const loading = ref(false)
const handleScroll = (): void => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight

  if (scrollHeight - scrollTop - clientHeight < 100 && !loading.value) {
    loading.value = true
    setTimeout(() => {
      posts.value.push(...generateMorePosts())
      loading.value = false
    }, 1000)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 查看讨论详情
const viewPostDetail = (post: Post): void => {
  router.push(`/community/post/${post.id}`)
}

const dialogVisible = ref(false)
const postForm = reactive<PostForm>({
  content: '',
  images: []
})

const handlePost = (): void => {
  dialogVisible.value = true
}

const handleImageChange = (file: UploadFile): void => {
  // 处理图片上传
  console.log(file)
}

const submitPost = (): void => {
  // 处理发布
  dialogVisible.value = false
}

const handleLike = (post: Post): void => {
  post.likes++
}

const handleComment = (post: Post): void => {
  post.showComments = !post.showComments
}

const handleShare = (post: Post): void => {
  // 处理分享
  console.log('分享', post)
}

const submitComment = (post: Post): void => {
  if (post.newComment.trim()) {
    post.commentList.push({
      id: Date.now(),
      username: '当前用户',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: '刚刚',
      content: post.newComment,
      likes: 0
    })
    post.comments++
    post.newComment = ''
  }
}

const hotTopics = ref<HotTopic[]>([
  {
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    views: 1234,
    comments: 56
  },
  {
    id: 2,
    title: 'TypeScript 类型系统深入解析',
    views: 890,
    comments: 34
  },
  {
    id: 3,
    title: 'Node.js 性能优化指南',
    views: 567,
    comments: 23
  }
])
</script>

<style lang="less" scoped>
.community {
  width: 100%;
  min-height: calc(100vh - 4rem);
  margin-top: 4rem;
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  display: grid;
  grid-template-columns: minmax(240px, 280px) minmax(0, 1fr) minmax(280px, 320px);
  gap: 24px;
  padding: 24px;
  position: relative;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;

  &::before {
    content: '';
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
    z-index: -1;
  }

  .community-header {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 28px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 16px;
    color: #fff;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.1);
    position: relative;
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(37, 99, 235, 0.15);
    }

    h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    .el-button {
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: #fff;
      font-weight: 500;
      padding: 12px 24px;
      height: auto;
      font-size: 15px;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .el-icon {
        margin-right: 6px;
        font-size: 16px;
      }
    }
  }

  .community-sidebar {
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    height: fit-content;
    position: sticky;
    top: 100px;
    z-index: 1;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: calc(100vh - 140px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    &:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }

    .sidebar-section {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }

      h3 {
        margin: 0 0 20px 0;
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        padding-bottom: 12px;
        border-bottom: 2px solid #f1f5f9;
        letter-spacing: -0.5px;
      }

      .category-list {
        .category-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 10px;
          border: 1px solid transparent;

          &:hover {
            background: #f8fafc;
            transform: translateX(4px);
            border-color: #e2e8f0;
          }

          .el-icon {
            margin-right: 10px;
            color: #64748b;
            font-size: 16px;
          }

          span {
            color: #334155;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }
  }

  .community-content {
    position: relative;
    z-index: 1;
    min-width: 0;

    .post-list {
      .post-card {
        margin-bottom: 20px;
        border-radius: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.05);
        cursor: pointer;
        overflow: hidden;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #f1f5f9;

          .user-info {
            display: flex;
            align-items: center;
            gap: 16px;

            .el-avatar {
              border: 2px solid #fff;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            }

            .user-details {
              display: flex;
              flex-direction: column;

              .username {
                font-weight: 600;
                color: #1e293b;
                font-size: 16px;
                margin-bottom: 4px;
              }

              .time {
                font-size: 13px;
                color: #64748b;
              }
            }
          }
        }

        .post-content {
          padding: 24px;

          .text {
            margin: 0 0 20px 0;
            font-size: 15px;
            line-height: 1.7;
            color: #334155;
            letter-spacing: 0.2px;
            word-break: break-word;
          }

          .images {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 16px;

            .post-image {
              width: 100%;
              height: 240px;
              border-radius: 10px;
              object-fit: cover;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
          }
        }

        .post-footer {
          border-top: 1px solid #f1f5f9;
          padding: 16px 24px;

          .actions {
            display: flex;
            gap: 24px;

            .el-button {
              padding: 0;
              height: auto;
              font-size: 14px;
              color: #64748b;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

              .el-icon {
                margin-right: 4px;
                font-size: 16px;
              }
            }
          }
        }

        .hot-comment {
          padding: 16px 24px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;

          .comment-item {
            display: flex;
            gap: 12px;

            .el-avatar {
              border: 2px solid #fff;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            }

            .comment-content {
              flex: 1;
              min-width: 0;

              .comment-header {
                margin-bottom: 6px;

                .username {
                  font-weight: 600;
                  color: #1e293b;
                  margin-right: 8px;
                  font-size: 15px;
                }

                .time {
                  font-size: 13px;
                  color: #64748b;
                }
              }

              .text {
                margin: 0 0 8px 0;
                font-size: 14px;
                line-height: 1.6;
                color: #334155;
                word-break: break-word;
              }

              .comment-actions {
                display: flex;
                gap: 16px;

                .el-button {
                  padding: 0;
                  height: auto;
                  font-size: 13px;
                  color: #64748b;
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                  .el-icon {
                    margin-right: 4px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .community-rightbar {
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    height: fit-content;
    position: sticky;
    top: 100px;
    z-index: 1;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: calc(100vh - 140px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    &:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }

    .rightbar-section {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }

      h3 {
        margin: 0 0 20px 0;
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        padding-bottom: 12px;
        border-bottom: 2px solid #f1f5f9;
        letter-spacing: -0.5px;
      }

      .hot-topics {
        .topic-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 12px;
          border: 1px solid transparent;

          .topic-info {
            flex: 1;
            min-width: 0;

            .title {
              color: #1e293b;
              margin-bottom: 6px;
              font-size: 15px;
              font-weight: 500;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .meta {
              font-size: 13px;
              color: #64748b;
              display: flex;
              gap: 12px;
            }
          }
        }
      }
    }
  }
}

// 对话框样式优化
:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 90vw;
  width: 640px !important;

  .el-dialog__header {
    margin: 0;
    padding: 24px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #fff;

    .el-dialog__title {
      color: #fff;
      font-weight: 600;
      font-size: 20px;
      letter-spacing: -0.5px;
    }

    .el-dialog__headerbtn {
      .el-dialog__close {
        color: #fff;
        font-size: 18px;
      }
    }
  }

  .el-dialog__body {
    padding: 24px;
  }

  .el-dialog__footer {
    padding: 16px 24px;
    border-top: 1px solid #f1f5f9;
  }
}

.loading-more {
  text-align: center;
  padding: 20px;
  color: #64748b;
  font-size: 15px;
  font-weight: 500;

  .el-icon {
    margin-right: 6px;
    font-size: 16px;
  }
}

// 响应式布局
@media screen and (max-width: 1366px) {
  .community {
    grid-template-columns: minmax(220px, 260px) minmax(0, 1fr) minmax(260px, 300px);
    gap: 20px;
    padding: 20px;
  }
}

@media screen and (max-width: 1200px) {
  .community {
    grid-template-columns: minmax(200px, 240px) minmax(0, 1fr);
    gap: 20px;
    padding: 20px;

    .community-rightbar {
      display: none;
    }
  }
}

@media screen and (max-width: 992px) {
  .community {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 16px;

    .community-sidebar {
      display: none;
    }

    .community-header {
      padding: 24px;
      margin-bottom: 20px;

      h2 {
        font-size: 24px;
      }

      .el-button {
        padding: 10px 20px;
        font-size: 14px;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .community {
    padding: 12px;

    .community-header {
      padding: 20px;
      margin-bottom: 16px;

      h2 {
        font-size: 20px;
      }

      .el-button {
        padding: 8px 16px;
        font-size: 13px;
      }
    }

    .post-card {
      .post-header {
        padding: 16px;
      }

      .post-content {
        padding: 16px;

        .images {
          grid-template-columns: 1fr;
        }
      }

      .post-footer {
        padding: 12px 16px;
      }

      .hot-comment {
        padding: 12px 16px;
      }
    }
  }
}
</style> 