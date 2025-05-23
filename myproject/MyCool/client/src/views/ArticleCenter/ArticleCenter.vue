<template>
    <div class="article-center">
        <div class="article-center-header">
            <div class="search-container">
                <el-input
                    v-model="searchQuery"
                    placeholder="搜索文章标题、内容或标签"
                    class="search-input"
                    clearable
                >
                    <template #prefix>
                        <el-icon><Search /></el-icon>
                    </template>
                    <template #append>
                        <el-button @click="handleSearch">
                            <el-icon><Search /></el-icon>
                            搜索
                        </el-button>
                    </template>
                </el-input>
                <el-select
                    v-model="selectedCategory"
                    placeholder="选择分类"
                    clearable
                    class="category-select"
                    @change="handleCategoryChange"
                >
                    <el-option
                        v-for="category in categories"
                        :key="category.value"
                        :label="category.label"
                        :value="category.value"
                    />
                </el-select>
                <el-select
                    v-model="selectedTag"
                    placeholder="选择标签"
                    clearable
                    class="tag-select"
                    @change="handleTagChange"
                >
                    <el-option
                        v-for="tag in tags"
                        :key="tag.value"
                        :label="tag.label"
                        :value="tag.value"
                    />
                </el-select>
            </div>
        </div>

        <div class="article-center-content">
            <!-- 搜索结果页面 -->
            <search-results
                v-if="isSearchMode"
                :articles="searchResults"
                :query="searchQuery"
                :category="selectedCategory"
                :tag="selectedTag"
                @select-article="openArticle"
                @clear-category="selectedCategory = ''"
                @clear-tag="selectedTag = ''"
                @clear-filters="resetFilters"
            />
            
            <!-- 默认文章列表页面 -->
            <div v-else class="article-list">
                <div class="article-tabs">
                    <el-tabs v-model="activeTab" class="demo-tabs" @tab-change="handleTabChange">
                        <el-tab-pane label="推荐" name="recommended">
                            <template v-for="article in recommendedArticles" :key="article.articleId">
                                <div class="article-card" @click="openArticle(article)">
                                    <div class="article-main">
                                        <div class="article-info">
                                            <h3 class="article-title">{{ article.title }}</h3>
                                            <p class="article-summary">{{ article.articleDesc }}</p>
                                            <div class="article-meta">
                                                <span class="article-author">{{ article.authorName }}</span>
                                                <span class="article-date">{{ formatDate(article.publishTime) }}</span>
                                                <span class="article-views">
                                                    <el-icon><View /></el-icon>
                                                    {{ article.viewCount }}
                                                </span>
                                                <div class="article-tags">
                                                    <span v-for="tag in article.articleLabel?.split(',')" :key="tag" class="article-tag">
                                                        {{ tag }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="article-cover" v-if="article.coverImg">
                                            <img 
                                                :src="article.coverImg" 
                                                :alt="article.title"
                                                @error="handleImageError"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <!-- 加载状态 -->
                            <div v-if="loading" class="loading-more">
                                <el-icon class="is-loading"><Loading /></el-icon>
                                加载中...
                            </div>
                            <!-- 无更多数据提示 -->
                            <div v-if="!hasMore && recommendedArticles.length > 0" class="no-more">
                                没有更多文章了
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="最新" name="latest">
                            <template v-for="article in latestArticles" :key="article.articleId">
                                <div class="article-card" @click="openArticle(article)">
                                    <div class="article-main">
                                        <div class="article-info">
                                            <h3 class="article-title">{{ article.title }}</h3>
                                            <p class="article-summary">{{ article.articleDesc }}</p>
                                            <div class="article-meta">
                                                <span class="article-author">{{ article.authorName }}</span>
                                                <span class="article-date">{{ formatDate(article.publishTime) }}</span>
                                                <span class="article-views">
                                                    <el-icon><View /></el-icon>
                                                    {{ article.viewCount }}
                                                </span>
                                                <div class="article-tags">
                                                    <span v-for="tag in article.articleLabel?.split(',')" :key="tag" class="article-tag">
                                                        {{ tag }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="article-cover" v-if="article.coverImg">
                                            <img 
                                                :src="article.coverImg" 
                                                :alt="article.title"
                                                @error="handleImageError"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <!-- 加载状态 -->
                            <div v-if="latestLoading" class="loading-more">
                                <el-icon class="is-loading"><Loading /></el-icon>
                                加载中...
                            </div>
                            <!-- 无更多数据提示 -->
                            <div v-if="!latestHasMore && latestArticles.length > 0" class="no-more">
                                没有更多文章了
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Search, View, Loading } from '@element-plus/icons-vue';
import SearchResults from './components/SearchResults.vue';
import type { Article } from '@/types/article';
import { ElMessage } from 'element-plus';
import axios from '../../api'
import { throttle } from 'lodash-es';

const router = useRouter();

// 格式化日期函数
const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 搜索相关的响应式状态
const searchQuery = ref(''); // 搜索关键词
const selectedCategory = ref(''); // 选中的分类
const selectedTag = ref(''); // 选中的标签
const activeTab = ref('recommended'); // 当前激活的标签页
const isSearchMode = ref(false); // 是否处于搜索模式

// 推荐文章相关状态
const recommendedArticles = ref<Article[]>([]);
const currentPage = ref(1);
const pageSize = ref(5); // 与后端默认值保持一致
const loading = ref(false);
const hasMore = ref(true);

// 最新文章相关状态
const latestArticles = ref<Article[]>([]);
const latestCurrentPage = ref(1);
const latestLoading = ref(false);
const latestHasMore = ref(true);

// 搜索结果计算属性：根据搜索条件过滤文章
const searchResults = computed(() => {
    // 合并推荐文章和最新文章作为搜索源
    let result = [...recommendedArticles.value];
    // 根据搜索关键词过滤
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(article => 
            article.title.toLowerCase().includes(query) || // 匹配标题
            article.articleDesc.toLowerCase().includes(query) || // 匹配摘要
            article.articleLabel.split(',').some(tag => tag.toLowerCase().includes(query)) // 匹配标签
        );
    }
    // 根据选中的分类过滤
    if (selectedCategory.value) {
        result = result.filter(article => 
            article.articleType.toLowerCase() === selectedCategory.value.toLowerCase()
        );
    }
    // 根据选中的标签过滤
    if (selectedTag.value) {
        result = result.filter(article => 
            article.articleLabel.split(',').some(tag => tag.toLowerCase() === selectedTag.value.toLowerCase())
        );
    }
    return result;
});

