<template>
    <div class="Self">
        <div class="Self_User">
            <div class="Self_User_main">
                <div class="Self_User_main_avatar">
                <img :src="userInfo.avatar || defaultAvatar" class="avatar" alt="用户头像">
                </div>
                <div class="Self_User_main_info">
                    <h2>{{ userInfo.username }}</h2>
                    <p class="role-tag" :class="userInfo.role">{{ userInfo.role === 'admin' ? '管理员' : '普通用户' }}</p>
                </div>
                <div class="Self_User_main_stats">
                <div class="stat-item">
                    <span class="number">{{ userInfo.articleCount || 0 }}</span>
                    <span class="label">文章数</span>
                </div>
                <div class="stat-item">
                    <span class="number">{{ userInfo.followers || 0 }}</span>
                    <span class="label">关注者</span>
                </div>
                <div class="stat-item">
                    <span class="number">{{ userInfo.following || 0 }}</span>
                    <span class="label">关注中</span>
                </div>
                </div>
            </div>
            <div class="Self_User_animation">
                <svg class="Self_User_animation_waves" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none"
                    shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,254,255,0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(125,176,169,0.2)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(255, 255, 255,0.8)" />
                    </g>
                </svg>
            </div>
        </div>

        <div class="Self_Content">
        <div class="action-buttons">
            <el-button type="primary" @click="showNewArticleDialog">发布新文章</el-button>
            <el-button type="success" @click="showDraftList">草稿箱</el-button>
            <el-button type="info" @click="showArticleList">我的文章</el-button>
            <el-button v-if="userInfo.role === 'admin'" type="warning" @click="goToAdmin">管理后台</el-button>
        </div>

        <div class="article-list">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="已发布" name="published">
                    <div v-if="publishedArticles.length === 0" class="empty-tip">
                        暂无已发布的文章
                    </div>
                    <div v-else class="article-items">
                            <ArticleCard
                                v-for="(article, index) in currentPageArticles"
                                :key="article.id"
                                :id="article.id"
                                :title="article.title"
                                :summary="article.summary"
                                :content="article.content"
                                :createTime="article.createTime"
                                :updateTime="article.updateTime"
                                :views="article.views"
                                :comments="article.comments"
                                :category="article.category"
                                :tags="article.tags"
                                :hasCover="!!article.cover"
                                :cover="article.cover"
                                @edit="editArticle"
                                @delete="deleteArticle"
                            />
                            <div class="pagination-container">
                                <el-pagination
                                    v-model:current-page="currentPage"
                                    v-model:page-size="pageSize"
                                    :page-sizes="[5, 10, 20, 50]"
                                    :total="publishedArticles.length"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                />
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="草稿箱" name="drafts">
                    <div v-if="draftArticles.length === 0" class="empty-tip">
                        暂无草稿
                    </div>
                    <div v-else class="article-items">
                            <ArticleCard
                                v-for="(article, index) in currentPageDrafts"
                                :key="article.id"
                                :id="article.id"
                                :title="article.title"
                                :summary="article.summary"
                                :content="article.content"
                                :createTime="article.createTime"
                                :updateTime="article.updateTime"
                                :views="article.views"
                                :comments="article.comments"
                                :category="article.category"
                                :tags="article.tags"
                                :hasCover="!!article.cover"
                                :cover="article.cover"
                                @edit="editArticle"
                                @delete="deleteDraft"
                            />
                            <div class="pagination-container">
                                <el-pagination
                                    v-model:current-page="currentDraftPage"
                                    v-model:page-size="draftPageSize"
                                    :page-sizes="[5, 10, 20, 50]"
                                    :total="draftArticles.length"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    @size-change="handleDraftSizeChange"
                                    @current-change="handleDraftCurrentChange"
                                />
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            </div>
        </div>

        <!-- 发布新文章对话框 -->
        <el-dialog
            v-model="newArticleDialogVisible"
            title="发布新文章"
            width="70%"
            :before-close="handleClose"
        >
            <el-form :model="newArticle" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="newArticle.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input v-model="newArticle.summary" type="textarea" :rows="3" placeholder="请输入文章摘要"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-input v-model="newArticle.cover" placeholder="请输入封面图片URL"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="newArticle.category" placeholder="请选择分类">
                        <el-option
                            v-for="item in categories"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select
                        v-model="newArticle.tags"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择标签"
                    >
                        <el-option
                            v-for="item in tagOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input
                        v-model="newArticle.content"
                        type="textarea"
                        :rows="15"
                        placeholder="请输入文章内容"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="newArticleDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveArticle">保存</el-button>
                    <el-button type="success" @click="publishArticle">发布</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import ArticleCard from '@/components/ArticleCard.vue'

