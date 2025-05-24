<template>
    <div class="ArticleDetail">
        <div class="ArticleDetail_header">
            <div class="ArticleDetail_header_title">
                <h1>{{ article.title }}</h1>
                <div class="ArticleDetail_header_meta">
                    <div class="meta_item">
                        <el-icon><User /></el-icon>
                        <span>{{ article.author }}</span>
                    </div>
                    <div class="meta_item">
                        <el-icon><Calendar /></el-icon>
                        <span>{{ formatDate(article.createTime) }}</span>
                    </div>
                    <div class="meta_item">
                        <el-icon><View /></el-icon>
                        <span>{{ article.views }} 阅读</span>
                    </div>
                    <div class="meta_item">
                        <el-icon><ChatDotRound /></el-icon>
                        <span>{{ article.comments }} 评论</span>
                    </div>
                    <div class="meta_item">
                        <el-icon><Star /></el-icon>
                        <span>{{ article.thumbsUp || 0 }} 点赞</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="ArticleDetail_content">
            <div class="ArticleDetail_content_sidebar left">
                <div class="sidebar-card">
                    <h3>热门文章</h3>
                    <div class="hot-articles">
                        <div v-for="hot in hotArticles" :key="hot.id" 
                             class="hot-item" 
                             @click="goToArticle(hot.id)">
                            <div class="hot-rank" :class="{ 'top-3': hot.rank <= 3 }">{{ hot.rank }}</div>
                            <div class="hot-content">
                                <div class="hot-title">{{ hot.title }}</div>
                                <div class="hot-meta">
                                    <span>{{ hot.views }} 阅读</span>
                                    <span>{{ hot.likes }} 点赞</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sidebar-card">
                    <h3>最新文章</h3>
                    <div class="latest-articles">
                        <div v-for="latest in latestArticles" :key="latest.id" 
                             class="latest-item" 
                             @click="goToArticle(latest.id)">
                            <div class="latest-cover" v-if="latest.cover">
                                <el-image :src="latest.cover" fit="cover" />
                            </div>
                            <div class="latest-content">
                                <div class="latest-title">{{ latest.title }}</div>
                                <div class="latest-meta">
                                    <span>{{ formatDate(latest.createTime) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ArticleDetail_content_main">
                <div class="content-text">
                    <MdPreview :modelValue="renderedContent" />
                </div>
                <div class="content-tags">
                    <el-tag v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</el-tag>
                </div>
            </div>
            <div class="ArticleDetail_content_sidebar right">
                <div class="sidebar-card author-info">
                    <div class="author-avatar">
                        <el-avatar :size="80" :src="article.authorAvatar" />
                    </div>
                    <h3>{{ article.author }}</h3>
                    <p class="author-bio">{{ article.authorBio || '暂无简介' }}</p>
                    <div class="author-stats">
                        <div class="stat-item">
                            <span class="stat-value">{{ article.authorArticles || 0 }}</span>
                            <span class="stat-label">文章</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">{{ article.authorFollowers || 0 }}</span>
                            <span class="stat-label">关注者</span>
                        </div>
                    </div>
                    <el-button type="primary" class="follow-btn">关注作者</el-button>
                </div>
                <div class="sidebar-card">
                    <h3>目录</h3>
                    <div class="toc-list">
                        <div v-for="(item, index) in toc" :key="index" 
                             :class="['toc-item', `toc-level-${item.level}`]"
                             @click="scrollToHeading(item.id)">
                            {{ item.text }}
                        </div>
                    </div>
                </div>
                <div class="sidebar-card">
                    <h3>相关文章</h3>
                    <div class="related-articles">
                        <div v-for="related in relatedArticles" :key="related.id" 
                             class="related-item" 
                             @click="goToArticle(related.id)">
                            <div class="related-cover" v-if="related.cover">
                                <el-image :src="related.cover" fit="cover" />
                            </div>
                            <div class="related-content">
                                <div class="related-title">{{ related.title }}</div>
                                <div class="related-meta">
                                    <span>{{ formatDate(related.createTime) }}</span>
                                    <span>{{ related.views }} 阅读</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ArticleDetail_footer">
            <div class="action-buttons">
                <el-button :type="isLiked ? 'primary' : 'default'" @click="handleLike" :class="{ 'is-liked': isLiked }">
                    <el-icon><Star /></el-icon>
                    <span>{{ article.thumbsUp || 0 }} 点赞</span>
                </el-button>
                <el-button :type="isCollected ? 'success' : 'default'" @click="handleCollect" :class="{ 'is-collected': isCollected }">
                    <el-icon><Collection /></el-icon>
                    <span>{{ article.collection || 0 }} 收藏</span>
                </el-button>
                <el-button type="default" @click="scrollToComments">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>{{ comments.length }} 评论</span>
                </el-button>
                <el-button type="default" @click="handleShare">
                    <el-icon><Share /></el-icon>
                    <span>分享</span>
                </el-button>
            </div>
        </div>

        <div class="ArticleDetail_comments" id="comments">
            <div class="comments-header">
                <h2>评论区</h2>
                <div class="comments-stats">
                    <span>{{ comments.length }} 条评论</span>
                </div>
            </div>

            <div class="comment-editor">
                <el-input
                    v-model="newComment"
                    type="textarea"
                    :rows="3"
                    placeholder="写下你的评论..."
                    :maxlength="500"
                    show-word-limit
                />
                <div class="editor-footer">
                    <div class="editor-tools">
                        <el-button type="primary" plain size="small">
                            <el-icon><ChatDotRound /></el-icon>
                            插入图片
                        </el-button>
                        <el-button type="primary" plain size="small">
                            <el-icon><Star /></el-icon>
                            表情
                        </el-button>
                    </div>
                    <el-button type="primary" @click="submitComment" :disabled="!newComment.trim()">
                        发表评论
                    </el-button>
                </div>
            </div>

            <div class="comments-list">
                <div v-for="comment in comments" :key="comment.id" class="comment-item">
                    <div class="comment-avatar">
                        <el-avatar :size="40" :src="comment.userAvatar" />
                    </div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <div class="comment-user">
                                <span class="username">{{ comment.username }}</span>
                                <el-tag size="small" type="success" v-if="comment.isAuthor">作者</el-tag>
                            </div>
                            <div class="comment-time">{{ formatDate(comment.createTime) }}</div>
                        </div>
                        <div class="comment-text">{{ comment.content }}</div>
                        <div class="comment-actions">
                            <el-button type="text" @click="handleCommentLike(comment)">
                                <el-icon><Star /></el-icon>
                                <span>{{ comment.likes || 0 }}</span>
                            </el-button>
                            <el-button type="text" @click="handleReply(comment)">
                                <el-icon><ChatDotRound /></el-icon>
                                <span>回复</span>
                            </el-button>
                        </div>
                        <div class="comment-replies" v-if="comment.replies && comment.replies.length > 0">
                            <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                                <div class="reply-avatar">
                                    <el-avatar :size="32" :src="reply.userAvatar" />
                                </div>
                                <div class="reply-content">
                                    <div class="reply-header">
                                        <div class="reply-user">
                                            <span class="username">{{ reply.username }}</span>
                                            <el-tag size="small" type="success" v-if="reply.isAuthor">作者</el-tag>
                                        </div>
                                        <div class="reply-time">{{ formatDate(reply.createTime) }}</div>
                                    </div>
                                    <div class="reply-text">
                                        <template v-if="reply.replyTo">
                                            回复 <span class="reply-to">@{{ reply.replyTo }}</span>：
                                        </template>
                                        {{ reply.content }}
                                    </div>
                                    <div class="reply-actions">
                                        <el-button type="text" @click="handleCommentLike(reply)">
                                            <el-icon><Star /></el-icon>
                                            <span>{{ reply.likes || 0 }}</span>
                                        </el-button>
                                        <el-button type="text" @click="handleReply(comment, reply)">
                                            <el-icon><ChatDotRound /></el-icon>
                                            <span>回复</span>
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ArticleDetail_back" @click="goBack">
            <el-icon><ArrowLeft /></el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Calendar, View, ChatDotRound, Star, Collection, Share, ArrowLeft, Picture } from '@element-plus/icons-vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { ElMessage } from 'element-plus'
import axios from '@/api'

interface Article {
    id: string
    title: string
    summary: string
    content: string
    createTime: string
    updateTime?: string
    views: number
    comments: number
    category: string
    tags: string[]
    cover?: string
    coverImg?: string
    status: 'published' | 'draft' | 'pending' | 'rejected'
    thumbsUp?: number
    collection?: number
    author: string
    authorAvatar?: string
    authorBio?: string
    authorArticles?: number
    authorFollowers?: number
}

interface TocItem {
    id: string
    text: string
    level: number
}

interface Comment {
    id: string
    content: string
    createTime: string
    username: string
    userAvatar: string
    likes: number
    isAuthor: boolean
    replies?: Comment[]
    replyTo?: string
}

const route = useRoute()
const router = useRouter()

const article = ref<Article>({
    id: '',
    title: '',
    summary: '',
    content: '',
    createTime: '',
    views: 0,
    comments: 0,
    category: '',
    tags: [],
    status: 'draft',
    thumbsUp: 0,
    collection: 0,
    author: '',
    authorAvatar: 'https://picsum.photos/200',
    authorBio: '热爱写作的程序员',
    authorArticles: 10,
    authorFollowers: 100
})

const relatedArticles = ref<Partial<Article>[]>([])
const toc = ref<TocItem[]>([])
const isLiked = ref(false)
const isCollected = ref(false)

const renderedContent = computed(() => {
    return article.value.content
})

const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString()
}