// 更新分类列表
const categories = [
    { value: 'frontend', label: '前端' },
    { value: 'backend', label: '后端' },
    { value: 'life', label: '生活' },
    { value: 'news', label: '资讯' }
];

// 更新标签列表
const tags = [
    { value: 'vue', label: 'Vue' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'css', label: 'CSS' },
    { value: 'life', label: '生活' },
    { value: 'career', label: '职场' },
    { value: 'ai', label: 'AI' },
    { value: 'tools', label: '工具' }
];

// 处理搜索按钮点击事件
const handleSearch = () => {
    // 当有搜索关键词、选中分类或标签时，进入搜索模式
    if (searchQuery.value || selectedCategory.value || selectedTag.value) {
        isSearchMode.value = true;
    }
};

// 处理分类选择变化事件
const handleCategoryChange = () => {
    // 当选中分类时，进入搜索模式
    if (selectedCategory.value) {
        isSearchMode.value = true;
    }
};

// 处理标签选择变化事件
const handleTagChange = () => {
    // 当选中标签时，进入搜索模式
    if (selectedTag.value) {
        isSearchMode.value = true;
    }
};

const openArticle = (article: Article) => {
    router.push(`/article/${article.articleId}`);
};

// 默认图片处理
const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgZmlsbD0iI2Y1ZjdmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTA5Mzk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjwvc3ZnPg==';

const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.src = defaultImage;
};

// 重置所有筛选条件
const resetFilters = () => {
    searchQuery.value = ''; // 清空搜索关键词
    selectedCategory.value = ''; // 清空选中的分类
    selectedTag.value = ''; // 清空选中的标签
    isSearchMode.value = false; // 退出搜索模式
};

// 监听滚动事件
const handleScroll = () => {
    // 获取滚动容器的信息
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const distance = scrollHeight - scrollTop - clientHeight;

    console.log('Scroll Event:', {
        scrollTop,
        scrollHeight,
        clientHeight,
        distance,
        activeTab: activeTab.value,
        loading: loading.value,
        hasMore: hasMore.value,
        latestLoading: latestLoading.value,
        latestHasMore: latestHasMore.value
    });

    // 当滚动到底部时立即加载更多
    if (distance <= 200) { // 提前200px触发加载
        console.log('Should trigger load more');
        
        if (activeTab.value === 'recommended' && !loading.value && hasMore.value) {
            console.log('Loading more recommended articles');
            fetchRecommendedArticles(true);
        } else if (activeTab.value === 'latest' && !latestLoading.value && latestHasMore.value) {
            console.log('Loading more latest articles');
            fetchLatestArticles(true);
        } else {
            console.log('Load more conditions not met:', {
                activeTab: activeTab.value,
                loading: loading.value,
                hasMore: hasMore.value,
                latestLoading: latestLoading.value,
                latestHasMore: latestHasMore.value
            });
        }
    }
};

