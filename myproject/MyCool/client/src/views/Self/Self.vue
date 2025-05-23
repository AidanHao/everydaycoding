<template>
    <div class="Self">
        <div class="Self_User">
            <div class="Self_User_main">
                <template v-if="isLoggedIn">
                    <div class="Self_User_main_avatar">
                        <img :src="userInfo.avatar || defaultAvatar" class="avatar" alt="用户头像">
                    </div>
                    <div class="Self_User_main_info">
                        <h2>{{ userInfo.nickName }}</h2>
                        <p class="role-tag" :class="getUserRoleClass(userInfo.userPower)">
                            {{ getUserRoleText(userInfo.userPower) }}
                        </p>
                    </div>
                    <div class="logout-section">
                        <el-button type="primary" size="small" @click="showEditProfileDialog" class="edit-profile-button">
                            编辑资料
                        </el-button>
                        <el-button type="danger" size="small" @click="handleLogout" class="logout-button">
                            退出登录
                        </el-button>
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
                </template>
                <template v-else>
                    <div class="Self_User_main_not_login">
                        <div class="not-login-icon">
                            <i class="el-icon-user"></i>
                        </div>
                        <h2>您还未登录</h2>
                        <p class="login-tip">登录后可以发布文章、管理内容</p>
                        <el-button type="primary" size="large" @click="goToLogin" class="login-button">
                            立即登录
                        </el-button>
                    </div>
                </template>
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

        <div class="Self_Content" v-if="isLoggedIn">
        <div class="action-buttons">
            <el-button type="primary" @click="showNewArticleDialog">发布新文章</el-button>
            <el-button type="success" @click="showDraftList">草稿箱</el-button>
            <el-button type="info" @click="showArticleList">我的文章</el-button>
            <el-button v-if="userInfo.userPower === 1 || userInfo.userPower === 2" type="warning" @click="goToAdmin">管理后台</el-button>
        </div>

        <div class="article-list">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="已发布" name="published">
                    <div v-if="publishedArticles.length === 0" class="empty-state">
                        <div class="empty-icon">
                            <i class="el-icon-document"></i>
                        </div>
                        <h3>暂无已发布的文章</h3>
                        <p>点击"发布新文章"按钮开始创作吧！</p>
                        <el-button type="primary" @click="showNewArticleDialog" class="create-button">
                            发布新文章
                        </el-button>
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
                                :status="article.status"
                                @edit="editArticle"
                                @delete="deleteArticle"
                                @click="goToArticle(article.id)"
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
                    <div v-if="draftArticles.length === 0" class="empty-state">
                        <div class="empty-icon">
                            <i class="el-icon-notebook-2"></i>
                        </div>
                        <h3>暂无草稿</h3>
                        <p>开始写作并保存为草稿吧！</p>
                        <el-button type="primary" @click="showNewArticleDialog" class="create-button">
                            创建草稿
                        </el-button>
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
                                :status="article.status"
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

        <!-- 发布新文章抽屉 -->
        <el-drawer
            v-model="newArticleDialogVisible"
            title="发布新文章"
            size="100%"
            :with-header="true"
            :destroy-on-close="true"
            class="article-drawer"
            @close="handleDrawerClose"
        >
            <div class="drawer-content">
                <el-form :model="newArticle" label-width="80px" class="article-form">
                    <div class="form-header">
                        <el-form-item label="标题" required>
                            <el-input v-model="newArticle.title" placeholder="请输入文章标题"></el-input>
                        </el-form-item>
                        <el-form-item label="摘要">
                            <el-input v-model="newArticle.summary" type="textarea" :rows="3" placeholder="请输入文章摘要"></el-input>
                        </el-form-item>
                        <el-form-item label="封面">
                            <div class="cover-upload">
                                <el-upload
                                    class="cover-uploader"
                                    action="#"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    :on-change="handleCoverChange"
                                    accept="image/*"
                                    :http-request="() => {}"
                                >
                                    <img v-if="newArticle.cover" :src="newArticle.cover" class="cover-image" />
                                    <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
                                </el-upload>
                                <div class="cover-tip">点击上传封面图片</div>
                            </div>
                        </el-form-item>
                        <div class="form-row">
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
                        </div>
                    </div>
                    <el-form-item label="内容" required class="markdown-form-item">
                        <div class="markdown-editor">
                            <MdEditor
                                v-model="newArticle.markdown"
                                :preview="true"
                                :toolbars="[
                                    'bold', 'italic', 'strikeThrough', 'title', 'sub', 'sup', 'quote', 'unorderedList',
                                    'orderedList', 'task', 'code', 'link', 'image', 'table', 'preview',
                                    'fullscreen'
                                ]"
                                @onChange="(v) => newArticle.markdown = v"
                                @onUploadImg="handleMarkdownImageUpload"
                            />
                        </div>
                    </el-form-item>
                </el-form>
                <div class="drawer-footer">
                    <el-button @click="newArticleDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveArticle">保存为草稿</el-button>
                    <el-button type="success" @click="publishArticle">发布</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- 编辑个人信息对话框 -->
        <el-dialog
            v-model="editProfileDialogVisible"
            title="编辑个人信息"
            width="500px"
            :before-close="handleClose"
        >
            <el-tabs v-model="activeProfileTab">
                <el-tab-pane label="基本信息" name="basic">
                    <el-form :model="editProfile" label-width="80px" :rules="profileRules" ref="profileFormRef">
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model="editProfile.nickName" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <div class="avatar-upload">
                                <el-upload
                                    class="avatar-uploader"
                                    action="#"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    :on-change="handleAvatarChange"
                                    accept="image/*"
                                    :http-request="() => {}"
                                >
                                    <img v-if="editProfile.avatar" :src="editProfile.avatar" class="avatar-preview-image" />
                                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                                </el-upload>
                                <div class="avatar-tip">点击上传头像图片</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="bio">
                            <el-input
                                v-model="editProfile.bio"
                                type="textarea"
                                :rows="3"
                                placeholder="请输入个人简介"
                            />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="password">
                    <el-form :model="passwordForm" label-width="100px" :rules="passwordRules" ref="passwordFormRef">
                        <el-form-item label="当前密码" prop="currentPassword">
                            <el-input 
                                v-model="passwordForm.currentPassword" 
                                type="password" 
                                placeholder="请输入当前密码"
                                show-password
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input 
                                v-model="passwordForm.newPassword" 
                                type="password" 
                                placeholder="请输入新密码"
                                show-password
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="confirmPassword">
                            <el-input 
                                v-model="passwordForm.confirmPassword" 
                                type="password" 
                                placeholder="请再次输入新密码"
                                show-password
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editProfileDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSave">保存</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 头像预览对话框 -->
        <el-dialog
            v-model="avatarPreviewVisible"
            title="头像预览"
            width="300px"
            align-center
        >
            <div class="avatar-preview">
                <img :src="editProfile.avatar || defaultAvatar" alt="头像预览" class="preview-image">
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import ArticleCard from '@/components/ArticleCard.vue'
import axios from '../../api'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { Plus } from '@element-plus/icons-vue'