const goToArticle = (id: string | undefined) => {
    if (typeof id === 'string') {
        router.push({
            path: `/article/${id}`,
            query: { _t: Date.now() }
        })
    }
}

const handleLike = () => {
    isLiked.value = !isLiked.value
    article.value.thumbsUp = (article.value.thumbsUp || 0) + (isLiked.value ? 1 : -1)
    ElMessage({
        message: isLiked.value ? '点赞成功' : '已取消点赞',
        type: isLiked.value ? 'success' : 'info',
        duration: 2000,
        offset: 80
    })
}

const handleCollect = () => {
    isCollected.value = !isCollected.value
    article.value.collection = (article.value.collection || 0) + (isCollected.value ? 1 : -1)
    ElMessage({
        message: isCollected.value ? '收藏成功' : '已取消收藏',
        type: isCollected.value ? 'success' : 'info',
        duration: 2000,
        offset: 80
    })
}

const handleComment = () => {
    console.log('打开评论区')
}

const handleShare = () => {
    ElMessage({
        message: '分享链接已复制到剪贴板',
        type: 'success',
        duration: 2000,
        offset: 80
    })
}

const goBack = () => {
    router.back()
}

const generateToc = () => {
    const content = document.querySelector('.content-text')
    if (!content) return

    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6')
    toc.value = Array.from(headings).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1])
    }))
}