// 获取推荐文章数据
const fetchRecommendedArticles = async (isLoadMore = false) => {
    if (loading.value || !hasMore.value) {
        console.log('Cannot load more recommended articles:', {
            loading: loading.value,
            hasMore: hasMore.value
        });
        return;
    }
    
    try {
        loading.value = true;
        console.log('Fetching recommended articles:', {
            page: currentPage.value,
            pageSize: pageSize.value,
            isLoadMore
        });

        const response = await axios.get('/getRecommendedArticles', {
            params: {
                page: currentPage.value,
                pageSize: pageSize.value
            }
        });

        if (response.data.code === '8000') {
            const { list } = response.data.data;
            console.log('Received recommended articles:', {
                count: list.length,
                isLoadMore
            });
            
            if (isLoadMore) {
                recommendedArticles.value = [...recommendedArticles.value, ...list];
            } else {
                recommendedArticles.value = list;
                currentPage.value = 1;
            }
            
            hasMore.value = list.length === pageSize.value;
            if (hasMore.value) {
                currentPage.value++;
            }

            console.log('Updated recommended articles state:', {
                totalArticles: recommendedArticles.value.length,
                hasMore: hasMore.value,
                currentPage: currentPage.value
            });
        } else {
            ElMessage.error(response.data.msg || '获取推荐文章失败');
        }
    } catch (error) {
        console.error('获取推荐文章失败:', error);
        ElMessage.error('获取推荐文章失败');
    } finally {
        loading.value = false;
    }
};

// 获取最新文章数据
const fetchLatestArticles = async (isLoadMore = false) => {
    if (latestLoading.value || !latestHasMore.value) {
        console.log('Cannot load more latest articles:', {
            loading: latestLoading.value,
            hasMore: latestHasMore.value
        });
        return;
    }
    
    try {
        latestLoading.value = true;
        console.log('Fetching latest articles:', {
            page: latestCurrentPage.value,
            pageSize: pageSize.value,
            isLoadMore
        });

        const response = await axios.get('/getLatestArticles', {
            params: {
                page: latestCurrentPage.value,
                pageSize: pageSize.value
            }
        });

        if (response.data.code === '8000') {
            const { list } = response.data.data;
            console.log('Received latest articles:', {
                count: list.length,
                isLoadMore
            });
            
            if (isLoadMore) {
                latestArticles.value = [...latestArticles.value, ...list];
            } else {
                latestArticles.value = list;
                latestCurrentPage.value = 1;
            }
            
            latestHasMore.value = list.length === pageSize.value;
            if (latestHasMore.value) {
                latestCurrentPage.value++;
            }

            console.log('Updated latest articles state:', {
                totalArticles: latestArticles.value.length,
                hasMore: latestHasMore.value,
                currentPage: latestCurrentPage.value
            });
        } else {
            ElMessage.error(response.data.msg || '获取最新文章失败');
        }
    } catch (error) {
        console.error('获取最新文章失败:', error);
        ElMessage.error('获取最新文章失败');
    } finally {
        latestLoading.value = false;
    }
};

// 监听标签页切换
const handleTabChange = (tab: string) => {
    if (tab === 'latest') {
        if (latestArticles.value.length === 0) {
            fetchLatestArticles();
        }
    } else if (tab === 'recommended') {
        if (recommendedArticles.value.length === 0) {
            fetchRecommendedArticles();
        }
    }
};

// 组件挂载时添加滚动监听
onMounted(() => {
    console.log('Component mounted, initializing data');
    fetchRecommendedArticles();
    window.addEventListener('scroll', handleScroll);
    console.log('Scroll event listener added');
});