// 使用在线默认头像
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

// 定义文章接口
interface Article {
    id: string
    title: string
    summary: string
    content: string
    markdown: string
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
    userId: string
    username: string
    nickName: string
    avatar: string
    userPower: number // 0: 普通用户, 1: 管理员, 2: 超级管理员
    articleCount: number
    followers: number
    following: number
    bio?: string
}

// 定义用户Token接口
interface UserToken {
    jsonToken: string
    nickName: string
    userId: string
    rememberMe: boolean
    passWord: string
    userName: string
}

const router = useRouter()

// 用户信息
const userInfo = ref<UserInfo>({
    userId: '',
    username: '',
    nickName: '',
    avatar: '',
    userPower: 0,
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
    markdown: '',
    category: '',
    tags: [],
    cover: ''
})

// 分类和标签选项
const categories = ref([
    { value: 'tech', label: '技术' },
    { value: 'life', label: '生活' },
    { value: 'travel', label: '旅行' },
    { value: 'other', label: '其他' }
])

const tagOptions = ref([
    { value: 'vue', label: 'Vue' },
    { value: 'react', label: 'React' },
    { value: 'node', label: 'Node.js' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'design', label: '设计' },
    { value: 'algorithm', label: '算法' },
    { value: 'database', label: '数据库' }
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
    newArticle.value = {
        id: article.id,
        title: article.title,
        summary: article.summary,
        content: article.content,
        markdown: article.markdown || article.content,
        category: article.category,
        tags: article.tags,
        cover: article.cover,
        status: article.status
    }
    newArticleDialogVisible.value = true
}

// 删除文章
const deleteArticle = async (article: Article) => {
    try {
        const response = await axios.post('/deleteArticle', {
            articleId: article.id
        });

        if (response.data.code === '8000') {
            ElMessage.success('删除成功');
            // 刷新文章列表
            getUserArticles();
        } else {
            ElMessage.error(response.data.msg || '删除失败');
        }
    } catch (error) {
        console.error('删除文章失败:', error);
        ElMessage.error('删除失败，请稍后重试');
    }
}

// 删除草稿
const deleteDraft = async (draft: Article) => {
    try {
        const response = await axios.post('/deleteArticle', {
            articleId: draft.id
        });

        if (response.data.code === '8000') {
            ElMessage.success('删除成功');
            // 刷新文章列表
            getUserArticles();
        } else {
            ElMessage.error(response.data.msg || '删除失败');
        }
    } catch (error) {
        console.error('删除草稿失败:', error);
        ElMessage.error('删除失败，请稍后重试');
    }
}

// 保存文章
const saveArticle = async () => {
    if (!newArticle.value.title) {
        ElMessage.warning('请输入文章标题')
        return
    }
    if (!newArticle.value.markdown) {
        ElMessage.warning('请输入文章内容')
        return
    }

    try {
        const response = await axios.post('/draftArticle', {
            articleId: newArticle.value.id,
            title: newArticle.value.title,
            content: newArticle.value.markdown,
            articleLabel: newArticle.value.tags?.join(',') || '',
            articleType: newArticle.value.category || '',
            articleDesc: newArticle.value.summary || '',
            coverImg: newArticle.value.cover || '',
            status: '0'
        });

        if (response.data.code === '8000') {
            ElMessage.success('保存为草稿成功');
            newArticleDialogVisible.value = false;
            // 清空表单
            clearArticleForm();
            // 刷新文章列表
            getUserArticles();
        } else {
            ElMessage.error(response.data.msg || '保存失败');
        }
    } catch (error) {
        console.error('保存草稿失败:', error);
        ElMessage.error('保存失败，请稍后重试');
    }
}

// 发布文章
const publishArticle = async () => {
    if (!newArticle.value.title) {
        ElMessage.warning('请输入文章标题')
        return
    }
    if (!newArticle.value.markdown) {
        ElMessage.warning('请输入文章内容')
        return
    }

    // 显示加载状态
    const loadingInstance = ElLoading.service({
        lock: true,
        text: '正在发布文章...',
        background: 'rgba(0, 0, 0, 0.7)'
    })

    try {
        const response = await axios.post('/publishArticle', {
            articleId: newArticle.value.id,
            title: newArticle.value.title,
            content: newArticle.value.markdown,
            articleLabel: newArticle.value.tags?.join(',') || '',
            articleType: newArticle.value.category || '',
            articleDesc: newArticle.value.summary || '',
            coverImg: newArticle.value.cover || '',
            status: '1'
        });

        if (response.data.code === '8000') {
            ElMessage.success('发布成功，等待审核');
            newArticleDialogVisible.value = false;
            // 清空表单
            clearArticleForm();
            // 刷新文章列表
            getUserArticles();
        } else {
            ElMessage.error(response.data.msg || '发布失败');
        }
    } catch (error) {
        console.error('发布文章失败:', error);
        ElMessage.error('发布失败，请稍后重试');
    } finally {
        // 确保在任何情况下都关闭 loading
        loadingInstance.close();
    }
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

// 添加登录状态控制
const isLoggedIn = ref(false)

// 获取用户角色文本
const getUserRoleText = (userPower: number) => {
    switch (userPower) {
        case 0:
            return '普通用户'
        case 1:
            return '管理员'
        case 2:
            return '超级管理员'
        default:
            return '普通用户'
    }
}

// 获取用户角色样式类
const getUserRoleClass = (userPower: number) => {
    switch (userPower) {
        case 0:
            return 'user'
        case 1:
            return 'admin'
        case 2:
            return 'super-admin'
        default:
            return 'user'
    }
}

// 检查用户登录状态
const checkLoginStatus = async () => {
    const userTokenStr = localStorage.getItem('userToken')
    if (userTokenStr) {
        try {
            const userToken: UserToken = JSON.parse(userTokenStr)
            isLoggedIn.value = true
            // 获取用户信息
            await getUserInfo()
        } catch (error) {
            console.error('解析用户Token失败:', error)
            isLoggedIn.value = false
            // 清除无效的token
            localStorage.removeItem('userToken')
        }
    } else {
        isLoggedIn.value = false
    }
}

// 获取用户信息
const getUserInfo = async () => {
    try {
        const response = await axios.get('/getUserInfo', {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        })
        const result = response.data
        if (result.code === '8000') {
            userInfo.value = {
                userId: result.data.userId,
                username: result.data.userName,
                nickName: result.data.nickName,
                avatar: result.data.avatar || defaultAvatar,
                userPower: result.data.userPower,
                articleCount: result.data.articleCount || 0,
                followers: result.data.followers || 0,
                following: result.data.following || 0,
                bio: result.data.desc || ''
            }
            // 更新本地存储的用户信息
            const userTokenStr = localStorage.getItem('userToken')
            if (userTokenStr) {
                const userToken: UserToken = JSON.parse(userTokenStr)
                userToken.nickName = result.data.nickName
                localStorage.setItem('userToken', JSON.stringify(userToken))
            }
        } else {
            throw new Error(result.msg)
        }
    } catch (error) {
        console.error('获取用户信息失败:', error)
        ElMessage.error('获取用户信息失败')
        // 如果获取用户信息失败，可能是token过期，清除登录状态
        isLoggedIn.value = false
        localStorage.removeItem('userToken')
    }
}

// 前往登录页面
const goToLogin = () => {
    router.push('/login')
}

// 处理退出登录
const handleLogout = () => {
    ElMessageBox.confirm(
        '确定要退出登录吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 清除 localStorage 中的用户信息
        localStorage.removeItem('userToken')
        // 重置用户状态
        isLoggedIn.value = false
        userInfo.value = {
            userId: '',
            username: '',
            nickName: '',
            avatar: '',
            userPower: 0,
            articleCount: 0,
            followers: 0,
            following: 0
        }
        ElMessage.success('退出登录成功')
        // 跳转到登录页面
        router.push('/login')
    }).catch(() => {
        // 取消退出
    })
}

// 编辑个人信息相关
const editProfileDialogVisible = ref(false)
const avatarPreviewVisible = ref(false)
const profileFormRef = ref()
const passwordFormRef = ref()
const activeProfileTab = ref('basic')

interface EditProfile {
    nickName: string
    avatar: string
    bio: string
}

const editProfile = ref<EditProfile>({
    nickName: '',
    avatar: '',
    bio: ''
})

const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const profileRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    avatar: [
        { required: false, message: '请上传头像', trigger: 'change' }
    ],
    bio: [
        { max: 200, message: '不能超过200个字符', trigger: 'blur' }
    ]
}