const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const hotArticles = ref([
    {
        id: '6',
        title: '深入理解 Vue 3 响应式系统原理',
        views: 3500,
        likes: 280,
        rank: 1
    },
    {
        id: '7',
        title: 'TypeScript 高级类型实战指南',
        views: 2800,
        likes: 210,
        rank: 2
    },
    {
        id: '8',
        title: '前端性能优化最佳实践',
        views: 2500,
        likes: 190,
        rank: 3
    },
    {
        id: '9',
        title: 'Vue 3 组合式 API 完全指南',
        views: 2200,
        likes: 170,
        rank: 4
    },
    {
        id: '10',
        title: '现代前端工程化实践',
        views: 2000,
        likes: 150,
        rank: 5
    }
])

const latestArticles = ref([
    {
        id: '11',
        title: 'Vue 3 状态管理最佳实践',
        createTime: '2024-03-16T09:30:00',
        cover: 'https://picsum.photos/300/200'
    },
    {
        id: '12',
        title: 'TypeScript 装饰器详解',
        createTime: '2024-03-16T08:15:00',
        cover: 'https://picsum.photos/300/200'
    },
    {
        id: '13',
        title: '前端微服务架构实践',
        createTime: '2024-03-15T16:45:00',
        cover: 'https://picsum.photos/300/200'
    }
])

const comments = ref<Comment[]>([
    {
        id: '1',
        content: '这篇文章写得非常详细，对Vue3和TypeScript的讲解很到位，感谢分享！',
        createTime: '2024-03-16T10:30:00',
        username: '前端爱好者',
        userAvatar: 'https://picsum.photos/200',
        likes: 15,
        isAuthor: false,
        replies: [
            {
                id: '1-1',
                content: '谢谢支持！如果有什么问题随时交流。',
                createTime: '2024-03-16T11:00:00',
                username: '前端开发者',
                userAvatar: 'https://picsum.photos/200',
                likes: 5,
                isAuthor: true,
                replyTo: '前端爱好者'
            }
        ]
    },
    {
        id: '2',
        content: '请问这个项目是开源的吗？想学习一下完整的代码实现。',
        createTime: '2024-03-16T09:15:00',
        username: '学习达人',
        userAvatar: 'https://picsum.photos/200',
        likes: 8,
        isAuthor: false
    }
])

const newComment = ref('')
const replyTo = ref<{ comment: Comment; reply?: Comment } | null>(null)

const scrollToComments = () => {
    const commentsElement = document.getElementById('comments')
    if (commentsElement) {
        commentsElement.scrollIntoView({ behavior: 'smooth' })
    }
}

const submitComment = () => {
    if (!newComment.value.trim()) return

    const comment: Comment = {
        id: Date.now().toString(),
        content: newComment.value,
        createTime: new Date().toISOString(),
        username: '当前用户',
        userAvatar: 'https://picsum.photos/200',
        likes: 0,
        isAuthor: false
    }

    if (replyTo.value) {
        if (replyTo.value.reply) {
            // 回复评论的回复
            const parentComment = comments.value.find(c => c.id === replyTo.value?.comment.id)
            if (parentComment) {
                if (!parentComment.replies) parentComment.replies = []
                comment.replyTo = replyTo.value.reply.username
                parentComment.replies.push(comment)
                ElMessage({
                    message: `回复 @${replyTo.value.reply.username} 成功`,
                    type: 'success',
                    duration: 2000,
                    offset: 80
                })
            }
        } else {
            // 回复评论
            const parentComment = comments.value.find(c => c.id === replyTo.value?.comment.id)
            if (parentComment) {
                if (!parentComment.replies) parentComment.replies = []
                comment.replyTo = replyTo.value.comment.username
                parentComment.replies.push(comment)
                ElMessage({
                    message: `回复 @${replyTo.value.comment.username} 成功`,
                    type: 'success',
                    duration: 2000,
                    offset: 80
                })
            }
        }
    } else {
        // 新评论
        comments.value.unshift(comment)
        ElMessage({
            message: '评论发表成功',
            type: 'success',
            duration: 2000,
            offset: 80
        })
    }

    newComment.value = ''
    replyTo.value = null
}

