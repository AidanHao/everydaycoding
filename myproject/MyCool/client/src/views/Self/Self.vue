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
            <el-button v-if="userInfo.userPower === 1" type="warning" @click="goToAdmin">管理后台</el-button>
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

        <!-- 发布新文章抽屉 -->
        <el-drawer
            v-model="newArticleDialogVisible"
            title="发布新文章"
            size="100%"
            :with-header="true"
            :destroy-on-close="true"
            class="article-drawer"
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
                    <el-button type="primary" @click="saveArticle">保存</el-button>
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
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="editProfile.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <el-input v-model="editProfile.avatar" placeholder="请输入头像URL">
                                <template #append>
                                    <el-button @click="previewAvatar">预览</el-button>
                                </template>
                            </el-input>
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
import { ElMessage, ElMessageBox } from 'element-plus'
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
        // 这里应该调用后端API保存文章
        // const response = await axios.post('/articles', {
        //     ...newArticle.value,
        //     content: newArticle.value.markdown // 使用 markdown 内容
        // })
        
        ElMessage.success('保存成功')
        newArticleDialogVisible.value = false
    } catch (error) {
        ElMessage.error('保存失败')
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

    try {
        // 这里应该调用后端API发布文章
        // const response = await axios.post('/articles/publish', {
        //     ...newArticle.value,
        //     content: newArticle.value.markdown // 使用 markdown 内容
        // })
        
        ElMessage.success('发布成功')
        newArticleDialogVisible.value = false
    } catch (error) {
        ElMessage.error('发布失败')
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
            try {
                const response = await axios.get('/getUserInfo')
                
                console.log(response)
                const result = response.data
                if (result.code === '8000') {
                    userInfo.value = {
                        userId: result.data.userId,
                        username: result.data.userName,
                        nickName: result.data.nickName,
                        avatar: defaultAvatar,
                        userPower: result.data.userPower,
                        articleCount: 0,
                        followers: 0,
                        following: 0
                    }
                } else {
                    throw new Error(result.msg)
                }
            } catch (error) {
                console.error('获取用户信息失败:', error)
                ElMessage.error('获取用户信息失败')
            }
        } catch (error) {
            console.error('解析用户Token失败:', error)
            isLoggedIn.value = false
        }
    } else {
        isLoggedIn.value = false
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

const editProfile = ref({
    username: '',
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
        { pattern: /^https?:\/\/.+/, message: '请输入有效的图片URL', trigger: 'blur' }
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
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        { 
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            message: '密码必须包含大小写字母和数字',
            trigger: 'blur'
        }
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
    editProfile.value = {
        username: userInfo.value.username,
        avatar: userInfo.value.avatar,
        bio: userInfo.value.bio || ''
    }
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
    
    await profileFormRef.value.validate((valid: boolean) => {
        if (valid) {
            // 这里应该调用后端API保存个人信息
            userInfo.value = {
                ...userInfo.value,
                username: editProfile.value.username,
                avatar: editProfile.value.avatar,
                bio: editProfile.value.bio
            }
            ElMessage.success('保存成功')
            editProfileDialogVisible.value = false
        }
    })
}

// 修改密码
const changePassword = async () => {
    if (!passwordFormRef.value) return

    await passwordFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            try {
                // 这里应该调用后端API修改密码
                // const response = await api.changePassword({
                //     currentPassword: passwordForm.value.currentPassword,
                //     newPassword: passwordForm.value.newPassword
                // })
                
                ElMessage.success('密码修改成功')
                editProfileDialogVisible.value = false
                
                // 清空密码表单
                passwordForm.value = {
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            } catch (error) {
                ElMessage.error('密码修改失败，请检查当前密码是否正确')
            }
        }
    })
}

// 处理封面图片上传
const handleCoverChange = (file: any) => {
    if (!file) return
    
    // 检查文件类型
    const isImage = file.raw.type.startsWith('image/')
    if (!isImage) {
        ElMessage.error('只能上传图片文件！')
        return
    }
    
    // 检查文件大小（限制为2MB）
    const isLt2M = file.raw.size / 1024 / 1024 < 2
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB！')
        return
    }

    // 创建临时URL
    const objectUrl = URL.createObjectURL(file.raw)
    newArticle.value.cover = objectUrl
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