const passwordRules = {
    currentPassword: [
        { required: true, message: '请输入当前密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        {
            validator: (rule: any, value: string, callback: Function) => {
                if (value !== passwordForm.value.newPassword) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ]
}

// 显示编辑个人信息对话框
const showEditProfileDialog = () => {
    // 使用当前用户信息初始化编辑表单
    editProfile.value = {
        nickName: userInfo.value.nickName,
        avatar: userInfo.value.avatar || defaultAvatar,
        bio: userInfo.value.bio || ''
    }
    // 重置密码表单
    passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
    activeProfileTab.value = 'basic'
    editProfileDialogVisible.value = true
}

// 预览头像
const previewAvatar = () => {
    if (editProfile.value.avatar) {
        avatarPreviewVisible.value = true
    } else {
        ElMessage.warning('请先输入头像URL')
    }
}

// 处理保存
const handleSave = async () => {
    if (activeProfileTab.value === 'basic') {
        await saveProfile()
    } else {
        await changePassword()
    }
}

// 保存个人信息
const saveProfile = async () => {
    if (!profileFormRef.value) return
    
    await profileFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            try {
                // 如果头像没有改变，使用默认头像
                const avatarToSave = editProfile.value.avatar === defaultAvatar ? '' : editProfile.value.avatar;
                
                const response = await axios.post('/editUserInfo', {
                    nickName: editProfile.value.nickName,
                    avatar: avatarToSave,
                    desc: editProfile.value.bio
                });

                if (response.data.code === '8000') {
                    // 更新本地用户信息
                    userInfo.value = {
                        ...userInfo.value,
                        nickName: editProfile.value.nickName,
                        avatar: avatarToSave || defaultAvatar,
                        bio: editProfile.value.bio
                    }

                    // 更新本地存储的 token
                    const userTokenStr = localStorage.getItem('userToken')
                    if (userTokenStr) {
                        const userToken: UserToken = JSON.parse(userTokenStr)
                        userToken.jsonToken = response.data.data.jsonToken
                        userToken.nickName = editProfile.value.nickName
                        localStorage.setItem('userToken', JSON.stringify(userToken))
                    }

                    ElMessage.success('保存成功')
                    editProfileDialogVisible.value = false
                } else {
                    ElMessage.error(response.data.msg || '保存失败')
                }
            } catch (error) {
                console.error('保存个人信息失败:', error)
                ElMessage.error('保存失败，请稍后重试')
            }
        }
    })
}

