<template>
    <div class="search-results">
        <div class="search-header">
            <div class="header-top">
                <el-button 
                    class="back-button" 
                    @click="$emit('clear-filters')"
                    type="default"
                    :icon="ArrowLeft"
                >
                    返回推荐
                </el-button>
                <div class="search-info">
                    <span class="result-count">找到 {{ articles.length }} 个结果</span>
                    <span class="search-query" v-if="query">搜索："{{ query }}"</span>
                </div>
            </div>
            <div class="filter-tags" v-if="hasFilters">
                <el-tag 
                    v-if="category"
                    closable
                    @close="$emit('clear-category')"
                >
                    分类：{{ category }}
                </el-tag>
                <el-tag 
                    v-if="tag"
                    closable
                    @close="$emit('clear-tag')"
                >
                    标签：{{ tag }}
                </el-tag>
            </div>
            <div class="sort-options">
                <el-radio-group v-model="sortType" size="large">
                    <el-radio-button label="relevance">综合排序</el-radio-button>
                    <el-radio-button label="latest">最新</el-radio-button>
                    <el-radio-button label="hot">最热</el-radio-button>
                </el-radio-group>
            </div>
        </div>

        <div class="results-list">
            <div v-for="article in sortedArticles" :key="article.id" class="result-item">
                <div class="result-content" @click="$emit('select-article', article)">
                    <div class="result-main">
                        <h3 class="result-title">{{ article.title }}</h3>
                        <p class="result-summary">{{ article.summary }}</p>
                        <div class="result-meta">
                            <span class="result-author">{{ article.author }}</span>
                            <span class="result-date">{{ article.updateTime }}</span>
                            <span class="result-views">
                                <el-icon><View /></el-icon>
                                {{ article.viewCount }}
                            </span>
                            <div class="result-tags">
                                <span v-for="tag in article.tags" :key="tag" class="result-tag">
                                    {{ tag }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="result-cover" v-if="article.coverImage">
                        <img 
                            :src="article.coverImage" 
                            :alt="article.title"
                            @error="handleImageError"
                        >
                    </div>
                </div>
            </div>
        </div>

        <div v-if="articles.length === 0" class="no-results">
            <el-empty 
                :image-size="200"
                :description="noResultsText"
            >
                <el-button type="primary" @click="$emit('clear-filters')">清除筛选</el-button>
            </el-empty>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { View, ArrowLeft } from '@element-plus/icons-vue';
import type { Article } from '@/types/article';

const props = defineProps<{
    articles: Article[];
    query?: string;
    category?: string;
    tag?: string;
}>();

const emit = defineEmits<{
    (e: 'select-article', article: Article): void;
    (e: 'clear-category'): void;
    (e: 'clear-tag'): void;
    (e: 'clear-filters'): void;
}>();

const sortType = ref('relevance');

const hasFilters = computed(() => {
    return !!props.category || !!props.tag;
});

const sortedArticles = computed(() => {
    const articles = [...props.articles];
    
    switch (sortType.value) {
        case 'latest':
            // 按更新时间排序，最新的在前面
            return articles.sort((a, b) => 
                new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
            );
        case 'hot':
            // 按浏览量排序，最高的在前面
            return articles.sort((a, b) => b.viewCount - a.viewCount);
        case 'relevance':
        default:
            // 综合排序：结合更新时间和浏览量
            return articles.sort((a, b) => {
                const timeWeight = 0.6; // 时间权重
                const viewWeight = 0.4; // 浏览量权重
                
                const timeA = new Date(a.updateTime).getTime();
                const timeB = new Date(b.updateTime).getTime();
                const maxTime = Math.max(timeA, timeB);
                const minTime = Math.min(timeA, timeB);
                const timeRange = maxTime - minTime || 1;
                
                const maxViews = Math.max(a.viewCount, b.viewCount);
                const minViews = Math.min(a.viewCount, b.viewCount);
                const viewRange = maxViews - minViews || 1;
                
                // 归一化分数
                const timeScoreA = (timeA - minTime) / timeRange;
                const timeScoreB = (timeB - minTime) / timeRange;
                const viewScoreA = (a.viewCount - minViews) / viewRange;
                const viewScoreB = (b.viewCount - minViews) / viewRange;
                
                // 计算综合得分
                const scoreA = timeScoreA * timeWeight + viewScoreA * viewWeight;
                const scoreB = timeScoreB * timeWeight + viewScoreB * viewWeight;
                
                return scoreB - scoreA;
            });
    }
});

const noResultsText = computed(() => {
    if (props.query) {
        return `未找到与"${props.query}"相关的文章`;
    }
    if (hasFilters.value) {
        return '当前筛选条件下暂无相关文章';
    }
    return '暂无相关文章';
});

// 默认图片处理
const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgZmlsbD0iI2Y1ZjdmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTA5Mzk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjwvc3ZnPg==';

const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.src = defaultImage;
};
</script>

<style lang="less" scoped>
.search-results {
    padding: 2rem;

    .search-header {
        margin-bottom: 2rem;
        
        .header-top {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            gap: 1.5rem;

            .back-button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                border-radius: 8px;
                border: 1px solid #dcdfe6;
                color: #606266;
                transition: all 0.3s ease;

                &:hover {
                    color: #409EFF;
                    border-color: #409EFF;
                    background-color: rgba(64, 158, 255, 0.1);
                }

                :deep(.el-icon) {
                    font-size: 1rem;
                }
            }

            .search-info {
                .result-count {
                    font-size: 1.25rem;
                    font-weight: 500;
                    color: #1a1a1a;
                    margin-right: 1rem;
                }
                
                .search-query {
                    color: #606266;
                }
            }
        }
        
        .filter-tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            
            .el-tag {
                padding: 0 12px;
                height: 32px;
                line-height: 30px;
                border-radius: 16px;
            }
        }

        .sort-options {
            border-top: 1px solid #ebeef5;
            padding-top: 1rem;
            
            :deep(.el-radio-group) {
                .el-radio-button__inner {
                    border: none;
                    background: transparent;
                    color: #606266;
                    padding: 0.5rem 1.5rem;
                    font-size: 0.875rem;
                    
                    &:hover {
                        color: #409EFF;
                    }
                }
                
                .el-radio-button__original-radio:checked + .el-radio-button__inner {
                    background: transparent;
                    color: #409EFF;
                    font-weight: 500;
                    box-shadow: none;
                }
            }
        }
    }

    .results-list {
        .result-item {
            background: #fff;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border: 1px solid #ebeef5;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .result-content {
                display: flex;
                gap: 1.5rem;
                cursor: pointer;

                .result-main {
                    flex: 1;
                    min-width: 0;

                    .result-title {
                        font-size: 1.125rem;
                        font-weight: 500;
                        color: #1a1a1a;
                        margin: 0 0 0.75rem;
                        line-height: 1.4;

                        &:hover {
                            color: #409EFF;
                        }
                    }

                    .result-summary {
                        font-size: 0.875rem;
                        color: #666;
                        margin: 0 0 1rem;
                        line-height: 1.6;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .result-meta {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        font-size: 0.8125rem;
                        color: #8590a6;
                        flex-wrap: wrap;

                        .result-views {
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                        }

                        .result-tags {
                            margin-left: auto;
                            display: flex;
                            gap: 0.5rem;

                            .result-tag {
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

                .result-cover {
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

    .no-results {
        padding: 4rem 0;
        text-align: center;
    }
}
</style> 