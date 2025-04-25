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
            <div class="ArticleDetail_header_cover" v-if="article.cover">
                <el-image :src="article.cover" fit="cover" loading="lazy">
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </div>
        </div>

        <div class="ArticleDetail_content">
            <div class="ArticleDetail_content_main">
                <div class="content-text markdown-body" v-html="renderedContent"></div>
                <div class="content-tags">
                    <el-tag v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</el-tag>
                </div>
            </div>
            <div class="ArticleDetail_content_sidebar">
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
                <el-button type="primary" @click="handleLike" :class="{ 'is-liked': isLiked }">
                    <el-icon><Star /></el-icon>
                    <span>{{ article.thumbsUp || 0 }}</span>
                </el-button>
                <el-button type="success" @click="handleCollect" :class="{ 'is-collected': isCollected }">
                    <el-icon><Collection /></el-icon>
                    <span>{{ article.collection || 0 }}</span>
                </el-button>
                <el-button type="info" @click="handleComment">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>评论</span>
                </el-button>
                <el-button type="warning" @click="handleShare">
                    <el-icon><Share /></el-icon>
                    <span>分享</span>
                </el-button>
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
import { User, Calendar, View, ChatDotRound, Star, Collection, Share, ArrowLeft } from '@element-plus/icons-vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

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

const route = useRoute()
const router = useRouter()

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value
            } catch (__) {}
        }
        return ''
    }
})

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
    return md.render(article.value.content)
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
}

const handleCollect = () => {
    isCollected.value = !isCollected.value
    article.value.collection = (article.value.collection || 0) + (isCollected.value ? 1 : -1)
}

const handleComment = () => {
    console.log('打开评论区')
}