// 修改密码
const changePassword = async () => {
    if (!passwordFormRef.value) return

    await passwordFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            try {
                const response = await axios.post('/changePassword', {
                    oldPassword: passwordForm.value.currentPassword,
                    newPassword: passwordForm.value.newPassword
                });

                if (response.data.code === '8000') {
                    ElMessage.success('密码修改成功，请重新登录');
                    editProfileDialogVisible.value = false;
                    
                    // 清空密码表单
                    passwordForm.value = {
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    };

                    // 清除登录信息
                    localStorage.removeItem('userToken');
                    isLoggedIn.value = false;
                    userInfo.value = {
                        userId: '',
                        username: '',
                        nickName: '',
                        avatar: '',
                        userPower: 0,
                        articleCount: 0,
                        followers: 0,
                        following: 0
                    };

                    // 跳转到登录页面
                    router.push('/login');
                } else {
                    ElMessage.error(response.data.msg || '密码修改失败');
                }
            } catch (error) {
                console.error('修改密码失败:', error);
                // ElMessage.error('密码修改失败，请稍后重试');
            }
        }
    });
}

// Add image compression function
const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            const img = new Image()
            img.src = e.target?.result as string
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                
                // Calculate new dimensions while maintaining aspect ratio
                let width = img.width
                let height = img.height
                const maxSize = 800 // Maximum dimension
                
                if (width > height && width > maxSize) {
                    height = Math.round((height * maxSize) / width)
                    width = maxSize
                } else if (height > maxSize) {
                    width = Math.round((width * maxSize) / height)
                    height = maxSize
                }
                
                canvas.width = width
                canvas.height = height
                
                // Draw and compress
                ctx?.drawImage(img, 0, 0, width, height)
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
                resolve(compressedBase64)
            }
            img.onerror = reject
        }
        reader.onerror = reject
    })
}

