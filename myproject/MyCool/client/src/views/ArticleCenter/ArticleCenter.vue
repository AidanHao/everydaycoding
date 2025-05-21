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
                    <el-tabs v-model="activeTab" class="demo-tabs">
                        <el-tab-pane label="推荐" name="recommended">
                            <template v-for="article in recommendedArticles" :key="article.id">
                                <div class="article-card" @click="openArticle(article)">
                                    <div class="article-main">
                                        <div class="article-info">
                                            <h3 class="article-title">{{ article.title }}</h3>
                                            <p class="article-summary">{{ article.summary }}</p>
                                            <div class="article-meta">
                                                <span class="article-author">{{ article.author }}</span>
                                                <span class="article-date">{{ article.updateTime }}</span>
                                                <span class="article-views">
                                                    <el-icon><View /></el-icon>
                                                    {{ article.viewCount }}
                                                </span>
                                                <div class="article-tags">
                                                    <span v-for="tag in article.tags" :key="tag" class="article-tag">
                                                        {{ tag }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="article-cover" v-if="article.coverImage">
                                            <img 
                                                :src="article.coverImage" 
                                                :alt="article.title"
                                                @error="handleImageError"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="最新" name="latest">
                            <template v-for="article in latestArticles" :key="article.id">
                                <div class="article-card" @click="openArticle(article)">
                                    <div class="article-main">
                                        <div class="article-info">
                                            <h3 class="article-title">{{ article.title }}</h3>
                                            <p class="article-summary">{{ article.summary }}</p>
                                            <div class="article-meta">
                                                <span class="article-author">{{ article.author }}</span>
                                                <span class="article-date">{{ article.updateTime }}</span>
                                                <span class="article-views">
                                                    <el-icon><View /></el-icon>
                                                    {{ article.viewCount }}
                                                </span>
                                                <div class="article-tags">
                                                    <span v-for="tag in article.tags" :key="tag" class="article-tag">
                                                        {{ tag }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="article-cover" v-if="article.coverImage">
                                            <img 
                                                :src="article.coverImage" 
                                                :alt="article.title"
                                                @error="handleImageError"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Search, View } from '@element-plus/icons-vue';
import SearchResults from './components/SearchResults.vue';
import type { Article } from '@/types/article';

const router = useRouter();
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedTag = ref('');
const activeTab = ref('recommended');
const isSearchMode = ref(false);

// 热门推荐文章数据
const recommendedArticles = [
    {
        id: 1,
        title: 'Cursor 最强竞争对手来了，专治复杂大项目，免费一个月',
        summary: 'Augment Agent 发布后，国内的白嫖体现在清一色都是上图的画风 😏 到处都是"再见 Cursor..."',
        author: '硅基新手村',
        category: '后端',
        tags: ['AI', 'Cursor', '工具'],
        updateTime: '2024-03-20 10:30',
        viewCount: 852,
        likes: 325,
        coverImage: 'https://picsum.photos/300/200?random=1'
    },
    {
        id: 2,
        title: '纯CSS实现Soul星球',
        summary: '起因 最近看到阿里云有朋友用three.js实现了一个soul星球效果，觉得很有意思，想用CSS复刻一下...',
        author: '苏武难飞',
        category: '前端',
        tags: ['CSS', 'HTML', '动画'],
        updateTime: '2024-03-19 15:45',
        viewCount: 6500,
        likes: 162,
        coverImage: 'https://picsum.photos/300/200?random=2'
    },
    {
        id: 3,
        title: '我很好奇客户会用得惯这个组件吗',
        summary: '我们是公司是搞内网安全的，会收集日常电脑操作行为数据，基于前期设置的预警策略，对收集的数据进行分析...',
        author: '岁月可贯',
        category: '前端',
        tags: ['Vue.js', 'JavaScript', '组件'],
        updateTime: '2024-03-18 09:20',
        viewCount: 15000,
        likes: 224,
        coverImage: 'https://picsum.photos/300/200?random=3'
    },
    {
        id: 4,
        title: '从零开始搭建一个企业级前端工程',
        summary: '本文将介绍如何从零开始搭建一个现代化的企业级前端工程，包括技术选型、架构设计、工程化配置等...',
        author: '技术探索者',
        category: '前端',
        tags: ['工程化', 'Vue3', 'TypeScript'],
        updateTime: '2024-03-17 16:10',
        viewCount: 12800,
        likes: 438,
        coverImage: 'https://picsum.photos/300/200?random=4'
    }
];

// 最新文章数据
const latestArticles = [
    {
        id: 101,
        title: '这只是一罐过期了七年的红牛......',
        summary: '临近假期，今天眼睛乱晃时，偶然在我的办公桌角落上发现一罐红牛，看到的那一瞬间，我...',
        author: '小流苏生',
        category: '生活',
        tags: ['随笔', '生活', '职场'],
        updateTime: '2024-03-21 09:15',
        viewCount: 580,
        likes: 10,
        coverImage: 'https://picsum.photos/300/200?random=5'
    },
    {
        id: 102,
        title: 'Vue3+TypeScript完整项目实战',
        summary: '本文将带领大家使用Vue3和TypeScript从零开始构建一个完整的项目，包含常见的功能实现和性能优化...',
        author: '前端达人',
        category: '前端',
        tags: ['Vue3', 'TypeScript', '实战'],
        updateTime: '2024-03-21 08:30',
        viewCount: 245,
        likes: 15,
        coverImage: 'https://picsum.photos/300/200?random=6'
    },
    {
        id: 103,
        title: '从一线回武汉的真实感受',
        summary: '从北京回武汉差不多六年了，感慨颇多，谈谈真实感受。1 IT 公司 我们先把 IT 公司做一个分类理理：从卖中来看...',
        author: '勇于Java实战',
        category: '生活',
        tags: ['经验分享', '职场', 'IT'],
        updateTime: '2024-03-21 07:45',
        viewCount: 8900,
        likes: 60,
        coverImage: 'https://picsum.photos/300/200?random=7'
    },
    {
        id: 104,
        title: '关于尤雨溪的新公司，你需要知道的',
        summary: '最近，Vue.js的作者尤雨溪宣布成立新公司，这对前端开发者来说是一个重要的消息...',
        author: '技术新知',
        category: '资讯',
        tags: ['Vue', '前端', '资讯'],
        updateTime: '2024-03-21 06:20',
        viewCount: 3200,
        likes: 128,
        coverImage: 'https://picsum.photos/300/200?random=8'
    }
];

// 搜索结果
const searchResults = computed(() => {
    let result = [...recommendedArticles, ...latestArticles];

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.summary.toLowerCase().includes(query) ||
            article.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    if (selectedCategory.value) {
        result = result.filter(article => 
            article.category.toLowerCase() === selectedCategory.value.toLowerCase()
        );
    }

    if (selectedTag.value) {
        result = result.filter(article => 
            article.tags.some(tag => tag.toLowerCase() === selectedTag.value.toLowerCase())
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

const handleSearch = () => {
    if (searchQuery.value || selectedCategory.value || selectedTag.value) {
        isSearchMode.value = true;
    }
};

const handleCategoryChange = () => {
    if (selectedCategory.value) {
        isSearchMode.value = true;
    }
};

const handleTagChange = () => {
    if (selectedTag.value) {
        isSearchMode.value = true;
    }
};

const openArticle = (article: Article) => {
    router.push(`/article/${article.id}`);
};

// 默认图片处理
const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgZmlsbD0iI2Y1ZjdmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTA5Mzk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjwvc3ZnPg==';

const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.src = defaultImage;
};

// 重置筛选条件
const resetFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = '';
    selectedTag.value = '';
    isSearchMode.value = false;
};
</script>

<style lang="less" scoped>
.article-center {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin-top: 4rem;
    background-color: #f5f7fa;
    position: relative;

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
        padding: 2rem 2.5rem;
        background-color: #fff;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        z-index: 1;
        position: sticky;
        top: 4rem;
        border-bottom: 1px solid #ebeef5;
        // margin-bottom: 1rem;
        
        .search-container {
            display: flex;
            gap: 1.5rem;
            align-items: center;
            max-width: 1400px;
            margin: 0 auto;
            flex-wrap: wrap;

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

        .article-list {
            max-width: 1400px;
            margin: 0 auto;
            padding-top: 1rem;

            .article-tabs {
                :deep(.el-tabs__header) {
                    margin-bottom: 2rem;
                    position: sticky;
                    top: 8rem;
                    background-color: #f5f7fa;
                    z-index: 1;
                    padding: 1rem 0;
                }

                :deep(.el-tabs__nav-wrap::after) {
                    height: 1px;
                    background-color: #ebeef5;
                }

                :deep(.el-tabs__active-bar) {
                    height: 2px;
                    border-radius: 1px;
                }

                :deep(.el-tabs__item) {
                    font-size: 1rem;
                    padding: 0 2rem;

                    &.is-active {
                        font-weight: 500;
                    }
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
        }
    }
}
</style> 