// 使用在线默认头像
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

// 定义文章接口
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
}

// 定义用户信息接口
interface UserInfo {
    username: string
    avatar: string
    role: 'admin' | 'user'
    articleCount: number
    followers: number
    following: number
}

const router = useRouter()

// 用户信息
const userInfo = ref<UserInfo>({
    username: '用户名',
    avatar: '',
    role: 'user',
    articleCount: 0,
    followers: 0,
    following: 0
})

// 文章相关数据
const activeTab = ref('published')
const publishedArticles = ref<Article[]>([])
const draftArticles = ref<Article[]>([])
const newArticleDialogVisible = ref(false)
const newArticle = ref<Partial<Article>>({
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: [],
    cover: ''
})

// 分类和标签选项
const categories = ref([
    { value: 'tech', label: '技术' },
    { value: 'life', label: '生活' },
    { value: 'travel', label: '旅行' }
])

const tagOptions = ref([
    { value: 'vue', label: 'Vue' },
    { value: 'react', label: 'React' },
    { value: 'node', label: 'Node.js' }
])

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)
const currentDraftPage = ref(1)
const draftPageSize = ref(10)

// 计算当前页的文章
const currentPageArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return publishedArticles.value.slice(start, end)
})

// 计算当前页的草稿
const currentPageDrafts = computed(() => {
    const start = (currentDraftPage.value - 1) * draftPageSize.value
    const end = start + draftPageSize.value
    return draftArticles.value.slice(start, end)
})

// 格式化日期
const formatDate = (date: string | undefined) => {
    if (!date) return '未知时间'
    return new Date(date).toLocaleDateString()
}

// 显示新文章对话框
const showNewArticleDialog = () => {
    newArticleDialogVisible.value = true
}

// 显示草稿列表
const showDraftList = () => {
    activeTab.value = 'drafts'
}

// 显示文章列表
const showArticleList = () => {
    activeTab.value = 'published'
}

// 编辑文章
const editArticle = (article: Article) => {
    newArticle.value = { ...article }
    newArticleDialogVisible.value = true
}

// 删除文章
const deleteArticle = (article: Article) => {
    ElMessageBox.confirm(
        '确定要删除这篇文章吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 调用删除API
        ElMessage.success('删除成功')
    })
}

// 删除草稿
const deleteDraft = (draft: Article) => {
    ElMessageBox.confirm(
        '确定要删除这个草稿吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 调用删除API
        ElMessage.success('删除成功')
    })
}

// 保存文章
const saveArticle = () => {
    // 调用保存API
    ElMessage.success('保存成功')
    newArticleDialogVisible.value = false
}

// 发布文章
const publishArticle = () => {
    // 调用发布API
    ElMessage.success('发布成功')
    newArticleDialogVisible.value = false
}

// 前往管理后台
const goToAdmin = () => {
    router.push('/admin')
}

// 关闭对话框前的处理
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确认关闭？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

// 处理分页大小变化
const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
}

// 处理当前页变化
const handleCurrentChange = (val: number) => {
    currentPage.value = val
}

// 处理草稿分页大小变化
const handleDraftSizeChange = (val: number) => {
    draftPageSize.value = val
    currentDraftPage.value = 1
}

// 处理草稿当前页变化
const handleDraftCurrentChange = (val: number) => {
    currentDraftPage.value = val
}