// Update handleAvatarChange function
const handleAvatarChange = async (file: any) => {
    if (!file) return
    
    // Check file type
    const isImage = file.raw.type.startsWith('image/')
    if (!isImage) {
        ElMessage.error('只能上传图片文件！')
        return
    }
    
    // Check file size (limit to 2MB)
    const isLt2M = file.raw.size / 1024 / 1024 < 2
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB！')
        return
    }

    try {
        // Compress and convert to base64
        const compressedBase64 = await compressImage(file.raw)
        editProfile.value.avatar = compressedBase64
    } catch (error) {
        console.error('图片处理失败:', error)
        ElMessage.error('图片处理失败，请重试')
    }
}

// Update handleCoverChange function
const handleCoverChange = async (file: any) => {
    if (!file) return
    
    // Check file type
    const isImage = file.raw.type.startsWith('image/')
    if (!isImage) {
        ElMessage.error('只能上传图片文件！')
        return
    }
    
    // Check file size (limit to 2MB)
    const isLt2M = file.raw.size / 1024 / 1024 < 2
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB！')
        return
    }

    try {
        // Compress and convert to base64
        const compressedBase64 = await compressImage(file.raw)
        newArticle.value.cover = compressedBase64
    } catch (error) {
        console.error('图片处理失败:', error)
        ElMessage.error('图片处理失败，请重试')
    }
}