onMounted(() => {
    // 检查登录状态
    checkLoginStatus()

    // 模拟已发布文章
    publishedArticles.value = [
        {
            id: '1',
            title: 'Vue3 组合式 API 最佳实践',
            summary: '本文详细介绍了 Vue3 组合式 API 的使用方法和最佳实践，包括响应式系统、生命周期钩子、组件通信等内容。',
            content: 'Vue3 的组合式 API 是 Vue 3 中最重要的新特性之一。它提供了一种更灵活、更可复用的方式来组织组件代码。本文将深入探讨组合式 API 的核心概念和使用方法...',
            markdown: '# Vue3 组合式 API 最佳实践\n\nVue3 的组合式 API 是 Vue 3 中最重要的新特性之一。它提供了一种更灵活、更可复用的方式来组织组件代码。本文将深入探讨组合式 API 的核心概念和使用方法...',
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
            title: 'TypeScript 高级类型实战',
            summary: '深入探讨 TypeScript 的高级类型系统，包括泛型、条件类型、映射类型等高级特性的实际应用。',
            content: 'TypeScript 的类型系统非常强大，本文将重点介绍一些高级类型的使用场景和最佳实践...',
            markdown: '# TypeScript 高级类型实战\n\nTypeScript 的类型系统非常强大，本文将重点介绍一些高级类型的使用场景和最佳实践...',
            createTime: '2024-03-16T14:20:00',
            views: 189,
            comments: 8,
            category: 'tech',
            tags: ['TypeScript', '前端', 'JavaScript'],
            cover: 'https://picsum.photos/800/400',
            status: 'published'
        },
        {
            id: '3',
            title: 'Node.js 性能优化指南',
            summary: '分享 Node.js 应用性能优化的实用技巧，包括内存管理、异步操作优化、缓存策略等。',
            content: 'Node.js 应用的性能优化是一个复杂的话题，本文将分享一些实用的优化技巧...',
            markdown: '# Node.js 性能优化指南\n\nNode.js 应用的性能优化是一个复杂的话题，本文将分享一些实用的优化技巧...',
            createTime: '2024-03-17T09:15:00',
            views: 156,
            comments: 6,
            category: 'tech',
            tags: ['Node.js', '后端', '性能优化'],
            cover: 'https://picsum.photos/800/400',
            status: 'published'
        },
        {
            id: '4',
            title: '前端工程化实践指南',
            summary: '从零开始构建现代化前端工程化体系，包括构建工具、代码规范、自动化测试等关键环节的实践分享。',
            content: '...',
            markdown: '',
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
            markdown: '',
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
            markdown: '',
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
            markdown: '',
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
            markdown: '# React Hooks 使用技巧\n\nReact Hooks 是 React 16.8 引入的新特性，它让函数组件也能使用状态和其他 React 特性。本文将分享一些实用的 Hooks 使用技巧...',
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
            markdown: '# 微服务架构设计实践\n\n微服务架构已经成为现代应用开发的主流架构模式。本文将分享微服务架构的设计原则和实践经验，帮助开发者更好地理解和应用微服务架构...',
            createTime: '2024-03-19T11:20:00',
            updateTime: '2024-03-19T15:40:00',
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
            markdown: '',
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
            markdown: '',
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
        height: 100%;
        overflow: visible;
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
    }

    .article-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 0 2rem 0;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 0;

        .form-header {
            margin-bottom: 1.5rem;
            max-width: 100%;
            margin-left: 0;
            margin-right: 0;
            width: 100%;
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
            min-height: 600px;
            max-width: 100%;
            margin-left: 0;
            margin-right: 0;
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
        max-height: 500px;
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
        max-width: 100%;
            margin-left: 0;
            margin-right: 0;
        width: 100%;

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
@media screen and (max-width: 768px) {
    .article-drawer {
        .article-form {
            padding: 0;

            .form-header,
            .markdown-form-item,
            .drawer-footer {
                min-width: 100%;
                max-width: 100%;
                margin-left: 0;
                margin-right: 0;
            }

            .form-row {
                flex-direction: column;
                gap: 1rem;
            }

            .markdown-form-item {
                min-height: 400px;
            }
        }

        .markdown-editor {
            min-height: 400px;
            min-width: 100%;
            :deep(.md-editor) {
                min-height: 400px;
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
        width: 300px;
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
            width: 300px;
            height: 200px;
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
    }

    .cover-tip {
        font-size: 12px;
        color: #909399;
    }
}
</style>