// 组件卸载时移除滚动监听
onUnmounted(() => {
    console.log('Component unmounting, removing scroll listener');
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
.article-center {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin-top: 0;
    background-color: #f5f7fa;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;

    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4rem;
        background: linear-gradient(to right, #409EFF, #66b1ff);
        z-index: 10;
    }

    .article-center-header {
        flex-shrink: 0;
        padding: 1rem 2.5rem;
        background-color: #fff;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        z-index: 1;
        position: sticky;
        top: 4rem;
        border-bottom: 1px solid #ebeef5;
        width: 100%;
        box-sizing: border-box;
        
        .search-container {
            display: flex;
            gap: 1.5rem;
            align-items: center;
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
            flex-wrap: wrap;
            box-sizing: border-box;

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: stretch;
                gap: 1rem;
            }

            .search-input {
                flex: 1;
                min-width: 300px;
                max-width: 500px;

                @media (max-width: 768px) {
                    min-width: 100%;
                    max-width: 100%;
                }

                :deep(.el-input__wrapper) {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                    border-right: none;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid #dcdfe6;
                    padding: 0.5rem 1rem;

                    &:hover {
                        border-color: #c0c4cc;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    }

                    &:focus-within {
                        border-color: #409EFF;
                        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
                    }
                }

                :deep(.el-input-group__append) {
                    padding: 0;
                    background: linear-gradient(135deg, #409EFF, #66b1ff);
                    border: none;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
                    
                    .el-button {
                        margin: 0;
                        border: none;
                        min-height: 40px;
                        height: 100%;
                        color: white;
                        padding: 0 1.75rem;
                        font-weight: 500;
                        font-size: 0.95rem;
                        letter-spacing: 0.5px;
                        background: transparent;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        
                        &:hover {
                            background: rgba(255, 255, 255, 0.1);
                            transform: translateY(-1px);
                            box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
                        }
                        
                        &:active {
                            transform: translateY(0);
                            box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);
                        }

                        .el-icon {
                            font-size: 1.1rem;
                        }
                    }
                }
            }

            .category-select,
            .tag-select {
                width: 180px;

                @media (max-width: 768px) {
                    width: 100%;
                }

                :deep(.el-input__wrapper) {
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid #dcdfe6;
                    padding: 0.5rem 1rem;

                    &:hover {
                        border-color: #c0c4cc;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    }

                    &:focus-within {
                        border-color: #409EFF;
                        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
                    }
                }
            }
        }
    }

    .article-center-content {
        flex: 1;
        padding: 0 2.5rem 2.5rem;
        background-color: #f5f7fa;
        position: relative;
        z-index: 0;
        width: 100%;
        box-sizing: border-box;
        min-height: calc(100vh - 8rem); // 减去头部和搜索栏的高度

        .article-list {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
            padding-top: 1rem;
            box-sizing: border-box;
            min-height: 100%; // 确保内容区域至少占满剩余空间

            .article-tabs {
                :deep(.el-tabs__header) {
                    margin-bottom: 2rem;
                    position: sticky;
                    top: 8.5rem;
                    background-color: #f5f7fa;
                    z-index: 1;
                    padding: 1rem 0;
                    width: 100%;
                }

                :deep(.el-tabs__content) {
                    min-height: 200px; // 确保内容区域有最小高度
                }
            }

            .article-card {
                background: #fff;
                border-radius: 8px;
                padding: 1.5rem;
                margin-bottom: 1rem;
                border: 1px solid #ebeef5;
                transition: all 0.3s ease;
                cursor: pointer;
                width: 100%;
                max-width: 1400px;
                margin-left: auto;
                margin-right: auto;
                box-sizing: border-box;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .article-main {
                    display: flex;
                    gap: 1.5rem;

                    .article-info {
                        flex: 1;
                        min-width: 0;

                        .article-title {
                            font-size: 1.125rem;
                            font-weight: 500;
                            color: #1a1a1a;
                            margin: 0 0 0.75rem;
                            line-height: 1.4;

                            &:hover {
                                color: #409EFF;
                            }
                        }

                        .article-summary {
                            font-size: 0.875rem;
                            color: #666;
                            margin: 0 0 1rem;
                            line-height: 1.6;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }

                        .article-meta {
                            display: flex;
                            align-items: center;
                            gap: 1rem;
                            font-size: 0.8125rem;
                            color: #8590a6;
                            flex-wrap: wrap;

                            .article-views {
                                display: flex;
                                align-items: center;
                                gap: 0.25rem;
                            }

                            .article-tags {
                                margin-left: auto;
                                display: flex;
                                gap: 0.5rem;

                                .article-tag {
                                    color: #8590a6;
                                    padding: 0 0.5rem;
                                    height: 1.5rem;
                                    line-height: 1.5rem;
                                    background: #f7f8fa;
                                    border-radius: 3px;
                                }
                            }
                        }
                    }

                    .article-cover {
                        width: 120px;
                        height: 80px;
                        border-radius: 4px;
                        overflow: hidden;
                        flex-shrink: 0;
                        background-color: #f5f7fa;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
            }

            .loading-more,
            .no-more {
                text-align: center;
                padding: 1rem 0;
                color: #909399;
                font-size: 0.875rem;
                margin-top: 1rem;
                
                .el-icon {
                    margin-right: 0.5rem;
                }
            }
        }
    }
}
</style> 