// 处理 Markdown 编辑器图片上传
const handleMarkdownImageUpload = async (files: FileList, callback: (urls: string[]) => void) => {
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(file);
            urls.push(objectUrl);
        }
    }
    callback(urls);
};

// 清空表单
const clearArticleForm = () => {
    newArticle.value = {
        title: '',
        summary: '',
        content: '',
        markdown: '',
        category: '',
        tags: [],
        cover: ''
    }
}

// 处理抽屉关闭
const handleDrawerClose = () => {
    clearArticleForm()
    newArticleDialogVisible.value = false
}

// 获取文章状态
const getArticleStatus = (status: string): 'published' | 'draft' | 'pending' | 'rejected' => {
    switch (status) {
        case '0':
            return 'draft';
        case '1':
            return 'pending';
        case '2':
            return 'rejected';
        case '3':
            return 'published';
        default:
            return 'draft';
    }
}

// 获取用户文章列表
const getUserArticles = async () => {
    try {
        const response = await axios.post('/getUserArticles');
        console.log('获取的文章', response)
        if (response.data.code === '8000') {
            // 将后端返回的文章数据转换为前端需要的格式
            const allArticles = response.data.data.map((article: any) => ({
                id: article.articleId,
                title: article.title,
                summary: article.articleDesc || '',
                content: article.content,
                markdown: article.content,
                createTime: article.publishTime,
                views: parseInt(article.viewCount) || 0,
                comments: 0, // 暂时设为0，后续可以添加评论数
                category: article.articleType || '',
                tags: article.articleLabel ? article.articleLabel.split(',') : [],
                cover: article.coverImg || '',
                status: getArticleStatus(article.status)
            }));

            // 分离草稿和已发布文章
            publishedArticles.value = allArticles.filter((article: Article) => article.status !== 'draft');
            draftArticles.value = allArticles.filter((article: Article) => article.status === 'draft');
        } else {
            ElMessage.error(response.data.msg || '获取文章列表失败');
        }
    } catch (error) {
        console.error('获取文章列表失败:', error);
        ElMessage.error('获取文章列表失败，请稍后重试');
    }
}

// 前往文章页面
const goToArticle = (id: string) => {
    router.push(`/article/${id}`)
}