onMounted(() => {
    // 模拟用户信息
    userInfo.value = {
        username: '小王同志',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        role: 'admin',
        articleCount: 25,
        followers: 256,
        following: 89
    }

    // 模拟已发布文章
    publishedArticles.value = [
        {
            id: '1',
            title: 'Vue3 组合式 API 最佳实践',
            summary: '本文详细介绍了 Vue3 组合式 API 的使用方法和最佳实践，包括响应式系统、生命周期钩子、组件通信等内容。',
            content: 'Vue3 的组合式 API 是 Vue 3 中最重要的新特性之一。它提供了一种更灵活、更可复用的方式来组织组件代码。本文将深入探讨组合式 API 的核心概念和使用方法...',
            createTime: '2024-03-15T10:30:00',
            views: 256,
            comments: 12,
            category: 'tech',
            tags: ['Vue', '前端', 'JavaScript'],
            cover: 'https://picsum.photos/800/400',
            status: 'published'
        },
        {
            id: '2',
            title: 'TypeScript 类型系统深入解析',
            summary: '深入探讨 TypeScript 的类型系统，包括类型推断、泛型、类型守卫等高级特性，帮助开发者更好地使用 TypeScript。',
            content: 'TypeScript 的类型系统是其最强大的特性之一。它提供了静态类型检查，可以在编译时发现潜在的错误。本文将深入探讨 TypeScript 的类型系统...',
            createTime: '2024-03-10T14:20:00',
            views: 189,
            comments: 8,
            category: 'tech',
            tags: ['TypeScript', '前端', 'JavaScript'],
            cover: 'https://picsum.photos/800/400?random=2',
            status: 'published'
        },
        {
            id: '3',
            title: 'Node.js 性能优化指南',
            summary: '分享 Node.js 应用性能优化的实用技巧，包括内存管理、事件循环、异步编程等方面的优化建议。',
            content: 'Node.js 的性能优化是一个复杂的话题，涉及到多个方面。本文将介绍一些实用的性能优化技巧，帮助开发者提升 Node.js 应用的性能...',
            createTime: '2024-03-05T09:15:00',
            views: 145,
            comments: 6,
            category: 'tech',
            tags: ['Node.js', '后端', '性能优化'],
            cover: 'https://picsum.photos/800/400?random=3',
            status: 'pending'
        },
        {
            id: '4',
            title: '前端工程化实践指南',
            summary: '从零开始构建现代化前端工程化体系，包括构建工具、代码规范、自动化测试等关键环节的实践分享。',
            content: '...',
            createTime: '2024-02-28T16:45:00',
            views: 321,
            comments: 15,
            category: 'tech',
            tags: ['前端', '工程化', 'DevOps'],
            cover: 'https://picsum.photos/800/400?random=4',
            status: 'published'
        },
        {
            id: '5',
            title: '微服务架构设计模式',
            summary: '深入分析微服务架构中的常见设计模式，包括服务发现、负载均衡、熔断降级等核心概念。',
            content: '...',
            createTime: '2024-02-20T11:30:00',
            views: 178,
            comments: 9,
            category: 'tech',
            tags: ['微服务', '架构', '设计模式'],
            status: 'published'
        },
        {
            id: '6',
            title: 'Docker 容器化部署实战',
            summary: '手把手教你使用 Docker 进行应用容器化部署，包括镜像构建、网络配置、数据持久化等实战技巧。',
            content: '...',
            createTime: '2024-02-15T09:20:00',
            views: 234,
            comments: 11,
            category: 'tech',
            tags: ['Docker', 'DevOps', '部署'],
            status: 'published'
        },
        {
            id: '7',
            title: 'Git 高级使用技巧',
            summary: '分享 Git 的高级使用技巧，包括分支管理、版本回退、冲突解决等实用技能。',
            content: '...',
            createTime: '2024-02-10T14:10:00',
            views: 167,
            comments: 7,
            category: 'tech',
            tags: ['Git', '版本控制', '开发工具'],
            status: 'published'
        }
    ]

    // 模拟草稿文章
    draftArticles.value = [
        {
            id: 'd1',
            title: 'React Hooks 使用技巧',
            summary: '总结 React Hooks 的使用技巧和常见问题解决方案，帮助开发者更好地使用 React Hooks。',
            content: 'React Hooks 是 React 16.8 引入的新特性，它让函数组件也能使用状态和其他 React 特性。本文将分享一些实用的 Hooks 使用技巧...',
            createTime: '2024-03-18T16:45:00',
            updateTime: '2024-03-18T17:30:00',
            views: 0,
            comments: 0,
            category: 'tech',
            tags: ['React', '前端', 'JavaScript'],
            status: 'draft'
        },
        {
            id: 'd2',
            title: '微服务架构设计实践',
            summary: '分享微服务架构的设计原则和实践经验，包括服务拆分、通信机制、数据一致性等关键问题。',
            content: '微服务架构已经成为现代应用开发的主流架构模式。本文将分享微服务架构的设计原则和实践经验，帮助开发者更好地理解和应用微服务架构...',
            createTime: '2024-03-17T11:20:00',
            updateTime: '2024-03-17T15:40:00',
            views: 0,
            comments: 0,
            category: 'tech',
            tags: ['微服务', '架构', '后端'],
            status: 'draft'
        },
        {
            id: 'd3',
            title: 'Webpack 5 配置优化',
            summary: '深入分析 Webpack 5 的配置优化技巧，包括代码分割、缓存优化、构建速度提升等实用方法。',
            content: '...',
            createTime: '2024-03-16T10:15:00',
            updateTime: '2024-03-16T14:30:00',
            views: 0,
            comments: 0,
            category: 'tech',
            tags: ['Webpack', '构建工具', '优化'],
            status: 'draft'
        },
        {
            id: 'd4',
            title: '前端性能监控方案',
            summary: '探讨前端性能监控的完整解决方案，包括性能指标采集、数据上报、可视化展示等关键环节。',
            content: '...',
            createTime: '2024-03-15T09:40:00',
            updateTime: '2024-03-15T13:20:00',
            views: 0,
            comments: 0,
            category: 'tech',
            tags: ['性能优化', '监控', '前端'],
            status: 'draft'
        }
    ]
})
</script>