const handleCommentLike = (comment: Comment) => {
    comment.likes = (comment.likes || 0) + 1
    ElMessage({
        message: '点赞成功',
        type: 'success',
        duration: 2000,
        offset: 80
    })
}

const handleReply = (comment: Comment, reply?: Comment) => {
    replyTo.value = { comment, reply }
    scrollToComments()
}

// 获取文章详情的函数
const fetchArticleDetail = async (id: string) => {
    try {
        const response = await axios.get(`/getArticleDetails/${id}`);
        
        if (response.data.code === '8000' && response.data.data) {
            const articleData = response.data.data;
            article.value = {
                id: articleData.articleId,
                title: articleData.title,
                summary: articleData.articleDesc || '',
                content: articleData.content,
                createTime: articleData.publishTime,
                updateTime: articleData.updateTime,
                views: articleData.viewCount,
                comments: articleData.commentCount,
                category: articleData.articleType,
                tags: articleData.articleLabel ? articleData.articleLabel.split(',') : [],
                coverImg: articleData.coverImg,
                status: articleData.status === 1 ? 'published' : 'draft',
                thumbsUp: articleData.likeCount,
                collection: articleData.collectionCount,
                author: articleData.username,
                authorAvatar: articleData.avatar,
                authorBio: articleData.bio || '暂无简介',
                authorArticles: articleData.articleCount || 0,
                authorFollowers: articleData.followerCount || 0
            };

            // 生成目录
            setTimeout(generateToc, 100);
        } else {
            ElMessage.error(response.data.msg || '获取文章详情失败');
        }
    } catch (error) {
        console.error('获取文章详情失败:', error);
        ElMessage.error('获取文章详情失败');
    }
};

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
    if (typeof newId === 'string') {
        fetchArticleDetail(newId)
    }
}, { immediate: true })

onMounted(() => {
    const id = route.params.id
    if (typeof id === 'string') {
        fetchArticleDetail(id)
    }
})
</script>