const handleShare = () => {
    console.log('分享文章')
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

// 获取文章详情的函数
const fetchArticleDetail = (id: string) => {
    // 模拟获取文章详情
    article.value = {
        id,
        title: 'Vue 3 + TypeScript 实战：构建现代化的博客系统',
        summary: '本文将详细介绍如何使用 Vue 3 和 TypeScript 构建一个功能完善的博客系统，包括文章管理、用户认证、评论系统等核心功能。',
        content: `# Vue 3 + TypeScript 实战：构建现代化的博客系统

在当今的 Web 开发领域，Vue 3 和 TypeScript 的组合已经成为构建现代化应用的首选方案。本文将带你从零开始，构建一个功能完善的博客系统。

## 1. 项目初始化

首先，我们需要创建一个新的 Vue 3 项目。使用 Vue CLI 可以快速搭建项目基础结构：

\`\`\`bash
npm create vue@latest my-blog
cd my-blog
npm install
\`\`\`

## 2. 技术栈选择

我们将使用以下技术栈：

- Vue 3 + TypeScript
- Vue Router 4
- Pinia 状态管理
- Element Plus UI 组件库
- Axios HTTP 客户端

## 3. 项目结构设计

良好的项目结构是成功的一半。我们采用以下目录结构：

\`\`\`
src/
├── components/     # 通用组件
├── views/         # 页面组件
├── router/        # 路由配置
├── store/         # 状态管理
├── api/           # API 接口
├── types/         # TypeScript 类型定义
└── utils/         # 工具函数
\`\`\`

## 4. 核心功能实现

### 4.1 用户认证

使用 JWT 实现用户认证，包括登录、注册和权限控制：

\`\`\`typescript
// 登录接口
export const login = (data: LoginData) => {
    return axios.post('/api/auth/login', data)
}
\`\`\`

### 4.2 文章管理

实现文章的 CRUD 操作，包括富文本编辑器和图片上传：

![文章编辑器示例](https://picsum.photos/800/400)

### 4.3 评论系统

构建实时评论系统，支持多级评论和表情包：

> 用户A：这篇文章写得真好！
> 
> 用户B：感谢分享，学到了很多！

## 5. 性能优化

为了提升用户体验，我们需要关注以下性能优化点：

- 路由懒加载
- 组件按需加载
- 图片懒加载
- 数据缓存

## 6. 部署上线

最后，我们将项目部署到生产环境：

\`\`\`bash
npm run build
# 部署到服务器
scp -r dist/* user@server:/var/www/html
\`\`\`

## 总结

通过本文的学习，你应该已经掌握了使用 Vue 3 和 TypeScript 构建现代化博客系统的基本方法。希望这些知识能帮助你在实际项目中取得成功！`,
        createTime: '2024-03-15T10:30:00',
        updateTime: '2024-03-15T14:45:00',
        views: 1250,
        comments: 36,
        category: '前端开发',
        tags: ['Vue3', 'TypeScript', '前端', '博客系统', '实战'],
        cover: 'https://picsum.photos/800/400',
        status: 'published',
        thumbsUp: 89,
        collection: 45,
        author: '前端开发者',
        authorAvatar: 'https://picsum.photos/200',
        authorBio: '专注于前端技术开发，热爱分享技术经验。Vue、React、TypeScript 深度用户，开源项目贡献者。',
        authorArticles: 28,
        authorFollowers: 1560
    }

    // 模拟获取相关文章
    relatedArticles.value = [
        {
            id: '2',
            title: 'TypeScript 类型系统深入解析：从入门到精通',
            createTime: '2024-03-10T14:20:00',
            views: 1890,
            cover: 'https://picsum.photos/300/200',
            summary: '深入探讨 TypeScript 类型系统的核心概念和高级用法，帮助你写出更健壮的代码。'
        },
        {
            id: '3',
            title: 'Node.js 性能优化指南：让你的应用飞起来',
            createTime: '2024-03-05T09:15:00',
            views: 1450,
            cover: 'https://picsum.photos/300/200',
            summary: '从多个维度分析 Node.js 应用的性能瓶颈，并提供实用的优化方案。'
        },
        {
            id: '4',
            title: '前端工程化实践：从零搭建完整的开发环境',
            createTime: '2024-02-28T16:30:00',
            views: 2100,
            cover: 'https://picsum.photos/300/200',
            summary: '详细介绍如何搭建一个完整的前端开发环境，包括构建工具、代码规范、测试等。'
        },
        {
            id: '5',
            title: 'Vue 3 组合式 API 最佳实践',
            createTime: '2024-02-20T11:45:00',
            views: 1780,
            cover: 'https://picsum.photos/300/200',
            summary: '分享 Vue 3 组合式 API 的使用技巧和最佳实践，提升代码质量和开发效率。'
        }
    ]

    // 生成目录
    setTimeout(generateToc, 100)
}

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
    padding: 2rem;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(14, 165, 233, 0.1);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(14, 165, 233, 0.3);
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(14, 165, 233, 0.5);
        }
    }

    .ArticleDetail_header {
        margin-bottom: 3rem;
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
        background: rgba(255, 255, 255, 0.9);
        padding: 3rem;
        border-radius: 1.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            border-color: rgba(14, 165, 233, 0.2);
        }

        .ArticleDetail_header_title {
            text-align: center;
            margin-bottom: 2.5rem;

            h1 {
                font-size: 2.8rem;
                color: #0369a1;
                margin-bottom: 1.5rem;
                line-height: 1.3;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                word-break: break-word;
                background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .ArticleDetail_header_meta {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                color: #64748b;
                flex-wrap: wrap;

                .meta_item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.8rem 1.2rem;
                    border-radius: 1rem;
                    background: rgba(14, 165, 233, 0.1);
                    color: #0ea5e9;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    white-space: nowrap;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(14, 165, 233, 0.2);

                    &:hover {
                        color: #ffffff;
                        background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
                        border-color: transparent;
                    }

                    .el-icon {
                        font-size: 1.2rem;
                    }
                }
            }
        }

        .ArticleDetail_header_cover {
            width: 100%;
            height: 500px;
            border-radius: 1.5rem;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.2);

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
            }

            .el-image {
                width: 100%;
                height: 100%;
                transition: transform 0.5s ease;

                &:hover {
                    transform: scale(1.05);
                }
            }
        }
    }

    .ArticleDetail_content {
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        gap: 3rem;

        .ArticleDetail_content_main {
            flex: 1;
            min-width: 0;
            background: rgba(255, 255, 255, 0.9);
            padding: 3rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                border-color: rgba(14, 165, 233, 0.2);
            }

            .markdown-body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                font-size: 1.2rem;
                line-height: 2;
                color: #334155;
                word-break: break-word;
                overflow-wrap: break-word;
                hyphens: auto;

                h1, h2, h3, h4, h5, h6 {
                    margin-top: 2.5rem;
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                    line-height: 1.4;
                    color: #0369a1;
                    word-break: break-word;
                    background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                h1 {
                    font-size: 2.4rem;
                    border-bottom: 2px solid rgba(14, 165, 233, 0.1);
                    padding-bottom: 0.8rem;
                }

                h2 {
                    font-size: 2rem;
                    border-bottom: 1px solid rgba(14, 165, 233, 0.1);
                    padding-bottom: 0.5rem;
                }

                h3 {
                    font-size: 1.8rem;
                }

                p {
                    margin-bottom: 1.8rem;
                    color: #475569;
                    font-size: 1.2rem;
                    line-height: 2;
                    word-break: break-word;
                }

                ul, ol {
                    padding-left: 2em;
                    margin-bottom: 1.8rem;
                    color: #475569;
                    font-size: 1.2rem;
                    line-height: 2;

                    li {
                        margin-bottom: 0.8rem;
                        position: relative;
                        word-break: break-word;

                        &::before {
                            content: '•';
                            color: #0ea5e9;
                            position: absolute;
                            left: -1em;
                            font-size: 1.4rem;
                        }
                    }
                }

                code {
                    padding: 0.3em 0.5em;
                    background: rgba(14, 165, 233, 0.1);
                    border-radius: 0.4rem;
                    color: #0ea5e9;
                    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
                    font-size: 1.1rem;
                    word-break: break-word;
                    border: 1px solid rgba(14, 165, 233, 0.2);
                }

                pre {
                    padding: 1.8rem;
                    background: rgba(248, 250, 252, 0.8);
                    border-radius: 0.8rem;
                    border: 1px solid rgba(14, 165, 233, 0.2);
                    margin: 1.8rem 0;
                    overflow-x: auto;
                    position: relative;
                    backdrop-filter: blur(5px);

                    &::before {
                        content: attr(data-language);
                        position: absolute;
                        top: 0;
                        right: 0;
                        padding: 0.3rem 0.8rem;
                        background: rgba(14, 165, 233, 0.1);
                        color: #0ea5e9;
                        font-size: 0.9rem;
                        border-bottom-left-radius: 0.8rem;
                        border: 1px solid rgba(14, 165, 233, 0.2);
                    }

                    code {
                        background: none;
                        padding: 0;
                        color: #334155;
                        font-size: 1.1rem;
                        line-height: 1.6;
                        white-space: pre;
                        word-break: normal;
                        border: none;
                    }
                }

                blockquote {
                    padding: 1.2rem 1.8rem;
                    background: rgba(14, 165, 233, 0.05);
                    border-left: 4px solid #0ea5e9;
                    border-radius: 0.8rem;
                    margin: 1.8rem 0;
                    color: #475569;
                    font-style: italic;
                    font-size: 1.2rem;
                    line-height: 2;
                    word-break: break-word;
                    border: 1px solid rgba(14, 165, 233, 0.2);
                }

                img {
                    max-width: 100%;
                    border-radius: 0.8rem;
                    margin: 2rem 0;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    display: block;
                    border: 1px solid rgba(255, 255, 255, 0.2);

                    &:hover {
                        transform: scale(1.02);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                    }
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 0.8rem;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    display: block;
                    overflow-x: auto;
                    white-space: nowrap;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(14, 165, 233, 0.2);

                    th, td {
                        padding: 1.2rem;
                        border: 1px solid rgba(14, 165, 233, 0.2);
                        font-size: 1.1rem;
                        word-break: break-word;
                    }

                    th {
                        background: rgba(14, 165, 233, 0.1);
                        color: #0369a1;
                        font-weight: 600;
                    }

                    tr {
                        &:nth-child(even) {
                            background: rgba(14, 165, 233, 0.02);
                        }

                        &:hover {
                            background: rgba(14, 165, 233, 0.05);
                        }
                    }
                }
            }

            .content-tags {
                margin-top: 2.5rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;

                .tag {
                    background: rgba(14, 165, 233, 0.1);
                    color: #0ea5e9;
                    border: 1px solid rgba(14, 165, 233, 0.2);
                    padding: 0.8rem 1.2rem;
                    border-radius: 0.8rem;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    font-size: 1.1rem;
                    backdrop-filter: blur(5px);

                    &:hover {
                        background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
                        color: #ffffff;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
                        border-color: transparent;
                    }
                }
            }
        }

        .ArticleDetail_content_sidebar {
            width: 400px;
            flex-shrink: 0;
            position: sticky;
            top: 2rem;
            align-self: flex-start;

            .sidebar-card {
                background: rgba(255, 255, 255, 0.9);
                padding: 2rem;
                border-radius: 1.2rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                margin-bottom: 2rem;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                    border-color: rgba(14, 165, 233, 0.2);
                }

                &.author-info {
                    text-align: center;

                    .author-avatar {
                        margin-bottom: 1.5rem;

                        .el-avatar {
                            width: 100px;
                            height: 100px;
                            border: 3px solid #ffffff;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            transition: all 0.3s ease;
                            backdrop-filter: blur(5px);

                            &:hover {
                                transform: scale(1.05);
                                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                            }
                        }
                    }

                    h3 {
                        font-size: 1.4rem;
                        color: #0369a1;
                        margin-bottom: 0.8rem;
                        font-weight: 600;
                        background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    .author-bio {
                        color: #64748b;
                        margin-bottom: 1.5rem;
                        line-height: 1.6;
                        font-size: 1.1rem;
                    }

                    .author-stats {
                        display: flex;
                        justify-content: space-around;
                        margin-bottom: 1.5rem;

                        .stat-item {
                            .stat-value {
                                display: block;
                                font-size: 1.4rem;
                                color: #0369a1;
                                font-weight: 600;
                            }

                            .stat-label {
                                color: #64748b;
                                font-size: 1rem;
                            }
                        }
                    }

                    .follow-btn {
                        width: 100%;
                        padding: 1rem;
                        font-weight: 500;
                        font-size: 1.1rem;
                        transition: all 0.3s ease;
                        background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
                        border: none;

                        &:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
                        }
                    }
                }

                h3 {
                    font-size: 1.4rem;
                    color: #0369a1;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.8rem;
                    border-bottom: 2px solid rgba(14, 165, 233, 0.1);
                    font-weight: 600;
                    background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .toc-list {
                    .toc-item {
                        padding: 0.8rem 1rem;
                        cursor: pointer;
                        color: #64748b;
                        transition: all 0.3s ease;
                        font-size: 1.1rem;
                        border-radius: 0.8rem;
                        margin-bottom: 0.5rem;
                        background: rgba(14, 165, 233, 0.05);
                        word-break: break-word;
                        border: 1px solid rgba(14, 165, 233, 0.2);
                        backdrop-filter: blur(5px);

                        &:hover {
                            color: #0369a1;
                            transform: translateX(5px);
                            background: rgba(14, 165, 233, 0.1);
                            border-color: rgba(14, 165, 233, 0.3);
                        }

                        &.toc-level-1 {
                            font-weight: 600;
                            padding-left: 1rem;
                            font-size: 1.2rem;
                        }

                        &.toc-level-2 {
                            padding-left: 2rem;
                            font-size: 1.1rem;
                        }

                        &.toc-level-3 {
                            padding-left: 3rem;
                            font-size: 1rem;
                        }
                    }
                }

                .related-articles {
                    .related-item {
                        display: flex;
                        gap: 1.2rem;
                        padding: 1.2rem;
                        border-radius: 0.8rem;
                        background: rgba(14, 165, 233, 0.05);
                        margin-bottom: 1.2rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border: 1px solid rgba(14, 165, 233, 0.2);
                        backdrop-filter: blur(5px);

                        &:hover {
                            background: rgba(14, 165, 233, 0.1);
                            transform: translateX(5px);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            border-color: rgba(14, 165, 233, 0.3);
                        }

                        .related-cover {
                            width: 120px;
                            height: 90px;
                            border-radius: 0.8rem;
                            overflow: hidden;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                            flex-shrink: 0;
                            border: 1px solid rgba(255, 255, 255, 0.2);

                            .el-image {
                                width: 100%;
                                height: 100%;
                                transition: transform 0.3s ease;

                                &:hover {
                                    transform: scale(1.1);
                                }
                            }
                        }

                        .related-content {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            min-width: 0;
                            padding-right: 0.5rem;

                            .related-title {
                                font-size: 1.1rem;
                                color: #0369a1;
                                margin-bottom: 0.8rem;
                                font-weight: 500;
                                line-height: 1.4;
                                word-break: break-word;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            .related-meta {
                                display: flex;
                                justify-content: space-between;
                                color: #64748b;
                                font-size: 0.9rem;
                                margin-top: auto;
                                white-space: nowrap;

                                span {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.3rem;
                                    padding: 0.3rem 0.5rem;
                                    background: rgba(14, 165, 233, 0.05);
                                    border-radius: 0.4rem;
                                    border: 1px solid rgba(14, 165, 233, 0.1);

                                    .el-icon {
                                        font-size: 1rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .ArticleDetail_footer {
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(14, 165, 233, 0.1);

        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;

            .el-button {
                padding: 1rem 2rem;
                border-radius: 1rem;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.3s ease;
                font-weight: 500;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(14, 165, 233, 0.2);

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    border-color: rgba(14, 165, 233, 0.3);
                }

                &.is-liked, &.is-collected {
                    background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
                    color: #ffffff;
                    border: none;
                }

                .el-icon {
                    font-size: 1.4rem;
                }
            }
        }
    }

    .ArticleDetail_back {
        position: fixed;
        left: 2rem;
        top: 2rem;
        width: 3.5rem;
        height: 3.5rem;
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
            transform: translateX(-5px) scale(1.05);
            background: #ffffff;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
            border-color: rgba(14, 165, 233, 0.3);
            opacity: 1;
        }

        .el-icon {
            font-size: 1.8rem;
            color: #0369a1;
            transition: transform 0.3s ease;
        }

        &:hover .el-icon {
            transform: translateX(-3px);
        }
    }
}

// 响应式设计
@media screen and (max-width: 1200px) {
    .ArticleDetail {
        .ArticleDetail_header {
            max-width: 100%;
        }

        .ArticleDetail_content {
            max-width: 100%;
            flex-direction: column;

            .ArticleDetail_content_sidebar {
                width: 100%;
                position: static;
            }
        }

        .ArticleDetail_footer {
            max-width: 100%;
        }
    }
}

@media screen and (max-width: 768px) {
    .ArticleDetail {
        padding: 1rem;

        .ArticleDetail_header {
            padding: 1.5rem;

            .ArticleDetail_header_title {
                h1 {
                    font-size: 2rem;
                }

                .ArticleDetail_header_meta {
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
            }

            .ArticleDetail_header_cover {
                height: 300px;
            }
        }

        .ArticleDetail_content {
            .ArticleDetail_content_main {
                padding: 1.5rem;

                .markdown-body {
                    font-size: 1.1rem;

                    h1 {
                        font-size: 2rem;
                    }

                    h2 {
                        font-size: 1.8rem;
                    }

                    h3 {
                        font-size: 1.6rem;
                    }
                }
            }
        }

        .ArticleDetail_back {
            left: 1rem;
            top: 1rem;
            width: 3rem;
            height: 3rem;

            .el-icon {
                font-size: 1.5rem;
            }
        }
    }
}
</style> 