<style lang="less" scoped>
.Self {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;

    .Self_User {
        height: 100vh;
        width: 100%;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        position: relative;
        z-index: 0;

        .Self_User_main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80%;
            width: 100%;
            position: relative;
            padding: 0 1rem;
            box-sizing: border-box;

            .Self_User_main_avatar {
                width: 7rem;
                height: 7rem;
                border-radius: 50%;
                overflow: hidden;
                margin-bottom: 1.5rem;
                animation: aperture 2s linear infinite;

                .avatar {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .Self_User_main_info {
                text-align: center;
                margin-bottom: 1.5rem;
                width: 100%;
                max-width: 500px;

                h2 {
                    font-size: 2rem;
                    color: #333;
                    margin-bottom: 0.8rem;
                    word-break: break-word;
                }

                .role-tag {
                    display: inline-block;
                    padding: 0.4rem 1.2rem;
                    border-radius: 1.5rem;
                    font-size: 0.9rem;
                    font-weight: bold;

                    &.admin {
                        background: #fdf6ec;
                        color: #e6a23c;
                    }

                    &.user {
                        background: #f0f9eb;
                        color: #67c23a;
                    }
                }
            }

            .Self_User_main_stats {
                display: flex;
                gap: 3rem;
                margin-top: 2rem;
                flex-wrap: wrap;
                justify-content: center;
                width: 100%;
                max-width: 700px;

                .stat-item {
                    text-align: center;
                    min-width: 120px;
                    padding: 0 0.8rem;

                    .number {
                        display: block;
                        font-size: 2rem;
                        font-weight: bold;
                        color: #409eff;
                        margin-bottom: 0.4rem;
                    }

                    .label {
                        font-size: 1rem;
                        color: #606266;
                        margin-top: 0.4rem;
                    }
                }
            }
        }

        .Self_User_animation {
            height: 20%;
            width: 100%;
            position: absolute;
            bottom: 0;
            overflow: hidden;

            .Self_User_animation_waves {
                width: 100%;
                height: 100%;

                .parallax>use {
                    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
                }

                .parallax>use:nth-child(1) {
                    animation-delay: -2s;
                    animation-duration: 7s;
                }

                .parallax>use:nth-child(2) {
                    animation-delay: -3s;
                    animation-duration: 10s;
                }

                .parallax>use:nth-child(3) {
                    animation-delay: -4s;
                    animation-duration: 13s;
                }

                .parallax>use:nth-child(4) {
                    animation-delay: -5s;
                    animation-duration: 20s;
                }
            }
        }
    }

    .Self_Content {
        width: 100%;
        min-height: 100vh;
        background-color: #fff;
        padding: 2rem;
        box-sizing: border-box;

        .action-buttons {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            justify-content: center;

            .el-button {
                flex: 1;
                min-width: 120px;
                max-width: 200px;
                height: 40px;
                font-size: 15px;
                border-radius: 20px;
                border: none;
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
            }
        }

        .article-list {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            max-width: 1200px;
            margin: 0 auto;

            :deep(.el-tabs) {
                .el-tabs__header {
                    margin-bottom: 1.5rem;
                    border-bottom: 2px solid rgba(14, 165, 233, 0.1);
                }

                .el-tabs__nav-wrap {
                    &::after {
                        display: none;
                    }
                }

                .el-tabs__item {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #64748b;
                    padding: 0.6rem 1.2rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 0.6rem;
                    margin-right: 0.8rem;

                    &:hover {
                        color: #0ea5e9;
                        background: rgba(14, 165, 233, 0.1);
                    }

                    &.is-active {
                        color: #ffffff;
                        background: linear-gradient(135deg, #0ea5e9, #0369a1);
                        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
                    }
                }

                .el-tabs__active-bar {
                    display: none;
                }
            }

            .article-items {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }

            .pagination-container {
                margin-top: 2rem;
                display: flex;
                justify-content: center;
            }
        }
    }
}

@keyframes aperture {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);
    }

    60% {
        box-shadow: 0 0 0 1.5rem rgba(255, 255, 255, 0);
    }

    100% {
        box-shadow: 0 0 0 3rem rgba(255, 255, 255, 0);
    }
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }

    100% {
        transform: translate3d(85px, 0, 0);
    }
}