<style lang="less" scoped>
.ArticleDetail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 1.2vh 1.2vw;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(14, 165, 233, 0.1);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(14, 165, 233, 0.3);
        border-radius: 3px;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(14, 165, 233, 0.5);
        }
    }

    .ArticleDetail_header {
        margin-bottom: 1.5vh;
        width: 95%;
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
        background: rgba(255, 255, 255, 0.95);
        padding: 1.5vh 1.5vw;
        border-radius: 0.8rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        border: 1px solid rgba(14, 165, 233, 0.1);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
            border-color: rgba(14, 165, 233, 0.2);
        }

        .ArticleDetail_header_title {
            text-align: center;
            margin-bottom: 1.5rem;

            h1 {
                font-size: 2rem;
                color: #0369a1;
                margin-bottom: 1rem;
                line-height: 1.3;
                font-weight: 700;
            }

            .ArticleDetail_header_meta {
                display: flex;
                justify-content: center;
                gap: 0.8rem;
                color: #64748b;
                flex-wrap: wrap;

                .meta_item {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    padding: 0.5rem 0.8rem;
                    border-radius: 0.6rem;
                    background: rgba(14, 165, 233, 0.1);
                    color: #0ea5e9;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    font-size: 0.85rem;

                    &:hover {
                        background: rgba(14, 165, 233, 0.15);
                        transform: translateY(-1px);
                    }

                    .el-icon {
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    .ArticleDetail_content {
        width: 95%;
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        gap: 1.2vw;

        .ArticleDetail_content_sidebar {
            width: 16%;
            min-width: 220px;
            flex-shrink: 0;
            position: sticky;
            top: 2vh;
            align-self: flex-start;

            .sidebar-card {
                background: rgba(255, 255, 255, 0.95);
                padding: 1.2rem;
                border-radius: 0.8rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                margin-bottom: 1.2rem;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(14, 165, 233, 0.1);

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
                    border-color: rgba(14, 165, 233, 0.2);
                }

                h3 {
                    font-size: 1.1rem;
                    color: #0369a1;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid rgba(14, 165, 233, 0.1);
                }

                .hot-articles {
                    .hot-item {
                        display: flex;
                        align-items: center;
                        padding: 0.8rem;
                        border-radius: 0.6rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-bottom: 0.8rem;
                        background: rgba(14, 165, 233, 0.05);

                        &:hover {
                            background: rgba(14, 165, 233, 0.1);
                            transform: translateX(4px);
                        }

                        .hot-rank {
                            width: 24px;
                            height: 24px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #e2e8f0;
                            color: #64748b;
                            border-radius: 0.4rem;
                            font-size: 0.9rem;
                            font-weight: 600;
                            margin-right: 0.8rem;

                            &.top-3 {
                                background: #0ea5e9;
                                color: white;
                            }
                        }

                        .hot-content {
                            flex: 1;
                            min-width: 0;

                            .hot-title {
                                font-size: 0.9rem;
                                color: #334155;
                                margin-bottom: 0.4rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            .hot-meta {
                                font-size: 0.8rem;
                                color: #64748b;
                                display: flex;
                                gap: 0.8rem;
                            }
                        }
                    }
                }

                .latest-articles {
                    .latest-item {
                        display: flex;
                        gap: 0.8rem;
                        padding: 0.8rem;
                        border-radius: 0.6rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-bottom: 0.8rem;
                        background: rgba(14, 165, 233, 0.05);
                        border: 1px solid rgba(14, 165, 233, 0.1);

                        &:hover {
                            background: rgba(14, 165, 233, 0.1);
                            transform: translateX(4px);
                            border-color: rgba(14, 165, 233, 0.2);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

                            .latest-cover {
                                .el-image {
                                    transform: scale(1.05);
                                }
                            }

                            .latest-content {
                                .latest-title {
                                    color: #0369a1;
                                }
                            }
                        }

                        .latest-cover {
                            width: 70px;
                            height: 50px;
                            border-radius: 0.4rem;
                            overflow: hidden;
                            flex-shrink: 0;

                            .el-image {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                transition: all 0.3s ease;
                            }
                        }

                        .latest-content {
                            flex: 1;
                            min-width: 0;

                            .latest-title {
                                font-size: 0.9rem;
                                color: #334155;
                                margin-bottom: 0.4rem;
                                line-height: 1.4;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                transition: all 0.3s ease;
                            }

                            .latest-meta {
                                font-size: 0.8rem;
                                color: #64748b;
                            }
                        }
                    }
                }

                &.author-info {
                    text-align: center;

                    .author-avatar {
                        margin-bottom: 1rem;

                        .el-avatar {
                            border: 3px solid white;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        }
                    }

                    h3 {
                        font-size: 1.2rem;
                        color: #0369a1;
                        margin-bottom: 0.8rem;
                    }

                    .author-bio {
                        font-size: 0.9rem;
                        color: #64748b;
                        margin-bottom: 1rem;
                        line-height: 1.6;
                    }

                    .author-stats {
                        display: flex;
                        justify-content: center;
                        gap: 2rem;
                        margin-bottom: 1rem;

                        .stat-item {
                            text-align: center;

                            .stat-value {
                                display: block;
                                font-size: 1.2rem;
                                font-weight: 600;
                                color: #0369a1;
                            }

                            .stat-label {
                                font-size: 0.8rem;
                                color: #64748b;
                            }
                        }
                    }

                    .follow-btn {
                        width: 100%;
                        border-radius: 0.6rem;
                        font-size: 0.9rem;
                    }
                }

                .toc-list {
                    .toc-item {
                        padding: 0.6rem 0.8rem;
                        font-size: 0.9rem;
                        color: #64748b;
                        cursor: pointer;
                        border-radius: 0.4rem;
                        transition: all 0.3s ease;
                        margin-bottom: 0.4rem;

                        &:hover {
                            background: rgba(14, 165, 233, 0.1);
                            color: #0369a1;
                        }

                        &.toc-level-1 { padding-left: 0.8rem; }
                        &.toc-level-2 { padding-left: 1.6rem; }
                        &.toc-level-3 { padding-left: 2.4rem; }
                        &.toc-level-4 { padding-left: 3.2rem; }
                        &.toc-level-5 { padding-left: 4rem; }
                        &.toc-level-6 { padding-left: 4.8rem; }
                    }
                }

                .related-articles {
                    .related-item {
                        display: flex;
                        gap: 0.8rem;
                        padding: 0.8rem;
                        border-radius: 0.6rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-bottom: 0.8rem;
                        background: rgba(255, 255, 255, 0.9);
                        border: 1px solid rgba(14, 165, 233, 0.1);
                        position: relative;
                        overflow: hidden;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        &:hover {
                            background: rgba(255, 255, 255, 0.95);
                            transform: translateX(4px);
                            border-color: rgba(14, 165, 233, 0.2);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

                            .related-cover {
                                .el-image {
                                    transform: scale(1.05);
                                }

                                &::after {
                                    opacity: 0;
                                }
                            }

                            .related-content {
                                .related-title {
                                    color: #0369a1;
                                }

                                .related-meta {
                                    .meta-item {
                                        color: #0ea5e9;
                                    }
                                }
                            }

                            &::before {
                                opacity: 1;
                            }
                        }

                        .related-cover {
                            width: 70px;
                            height: 50px;
                            border-radius: 0.4rem;
                            overflow: hidden;
                            flex-shrink: 0;
                            position: relative;

                            &::after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: rgba(0, 0, 0, 0.1);
                                transition: all 0.3s ease;
                            }

                            .el-image {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                transition: all 0.3s ease;
                            }
                        }

                        .related-content {
                            flex: 1;
                            min-width: 0;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .related-title {
                                font-size: 0.9rem;
                                color: #334155;
                                margin-bottom: 0.4rem;
                                line-height: 1.4;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                transition: all 0.3s ease;
                            }

                            .related-meta {
                                display: flex;
                                gap: 0.8rem;
                                font-size: 0.8rem;
                                color: #64748b;

                                .meta-item {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.3rem;
                                    transition: all 0.3s ease;

                                    .el-icon {
                                        font-size: 0.9rem;
                                    }
                                }
                            }
                        }

                        &::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 3px;
                            height: 100%;
                            background: #0ea5e9;
                            opacity: 0;
                            transition: all 0.3s ease;
                        }
                    }
                }
            }
        }

        .ArticleDetail_content_main {
            flex: 1;
            min-width: 0;
            max-width: 68%;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            padding: 2.5vh 2.5vw;
            border-radius: 0.8rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(14, 165, 233, 0.1);

            .markdown-body {
                font-size: 1rem;
                line-height: 1.8;
                color: #24292e;
                padding: 1rem 0;

                :deep(.md-preview) {
                    background: transparent;
                    padding: 0;
                }

                :deep(h1) { 
                    font-size: 2em;
                    margin: 1em 0 0.5em;
                    padding-bottom: 0.3em;
                    border-bottom: 1px solid #eaecef;
                    color: #24292e;
                    font-weight: 600;
                }
                :deep(h2) { 
                    font-size: 1.5em;
                    margin: 1em 0 0.5em;
                    padding-bottom: 0.3em;
                    border-bottom: 1px solid #eaecef;
                    color: #24292e;
                    font-weight: 600;
                }
                :deep(h3) { 
                    font-size: 1.25em;
                    margin: 1em 0 0.5em;
                    color: #24292e;
                    font-weight: 600;
                }
                :deep(h4) {
                    font-size: 1em;
                    margin: 1em 0 0.5em;
                    color: #24292e;
                    font-weight: 600;
                }
                :deep(h5) {
                    font-size: 0.875em;
                    margin: 1em 0 0.5em;
                    color: #24292e;
                    font-weight: 600;
                }
                :deep(h6) {
                    font-size: 0.85em;
                    margin: 1em 0 0.5em;
                    color: #24292e;
                    font-weight: 600;
                }
                :deep(p) { 
                    font-size: 1rem;
                    margin: 0 0 16px;
                    line-height: 1.8;
                    color: #24292e;
                }
                :deep(ul), :deep(ol) { 
                    font-size: 1rem;
                    margin: 0 0 16px;
                    padding-left: 2em;
                    line-height: 1.8;
                    color: #24292e;

                    li {
                        margin: 0.25em 0;
                    }
                }
                :deep(pre) { 
                    font-size: 0.9rem;
                    background: #f6f8fa;
                    padding: 16px;
                    border-radius: 6px;
                    margin: 16px 0;
                    overflow-x: auto;
                    border: 1px solid #e1e4e8;

                    code {
                        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                        line-height: 1.45;
                        font-size: 0.9em;
                        color: #24292e;
                    }
                }
                :deep(blockquote) { 
                    font-size: 1rem;
                    border-left: 4px solid #dfe2e5;
                    padding: 0 1em;
                    margin: 0 0 16px;
                    color: #6a737d;

                    p {
                        margin: 0;
                    }
                }
                :deep(img) {
                    max-width: 100%;
                    box-sizing: border-box;
                    margin: 16px 0;
                    display: block;
                }
                :deep(code) {
                    background: rgba(27, 31, 35, 0.05);
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-size: 0.9em;
                    color: #24292e;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                }
                :deep(table) {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 16px 0;
                    font-size: 0.9em;
                    border: 1px solid #dfe2e5;

                    th, td {
                        padding: 6px 13px;
                        border: 1px solid #dfe2e5;
                    }

                    th {
                        background: #f6f8fa;
                        color: #24292e;
                        font-weight: 600;
                    }

                    tr:nth-child(even) {
                        background: #f6f8fa;
                    }

                    tr:hover {
                        background: #f6f8fa;
                    }
                }
                :deep(a) {
                    color: #0366d6;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
                :deep(hr) {
                    height: 0.25em;
                    padding: 0;
                    margin: 24px 0;
                    background-color: #e1e4e8;
                    border: 0;
                }
                :deep(del) {
                    color: #6a737d;
                }
                :deep(strong) {
                    font-weight: 600;
                }
                :deep(em) {
                    font-style: italic;
                }
                :deep(kbd) {
                    background-color: #fafbfc;
                    border: 1px solid #d1d5da;
                    border-bottom-color: #c6cbd1;
                    border-radius: 3px;
                    box-shadow: inset 0 -1px 0 #c6cbd1;
                    color: #444d56;
                    display: inline-block;
                    font-size: 0.9em;
                    line-height: 1;
                    padding: 3px 5px;
                    vertical-align: middle;
                }
            }

            .content-tags {
                margin-top: 1.5rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;

                .tag {
                    padding: 0.5rem 0.8rem;
                    font-size: 0.9rem;
                    background: rgba(14, 165, 233, 0.1);
                    color: #0369a1;
                    border: none;
                    border-radius: 0.4rem;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(14, 165, 233, 0.2);
                        transform: translateY(-2px);
                    }
                }
            }
        }
    }

    .ArticleDetail_footer {
        width: 95%;
        max-width: 1400px;
        margin: 1.5vh auto;
        padding-top: 1.2rem;

        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 1.2rem;

            .el-button {
                min-width: 90px;
                height: 36px;
                padding: 0 1.2rem;
                font-size: 0.9rem;
                border-radius: 0.6rem;
                transition: all 0.3s ease;

                &:hover {
                    transform: translateY(-2px);
                }

                .el-icon {
                    margin-right: 0.4rem;
                }
            }
        }
    }

    .ArticleDetail_comments {
        width: 95%;
        max-width: 1400px;
        margin: 1.5vh auto;
        padding: 1.5vh 1.5vw;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 0.8rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(14, 165, 233, 0.1);
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
            border-color: rgba(14, 165, 233, 0.2);
        }

        .comments-header {
            margin-bottom: 1.5rem;
            padding-bottom: 0.8rem;
            border-bottom: 2px solid rgba(14, 165, 233, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;

            h2 {
                font-size: 1.4rem;
                color: #0369a1;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.8rem;

                &::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 1.4rem;
                    background: #0ea5e9;
                    border-radius: 2px;
                }
            }

            .comments-stats {
                font-size: 0.9rem;
                color: #64748b;
                background: rgba(14, 165, 233, 0.1);
                padding: 0.4rem 0.8rem;
                border-radius: 0.4rem;
            }
        }

        .comment-editor {
            margin-bottom: 2rem;
            background: rgba(255, 255, 255, 0.9);
            padding: 1.2rem;
            border-radius: 0.8rem;
            border: 1px solid rgba(14, 165, 233, 0.2);
            transition: all 0.3s ease;

            &:hover {
                border-color: rgba(14, 165, 233, 0.3);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }

            .el-input {
                margin-bottom: 1rem;

                :deep(.el-textarea__inner) {
                    padding: 1rem;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    border-radius: 0.6rem;
                    border: 1px solid rgba(14, 165, 233, 0.2);
                    background: rgba(255, 255, 255, 0.9);
                    transition: all 0.3s ease;
                    min-height: 120px;

                    &:hover {
                        border-color: rgba(14, 165, 233, 0.3);
                    }

                    &:focus {
                        border-color: #0ea5e9;
                        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
                    }
                }
            }

            .editor-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .editor-tools {
                    display: flex;
                    gap: 0.8rem;

                    .el-button {
                        padding: 0.6rem 1rem;
                        font-size: 0.9rem;
                        border-radius: 0.6rem;
                        transition: all 0.3s ease;

                        &:hover {
                            transform: translateY(-2px);
                        }

                        .el-icon {
                            margin-right: 0.4rem;
                        }
                    }
                }

                .el-button {
                    padding: 0.8rem 1.5rem;
                    font-size: 0.95rem;
                    border-radius: 0.6rem;
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-2px);
                    }
                }
            }
        }

        .comments-list {
            .comment-item {
                padding: 1.2rem;
                gap: 1.2rem;
                border-bottom: 1px solid rgba(14, 165, 233, 0.1);
                transition: all 0.3s ease;
                display: flex;
                align-items: flex-start;

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background: rgba(14, 165, 233, 0.05);
                }

                .comment-avatar {
                    flex-shrink: 0;

                    .el-avatar {
                        border: 2px solid white;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        transition: all 0.3s ease;

                        &:hover {
                            transform: scale(1.05);
                        }
                    }
                }

                .comment-content {
                    flex: 1;
                    min-width: 0;

                    .comment-header {
                        margin-bottom: 0.8rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .comment-user {
                            display: flex;
                            align-items: center;
                            gap: 0.8rem;

                            .username {
                                font-size: 0.95rem;
                                font-weight: 600;
                                color: #0369a1;
                                transition: all 0.3s ease;

                                &:hover {
                                    color: #0ea5e9;
                                }
                            }

                            .el-tag {
                                padding: 0.2rem 0.6rem;
                                font-size: 0.75rem;
                                border-radius: 0.4rem;
                            }
                        }

                        .comment-time {
                            font-size: 0.85rem;
                            color: #64748b;
                        }
                    }

                    .comment-text {
                        font-size: 0.95rem;
                        color: #334155;
                        margin-bottom: 0.8rem;
                        line-height: 1.6;
                        white-space: pre-wrap;
                    }

                    .comment-actions {
                        display: flex;
                        gap: 1.2rem;

                        .el-button {
                            padding: 0.4rem 0.8rem;
                            height: auto;
                            font-size: 0.85rem;
                            color: #64748b;
                            border-radius: 0.4rem;
                            transition: all 0.3s ease;

                            &:hover {
                                color: #0369a1;
                                background: rgba(14, 165, 233, 0.1);
                            }

                            .el-icon {
                                margin-right: 0.3rem;
                            }
                        }
                    }

                    .comment-replies {
                        margin-top: 1.2rem;
                        padding-left: 2rem;
                        border-left: 2px solid rgba(14, 165, 233, 0.1);

                        .reply-item {
                            display: flex;
                            gap: 1rem;
                            padding: 1rem;
                            border-radius: 0.6rem;
                            transition: all 0.3s ease;
                            margin-bottom: 0.8rem;
                            background: rgba(14, 165, 233, 0.05);

                            &:last-child {
                                margin-bottom: 0;
                            }

                            &:hover {
                                background: rgba(14, 165, 233, 0.1);
                                transform: translateX(4px);
                            }

                            .reply-avatar {
                                flex-shrink: 0;

                                .el-avatar {
                                    border: 2px solid white;
                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                                    transition: all 0.3s ease;

                                    &:hover {
                                        transform: scale(1.05);
                                    }
                                }
                            }

                            .reply-content {
                                flex: 1;
                                min-width: 0;

                                .reply-header {
                                    margin-bottom: 0.6rem;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;

                                    .reply-user {
                                        display: flex;
                                        align-items: center;
                                        gap: 0.6rem;

                                        .username {
                                            font-size: 0.9rem;
                                            font-weight: 600;
                                            color: #0369a1;
                                            transition: all 0.3s ease;

                                            &:hover {
                                                color: #0ea5e9;
                                            }
                                        }

                                        .el-tag {
                                            padding: 0.2rem 0.6rem;
                                            font-size: 0.75rem;
                                            border-radius: 0.4rem;
                                        }
                                    }

                                    .reply-time {
                                        font-size: 0.8rem;
                                        color: #64748b;
                                    }
                                }

                                .reply-text {
                                    font-size: 0.9rem;
                                    color: #334155;
                                    margin-bottom: 0.6rem;
                                    line-height: 1.6;
                                    white-space: pre-wrap;

                                    .reply-to {
                                        color: #0369a1;
                                        font-weight: 600;
                                        transition: all 0.3s ease;

                                        &:hover {
                                            color: #0ea5e9;
                                        }
                                    }
                                }

                                .reply-actions {
                                    display: flex;
                                    gap: 1rem;

                                    .el-button {
                                        padding: 0.3rem 0.6rem;
                                        height: auto;
                                        font-size: 0.8rem;
                                        color: #64748b;
                                        border-radius: 0.4rem;
                                        transition: all 0.3s ease;

                                        &:hover {
                                            color: #0369a1;
                                            background: rgba(14, 165, 233, 0.1);
                                        }

                                        .el-icon {
                                            margin-right: 0.2rem;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .ArticleDetail_back {
        position: fixed;
        left: 1.5vw;
        top: 1.5vh;
        width: 3vw;
        height: 3vw;
        min-width: 36px;
        min-height: 36px;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(14, 165, 233, 0.2);
        opacity: 0.9;
        transform: translateX(0);

        &:hover {
            transform: translateX(-4px) scale(1.05);
            background: #ffffff;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
            border-color: rgba(14, 165, 233, 0.3);
            opacity: 1;
        }

        .el-icon {
            font-size: 1.6rem;
            color: #0369a1;
            transition: transform 0.3s ease;
        }

        &:hover .el-icon {
            transform: translateX(-2px);
        }
    }
}

@media screen and (max-width: 1366px) {
    .ArticleDetail {
        .ArticleDetail_content {
            .ArticleDetail_content_main {
                max-width: 72%;
                padding: 2vh 2vw;

                .markdown-body {
                    font-size: 0.95rem;

                    h1 { font-size: 1.7rem; }
                    h2 { font-size: 1.5rem; }
                    h3 { font-size: 1.3rem; }
                }
            }

            .ArticleDetail_content_sidebar {
                width: 18%;
                min-width: 200px;
            }
        }
    }
}

@media screen and (max-width: 1200px) {
    .ArticleDetail {
        padding: 1vh 1vw;

        .ArticleDetail_content {
            flex-direction: column;

            .ArticleDetail_content_main {
                max-width: 100%;
                padding: 1.5vh 1.5vw;
            }

            .ArticleDetail_content_sidebar {
                width: 100%;
                position: static;
                display: flex;
                gap: 1.2vw;

                &.left, &.right {
                    .sidebar-card {
                        flex: 1;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .ArticleDetail {
        .ArticleDetail_header {
            padding: 1.2vh 1.2vw;

            .ArticleDetail_header_title {
                h1 {
                    font-size: 1.6rem;
                }

                .ArticleDetail_header_meta {
                    .meta_item {
                        font-size: 0.8rem;
                        padding: 0.4rem 0.6rem;
                    }
                }
            }
        }

        .ArticleDetail_content {
            .ArticleDetail_content_main {
                padding: 1.2vh 1.2vw;

                .markdown-body {
                    font-size: 0.9rem;

                    h1 { font-size: 1.5rem; }
                    h2 { font-size: 1.3rem; }
                    h3 { font-size: 1.1rem; }
                }
            }

            .ArticleDetail_content_sidebar {
                flex-direction: column;
                gap: 0.8vh;
            }
        }
    }
}
</style> 