// 添加路由守卫来监听路由变化
onMounted(() => {
    // 检查登录状态
    checkLoginStatus()
    // 获取用户文章列表
    getUserArticles()

    // 添加路由变化监听
    router.beforeEach(async (to, from, next) => {
        if (to.path === '/self') {
            await checkLoginStatus()
        }
        next()
    })
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
                margin-bottom: 1rem;
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

                    &.super-admin {
                        background: #fef0f0;
                        color: #f56c6c;
                    }
                }
            }

            .logout-section {
                margin-bottom: 2rem;
                text-align: center;
                display: flex;
                gap: 1rem;
                justify-content: center;

                .edit-profile-button {
                    border-radius: 1.5rem;
                    padding: 0.4rem 1.2rem;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    background: linear-gradient(135deg, #409eff, #2c5cff);
                    border: none;
                    color: white;
                    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;

                    &::before {
                        content: '';
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'/%3E%3C/svg%3E") no-repeat center center;
                        background-size: contain;
                    }

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
                        background: linear-gradient(135deg, #66b1ff, #409eff);
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2);
                    }
                }

                .logout-button {
                    border-radius: 1.5rem;
                    padding: 0.4rem 1.2rem;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    background: linear-gradient(135deg, #ff4d4f, #cf1322);
                    border: none;
                    color: white;
                    box-shadow: 0 2px 8px rgba(255, 77, 79, 0.2);
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;

                    &::before {
                        content: '';
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5zm16 7l-4-4v3H9v2h8v3l4-4z'/%3E%3C/svg%3E") no-repeat center center;
                        background-size: contain;
                    }

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
                        background: linear-gradient(135deg, #ff7875, #d9363e);
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 6px rgba(255, 77, 79, 0.2);
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

            .Self_User_main_not_login {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 2rem;

                .not-login-icon {
                    width: 8rem;
                    height: 8rem;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    animation: pulse 2s infinite;

                    i {
                        font-size: 4rem;
                        color: #fff;
                    }
                }

                h2 {
                    font-size: 2rem;
                    color: #333;
                    margin-bottom: 1rem;
                }

                .login-tip {
                    font-size: 1.1rem;
                    color: #666;
                    margin-bottom: 2rem;
                }

                .login-button {
                    padding: 0.8rem 2.5rem;
                    font-size: 1.1rem;
                    border-radius: 2rem;
                    background: linear-gradient(135deg, #0ea5e9, #0369a1);
                    border: none;
                    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
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

            .empty-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 4rem 2rem;
                text-align: center;
                background: #f8fafc;
                border-radius: 12px;
                margin: 2rem 0;

                .empty-icon {
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #e3e9f2 0%, #c3cfe2 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    animation: float 3s ease-in-out infinite;

                    i {
                        font-size: 40px;
                        color: #64748b;
                    }
                }

                h3 {
                    font-size: 1.5rem;
                    color: #334155;
                    margin-bottom: 0.8rem;
                    font-weight: 600;
                }

                p {
                    font-size: 1rem;
                    color: #64748b;
                    margin-bottom: 1.5rem;
                }

                .create-button {
                    padding: 0.8rem 2rem;
                    font-size: 1rem;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
                    border: none;
                    color: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(14, 165, 233, 0.3);
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
                    }
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

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    
    70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
    }
    
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
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

.avatar-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    .preview-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}

:deep(.el-dialog) {
    .el-tabs__nav-wrap {
        margin-bottom: 1.5rem;
    }

    .el-tabs__item {
        font-size: 1rem;
        padding: 0 1.5rem;
        
        &.is-active {
            color: #409eff;
        }
    }

    .el-form {
        padding: 0 1rem;
    }
}

// 添加 Markdown 编辑器样式
.markdown-editor {
    height: 300px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;

    :deep(.md-editor) {
        height: 100%;
    }
}

.article-dialog {
    display: flex;
    flex-direction: column;
    height: 80vh;
    min-height: 480px;
    max-height: 92vh;
    max-width: 90vw;
    min-width: 320px;
    width: 60vw;
    box-sizing: border-box;
    :deep(.el-dialog__body) {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        padding: 2.5vw 2.5vw 1.5vw 2.5vw;
        background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f2 100%);
        border-radius: 16px;
        overflow: hidden;
    }
    :deep(.el-form) {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .markdown-editor {
        flex: 1 1 0;
        min-height: 400px;
        max-height: 600px;
        border: 2px solid #b6d0e2;
        border-radius: 8px;
        background: #fafdff;
        margin-top: 8px;
        box-shadow: 0 2px 12px rgba(14, 165, 233, 0.08);
        display: flex;
        flex-direction: column;
        :deep(.md-editor) {
            flex: 1 1 0;
            height: 100%;
            border-radius: 8px;
        }
    }
    :deep(.el-dialog__header) {
        padding: 2vw 2.5vw 0 2.5vw;
        background: linear-gradient(90deg, #0ea5e9 0%, #0369a1 100%);
        color: #fff;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        .el-dialog__title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #fff;
        }
    }
    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1.5rem;
        padding: 1vw 2.5vw 0.5vw 2.5vw;
        background: transparent;
        .el-button {
            min-width: 90px;
            font-size: 1.08rem;
            border-radius: 24px;
            padding: 0.7rem 2.2rem;
            font-weight: 600;
            transition: all 0.2s;
        }
    }
}

@media screen and (max-width: 900px) {
    .article-dialog {
        width: 96vw;
        min-width: 0;
        max-width: 100vw;
        height: 92vh;
        min-height: 320px;
        :deep(.el-dialog__body), :deep(.el-dialog__header), .dialog-footer {
            padding-left: 2vw;
            padding-right: 2vw;
        }
    }
}

// 文章抽屉样式
.article-drawer {
    :deep(.el-drawer__header) {
        margin-bottom: 0;
        padding: 1.5rem 2rem;
        background: linear-gradient(90deg, #0ea5e9 0%, #0369a1 100%);
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    :deep(.el-drawer__body) {
        padding: 0;
        height: calc(100vh - 60px);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .drawer-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f8fafc;
        max-width: 100%;
        margin: 0;
        width: 100%;
        overflow: hidden;
    }

    .article-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 0;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;

        .form-header {
            margin-bottom: 1.5rem;
            width: 100%;

            .el-form-item {
                margin-bottom: 1.5rem;
            }
        }

        .form-row {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;

            .el-form-item {
                flex: 1;
                margin-bottom: 0;
            }
        }

        .markdown-form-item {
            flex: 1;
            margin-bottom: 0;
            display: flex;
            flex-direction: column;
            min-height: 400px;
            width: 100%;

            :deep(.el-form-item__content) {
                flex: 1;
                display: flex;
                flex-direction: column;
                min-height: 0;
            }
        }
    }

    .markdown-editor {
        flex: 1;
        min-height: 300px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;

        :deep(.md-editor) {
            flex: 1;
            min-height: 300px;
            border: none;
            display: flex;
            flex-direction: column;
        }
    }

    .drawer-footer {
        padding: 1rem 2rem;
        background: #fff;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        position: sticky;
        bottom: 0;
        z-index: 10;
        width: 100%;
        box-sizing: border-box;

        .el-button {
            min-width: 100px;
            padding: 0.8rem 2rem;
            font-size: 1rem;
            border-radius: 6px;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }
    }
}

// 响应式调整
@media screen and (max-width: 1200px) {
    .article-drawer {
        .article-form {
            padding: 1.5rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .article-drawer {
        .article-form {
            padding: 1rem;

            .form-header {
                margin-bottom: 1rem;

                .el-form-item {
                    margin-bottom: 1rem;
                }
            }

            .form-row {
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .markdown-form-item {
                min-height: 250px;
            }
        }

        .markdown-editor {
            min-height: 250px;
            :deep(.md-editor) {
                min-height: 250px;
            }
        }

        .drawer-footer {
            padding: 1rem;
            flex-wrap: wrap;

            .el-button {
                flex: 1;
                min-width: 80px;
                padding: 0.6rem 1.5rem;
            }
        }
    }
}

// 添加封面图片上传样式
.cover-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .cover-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: border-color 0.3s;
        width: 100%;
        max-width: 300px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            border-color: #409eff;
        }

        .cover-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cover-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        :deep(.el-upload) {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .cover-tip {
        font-size: 12px;
        color: #909399;
    }
}

// 添加头像上传样式
.avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: border-color 0.3s;
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            border-color: #409eff;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .avatar-preview-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        :deep(.el-upload) {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .avatar-tip {
        font-size: 12px;
        color: #909399;
    }
}
</style>