// 响应式设计
@media screen and (max-width: 1366px) {
    .Self {
        .Self_User {
            .Self_User_main {
                .Self_User_main_avatar {
                    width: 6rem;
                    height: 6rem;
                }

                .Self_User_main_info {
                    h2 {
                        font-size: 1.8rem;
                    }
                }

                .Self_User_main_stats {
                    gap: 2rem;
                    margin-top: 1.5rem;

                    .stat-item {
                        min-width: 100px;
                        padding: 0 0.6rem;

                        .number {
                            font-size: 1.8rem;
                        }

                        .label {
                            font-size: 0.9rem;
                        }
                    }
                }
            }
        }

        .Self_Content {
            padding: 1.5rem;

            .action-buttons {
                gap: 0.8rem;
                margin-bottom: 1.5rem;

                .el-button {
                    min-width: 100px;
                    height: 36px;
                    font-size: 14px;
                }
            }

            .article-list {
                padding: 1.5rem;

                .article-items {
                    gap: 1.5rem;
                }

                :deep(.el-tabs) {
                    .el-tabs__item {
                        font-size: 1rem;
                        padding: 0.5rem 1rem;
                        margin-right: 0.6rem;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 992px) {
    .Self {
        .Self_User {
            .Self_User_main {
                .Self_User_main_avatar {
                    width: 5rem;
                    height: 5rem;
                }

                .Self_User_main_info {
                    h2 {
                        font-size: 1.6rem;
                    }
                }

                .Self_User_main_stats {
                    gap: 1.5rem;

                    .stat-item {
                        min-width: 90px;

                        .number {
                            font-size: 1.6rem;
                        }

                        .label {
                            font-size: 0.85rem;
                        }
                    }
                }
            }
        }

        .Self_Content {
            padding: 1rem;

            .action-buttons {
                gap: 0.6rem;
                margin-bottom: 1.2rem;

                .el-button {
                    min-width: 90px;
                    height: 32px;
                    font-size: 13px;
                }
            }

            .article-list {
                padding: 1.2rem;

                .article-items {
                    gap: 1.2rem;
                }

                :deep(.el-tabs) {
                    .el-tabs__item {
                        font-size: 0.9rem;
                        padding: 0.4rem 0.8rem;
                        margin-right: 0.4rem;
                    }
                }
            }
        }
    }
}

// 对话框响应式
@media screen and (max-width: 1366px) {
    :deep(.el-dialog) {
        width: 80% !important;
        margin: 5vh auto !important;
    }
}

@media screen and (max-width: 992px) {
    :deep(.el-dialog) {
        width: 90% !important;
        margin: 5vh auto !important;
    }
}
</style>