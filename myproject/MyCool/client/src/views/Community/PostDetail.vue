<template>
  <div class="post-detail">
    <div class="post-header">
      <el-button @click="goBack" class="back-button">
        <el-icon><ArrowLeft /></el-icon>
        返回
      </el-button>
      <h2>讨论详情</h2>
    </div>

    <div class="post-content">
      <el-card class="post-card">
        <div class="post-header">
          <div class="user-info">
            <el-avatar :size="48" :src="post.avatar" />
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

        <div class="post-body">
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
            <el-button type="text" @click="handleLike">
              <el-icon><Star /></el-icon>
              {{ post.likes }}
            </el-button>
            <el-button type="text" @click="handleShare">
              <el-icon><Share /></el-icon>
              分享
            </el-button>
          </div>
        </div>
      </el-card>

      <div class="comments-section">
        <h3>全部评论 ({{ post.comments }})</h3>
        <div class="comment-input">
          <el-input
            v-model="newComment"
            type="textarea"
            :rows="3"
            :placeholder="replyTo ? `回复 @${replyTo.username}` : '写下你的评论...'"
          />
          <div class="comment-actions">
            <el-button v-if="replyTo" @click="cancelReply">取消回复</el-button>
            <el-button type="primary" @click="submitComment">
              {{ replyTo ? '回复' : '发表评论' }}
            </el-button>
          </div>
        </div>

        <div class="comment-list">
          <div v-for="comment in post.commentList" :key="comment.id" class="comment-item">
            <el-avatar :size="40" :src="comment.avatar" />
            <div class="comment-content">
              <div class="comment-header">
                <span class="username">{{ comment.username }}</span>
                <span class="time">{{ comment.time }}</span>
              </div>
              <p class="text">{{ comment.content }}</p>
              <div class="comment-actions">
                <el-button type="text" size="small" @click="handleCommentLike(comment)">
                  <el-icon><Star /></el-icon>
                  {{ comment.likes }}
                </el-button>
                <el-button type="text" size="small" @click="handleReply(comment)">
                  <el-icon><ChatDotRound /></el-icon>
                  回复
                </el-button>
              </div>
              
              <!-- 回复列表 -->
              <div v-if="comment.replies && comment.replies.length" class="replies-list">
                <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                  <el-avatar :size="32" :src="reply.avatar" />
                  <div class="reply-content">
                    <div class="reply-header">
                      <span class="username">{{ reply.username }}</span>
                      <span class="time">{{ reply.time }}</span>
                    </div>
                    <p class="text">{{ reply.content }}</p>
                    <div class="reply-actions">
                      <el-button type="text" size="small" @click="handleCommentLike(reply)">
                        <el-icon><Star /></el-icon>
                        {{ reply.likes }}
                      </el-button>
                      <el-button type="text" size="small" @click="handleReply(comment)">
                        <el-icon><ChatDotRound /></el-icon>
                        回复
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Star, Share, More, ChatDotRound } from '@element-plus/icons-vue'

interface Comment {
  id: number
  username: string
  avatar: string
  time: string
  content: string
  likes: number
  replies?: Comment[]
  parentId?: number
}

interface Post {
  id: number
  username: string
  avatar: string
  time: string
  content: string
  images?: string[]
  likes: number
  comments: number
  commentList: Comment[]
}

const route = useRoute()
const router = useRouter()
const newComment = ref('')
const replyTo = ref<{ id: number; username: string } | null>(null)

// 模拟获取帖子数据
const post = ref<Post>({
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
  commentList: [
    {
      id: 1,
      username: '李四',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: '5分钟前',
      content: '我也想去！',
      likes: 5,
      replies: [
        {
          id: 3,
          username: '张三',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          time: '2分钟前',
          content: '好啊，一起吧！',
          likes: 2,
          parentId: 1
        }
      ]
    },
    {
      id: 2,
      username: '王五',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: '3分钟前',
      content: '公园的樱花开了，特别美！',
      likes: 3,
      replies: []
    }
  ]
})

const goBack = () => {
  router.back()
}

const handleLike = () => {
  post.value.likes++
}

const handleShare = () => {
  // 处理分享
  console.log('分享')
}

const handleCommentLike = (comment: Comment) => {
  comment.likes++
}

const handleReply = (comment: Comment) => {
  replyTo.value = { id: comment.id, username: comment.username }
  newComment.value = `@${comment.username} `
}

const submitComment = () => {
  if (newComment.value.trim()) {
    const commentData = {
      id: Date.now(),
      username: '当前用户',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      time: '刚刚',
      content: newComment.value,
      likes: 0
    }

    if (replyTo.value) {
      // 添加回复
      const parentComment = post.value.commentList.find(c => c.id === replyTo.value?.id)
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = []
        }
        commentData.parentId = replyTo.value.id
        parentComment.replies.push(commentData)
      }
      replyTo.value = null
    } else {
      // 添加新评论
      commentData.replies = []
      post.value.commentList.unshift(commentData)
    }
    
    post.value.comments++
    newComment.value = ''
  }
}

const cancelReply = () => {
  replyTo.value = null
  newComment.value = ''
}

onMounted(() => {
  // 这里可以根据路由参数获取帖子详情
  console.log('Post ID:', route.params.id)
})
</script>

<style lang="less" scoped>
.post-detail {
  width: 100%;
  min-height: calc(100vh - 4rem);
  margin-top: 4rem;
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  padding: 24px;
  position: relative;
  max-width: 1000px;
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

  .post-header {
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;

    .back-button {
      margin-right: 16px;
      padding: 10px 20px;
      height: auto;
      font-size: 15px;
      background: #fff;
      border: none;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateX(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        background: #f8fafc;
      }

      .el-icon {
        margin-right: 6px;
        font-size: 16px;
      }
    }

    h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      color: #1e293b;
      letter-spacing: -0.5px;
    }
  }

  .post-content {
    margin: 0 auto;
    position: relative;
    z-index: 1;

    .post-card {
      margin-bottom: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      background: #fff;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(0, 0, 0, 0.05);

      &:hover {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }

      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
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
              font-size: 18px;
              margin-bottom: 4px;
            }

            .time {
              font-size: 13px;
              color: #64748b;
            }
          }
        }
      }

      .post-body {
        padding: 0 24px 24px;

        .text {
          margin: 0 0 20px 0;
          font-size: 15px;
          line-height: 1.7;
          color: #334155;
          letter-spacing: 0.2px;
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

            &:hover {
              transform: scale(1.02);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            }
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

            &:hover {
              color: #3b82f6;
              transform: translateY(-2px);
            }

            .el-icon {
              margin-right: 4px;
              font-size: 16px;
            }
          }
        }
      }
    }

    .comments-section {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.05);

      h3 {
        margin: 0 0 20px 0;
        font-size: 20px;
        font-weight: 600;
        color: #1e293b;
        padding-bottom: 12px;
        border-bottom: 2px solid #f1f5f9;
        letter-spacing: -0.5px;
      }

      .comment-input {
        margin-bottom: 24px;

        .el-input {
          margin-bottom: 16px;

          :deep(.el-textarea__inner) {
            padding: 16px;
            font-size: 15px;
            line-height: 1.6;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: #f8fafc;
            resize: none;

            &:focus {
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
          }
        }

        .comment-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;

          .el-button {
            padding: 10px 24px;
            height: auto;
            font-size: 15px;
            border-radius: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

            &--primary {
              background: #3b82f6;
              border: none;
              box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
              }
            }

            &:not(.el-button--primary) {
              background: #f1f5f9;
              border: none;
              color: #64748b;

              &:hover {
                background: #e2e8f0;
                color: #334155;
              }
            }
          }
        }
      }

      .comment-list {
        .comment-item {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          padding: 20px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
          background: #fff;

          &:hover {
            background: #f8fafc;
            transform: translateX(4px);
            border-color: #e2e8f0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .el-avatar {
            border: 2px solid #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;

            &:hover {
              transform: scale(1.05);
            }
          }

          .comment-content {
            flex: 1;

            .comment-header {
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              gap: 8px;

              .username {
                font-weight: 600;
                color: #1e293b;
                font-size: 15px;
                transition: color 0.2s;

                &:hover {
                  color: #3b82f6;
                }
              }

              .time {
                font-size: 13px;
                color: #64748b;
              }
            }

            .text {
              margin: 0 0 12px 0;
              font-size: 14px;
              line-height: 1.6;
              color: #334155;
            }

            .comment-actions {
              display: flex;
              gap: 16px;

              .el-button {
                padding: 6px 12px;
                height: auto;
                font-size: 13px;
                color: #64748b;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 6px;

                &:hover {
                  color: #3b82f6;
                  background: rgba(59, 130, 246, 0.1);
                  transform: translateY(-1px);
                }

                .el-icon {
                  margin-right: 4px;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }

      .replies-list {
        margin-top: 16px;
        margin-left: 56px;
        padding-left: 16px;
        border-left: 2px solid #e2e8f0;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: -2px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #e2e8f0, #f1f5f9);
        }

        .reply-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding: 16px;
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
          background: #fff;

          &:hover {
            background: #f8fafc;
            border-color: #e2e8f0;
            transform: translateX(4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .el-avatar {
            border: 2px solid #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;

            &:hover {
              transform: scale(1.05);
            }
          }

          .reply-content {
            flex: 1;

            .reply-header {
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              gap: 8px;

              .username {
                font-weight: 600;
                color: #1e293b;
                margin-right: 8px;
                font-size: 14px;
                transition: color 0.2s;

                &:hover {
                  color: #3b82f6;
                }
              }

              .time {
                font-size: 12px;
                color: #64748b;
              }
            }

            .text {
              margin: 0 0 8px 0;
              font-size: 14px;
              line-height: 1.5;
              color: #334155;
            }

            .reply-actions {
              display: flex;
              gap: 12px;

              .el-button {
                padding: 4px 10px;
                height: auto;
                font-size: 12px;
                color: #64748b;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 6px;

                &:hover {
                  color: #3b82f6;
                  background: rgba(59, 130, 246, 0.1);
                  transform: translateY(-1px);
                }

                .el-icon {
                  margin-right: 4px;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 修复 Element Plus 组件样式
:deep(.el-card) {
  border: none;
  background: transparent;
  box-shadow: none;
}

:deep(.el-dropdown-menu) {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  padding: 4px;

  .el-dropdown-menu__item {
    padding: 8px 16px;
    font-size: 14px;
    color: #334155;
    border-radius: 6px;
    transition: all 0.2s;
  }
}

:deep(.el-button--text) {
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

// 响应式布局
@media screen and (max-width: 1366px) {
  .post-detail {
    padding: 20px;
    max-width: 900px;
  }
}

@media screen and (max-width: 992px) {
  .post-detail {
    padding: 16px;
    max-width: 800px;

    .post-header {
      margin-bottom: 20px;

      h2 {
        font-size: 24px;
      }

      .back-button {
        padding: 8px 16px;
        font-size: 14px;
      }
    }

    .post-content {
      .post-card {
        .post-header {
          padding: 20px;
        }

        .post-body {
          padding: 0 20px 20px;
        }

        .post-footer {
          padding: 16px 20px;
        }
      }

      .comments-section {
        padding: 20px;

        h3 {
          font-size: 18px;
        }

        .comment-item {
          padding: 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .post-detail {
    padding: 12px;

    .post-header {
      margin-bottom: 16px;

      h2 {
        font-size: 20px;
      }

      .back-button {
        padding: 6px 12px;
        font-size: 13px;
      }
    }

    .post-content {
      .post-card {
        .post-header {
          padding: 16px;
        }

        .post-body {
          padding: 0 16px 16px;

          .images {
            grid-template-columns: 1fr;
          }
        }

        .post-footer {
          padding: 12px 16px;
        }
      }

      .comments-section {
        padding: 16px;

        h3 {
          font-size: 16px;
        }

        .comment-item {
          padding: 12px;
        }
      }
    }
  }
}
</style> 