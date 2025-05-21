<template>
    <div class="ArticleCard" @click="handleCardClick">
        <div class="ArticleCard_cover" v-if="props.hasCover">
            <el-image style="width: 100%; height: 100%" :src="props.cover" fit="cover" loading="lazy">
                <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </div>
        <div class="ArticleCard_content" :class="{ 'no-cover': !props.hasCover }">
            <div class="ArticleCard_content_header">
                <div class="ArticleCard_content_title">
                    <span class="title-text">{{ props.title }}</span>
                    <el-tag :type="getStatusType(props.status)" size="small" class="status-tag">
                        {{ getStatusText(props.status) }}
                    </el-tag>
                </div>
                <div class="ArticleCard_content_meta">
                    <div class="meta_item">
                        <el-icon><Calendar /></el-icon>
                        <span>{{ formatDate(props.createTime) }}</span>
                    </div>
                    <div class="meta_item">
                        <el-icon><View /></el-icon>
                        <span>{{ props.views }} 阅读</span>
                    </div>
                    <div class="meta_item">
                        <el-icon><ChatDotRound /></el-icon>
                        <span>{{ props.comments }} 评论</span>
                    </div>
                </div>
            </div>
            <div class="ArticleCard_content_text">{{ props.summary }}</div>
            <div class="ArticleCard_content_footer">
                <div class="footer_left">
                    <div class="footer_item">
                        <el-icon><Collection /></el-icon>
                        <span>{{ props.category }}</span>
                    </div>
                    <div class="footer_item">
                        <el-icon><PriceTag /></el-icon>
                        <span>{{ props.tags.join('、') }}</span>
                    </div>
                </div>
                <div class="footer_right">
                    <el-button-group>
                        <el-button size="large" type="primary" @click="handleEdit">
                            <el-icon><Edit /></el-icon>
                        </el-button>
                        <el-button size="large" type="danger" @click="handleDelete">
                            <el-icon><Delete /></el-icon>
                        </el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Calendar, View, ChatDotRound, Collection, PriceTag, Edit, Delete, Check } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
    id: String,
    cover: String,
    title: String,
    summary: String,
    content: String,
    createTime: String,
    updateTime: String,
    views: Number,
    comments: Number,
    category: String,
    tags: {
        type: Array as () => string[],
        default: () => []
    },
    hasCover: {
        type: Boolean,
        default: true
    },
    status: {
        type: String as () => 'published' | 'draft' | 'pending' | 'rejected',
        default: 'published'
    }
})

const emit = defineEmits(['edit', 'delete', 'preview', 'review', 'click'])

const formatDate = (date: string | undefined) => {
    if (!date) return '未知时间'
    return new Date(date).toLocaleDateString()
}

const getPreviewContent = (content: string) => {
    return content.length > 200 ? content.slice(0, 200) + '...' : content
}

const getStatusType = (status: string) => {
    const statusMap: Record<string, string> = {
        published: 'success',
        draft: 'info',
        pending: 'warning',
        rejected: 'danger'
    }
    return statusMap[status] || 'info'
}

const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
        published: '已发布',
        draft: '草稿',
        pending: '待审核',
        rejected: '已拒绝'
    }
    return statusMap[status] || '未知'
}

const handleEdit = (event: Event) => {
    event.stopPropagation()
    emit('edit', props)
}

const handlePreview = () => {
    emit('preview', props)
}

const handleReview = () => {
    emit('review', props)
}

const handleDelete = (event: Event) => {
    event.stopPropagation()
    ElMessageBox.confirm(
        '确定要删除这篇文章吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        emit('delete', props)
    })
}

const handleCardClick = () => {
    emit('click', props.id)
}
</script>

<style lang="less" scoped>
.ArticleCard {
    width: 95%;
    height: 14rem;
    margin: auto;
    border-radius: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    background-color: #ffffff;
    cursor: pointer;
    border: 1px solid rgba(14, 165, 233, 0.1);

    .ArticleCard_cover {
        width: 18%;
        height: 100%;
        position: relative;
        overflow: hidden;
        flex-shrink: 0;
        min-width: 100px;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to right, rgba(0,0,0,0.1), transparent);
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .el-image {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
        }

        &:hover .el-image {
            transform: scale(1.05);
        }
    }

    .ArticleCard_content {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1.2rem;
        min-width: 0;
        background: #ffffff;
        position: relative;
        transition: background-color 0.3s ease;

        .ArticleCard_content_header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.6rem;
            min-height: 3rem;

            .ArticleCard_content_title {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                min-height: 1.8rem;
                flex: 1;
                margin-right: 0.8rem;

                .title-text {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #0369a1;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .status-tag {
                    font-size: 0.8rem;
                    padding: 0.2rem 0.4rem;
                    flex-shrink: 0;
                }
            }
        }

        .ArticleCard_content_meta {
            display: flex;
            gap: 0.8rem;
            color: #64748b;
            font-size: 0.9rem;
            margin-bottom: 0.6rem;
            flex-wrap: wrap;

            .meta_item {
                display: flex;
                align-items: center;
                gap: 0.3rem;
                transition: all 0.3s ease;
                padding: 0.3rem 0.6rem;
                border-radius: 0.4rem;
                background: rgba(14, 165, 233, 0.1);
                color: #0ea5e9;
                flex-shrink: 0;

                &:hover {
                    color: #ffffff;
                    background: #0ea5e9;
                    transform: translateY(-2px);
                }
            }
        }

        .ArticleCard_content_text {
            flex: 1;
            margin: 0.6rem 0;
            font-size: 0.95rem;
            line-height: 1.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            color: #475569;
            transition: color 0.3s ease;
            min-height: 4.8rem;
            max-height: 4.8rem;
        }

        .ArticleCard_content_footer {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0.6rem 0;
            color: #64748b;
            border-top: 1px solid rgba(14, 165, 233, 0.1);
            margin-top: auto;
            min-height: 2.5rem;

            .footer_left {
                display: flex;
                gap: 0.6rem;
                flex-wrap: wrap;
                flex: 1;
                min-width: 0;

                .footer_item {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 0.3rem 0.6rem;
                    border-radius: 0.4rem;
                    background: rgba(14, 165, 233, 0.1);
                    color: #0ea5e9;
                    font-size: 0.9rem;
                    flex-shrink: 0;

                    &:hover {
                        color: #ffffff;
                        background: #0ea5e9;
                        transform: translateY(-2px);
                    }
                }
            }

            .footer_right {
                .el-button-group {
                    display: flex;
                    gap: 0.6rem;
                    margin-left: 0.8rem;

                    .el-button {
                        padding: 0.6rem 1rem;
                        border-radius: 0.5rem;
                        font-size: 1rem;
                        font-weight: 600;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        border: none;
                        min-width: 3rem;
                        height: 3rem;

                        .el-icon {
                            font-size: 1.4rem;
                        }

                        &.el-button--primary {
                            background: linear-gradient(135deg, #0ea5e9, #0369a1);
                            color: white;
                            
                            &:hover {
                                background: linear-gradient(135deg, #0369a1, #0ea5e9);
                                transform: translateY(-2px);
                                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
                            }
                        }

                        &.el-button--danger {
                            background: linear-gradient(135deg, #ef4444, #dc2626);
                            color: white;
                            
                            &:hover {
                                background: linear-gradient(135deg, #dc2626, #ef4444);
                                transform: translateY(-2px);
                                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                            }
                        }

                        &:active {
                            transform: translateY(0);
                            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                        }
                    }
                }
            }
        }

        &.no-cover {
            width: 100%;
        }
    }
}

.ArticleCard:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
    border-color: rgba(14, 165, 233, 0.2);
    
    .ArticleCard_content {
        background-color: #f8fafc;
    }
}

// 响应式设计
@media screen and (max-width: 768px) {
    .ArticleCard {
        height: auto;
        flex-direction: column;

        .ArticleCard_cover {
            width: 100%;
            height: 5rem;
            min-width: auto;
        }

        .ArticleCard_content {
            padding: 1rem;

            .ArticleCard_content_header {
                .ArticleCard_content_title {
                    .title-text {
                        font-size: 1.1rem;
                    }
                }
            }

            .ArticleCard_content_meta {
                gap: 0.3rem;
                font-size: 0.8rem;
            }

            .ArticleCard_content_text {
                font-size: 0.9rem;
                line-height: 1.5rem;
                min-height: 4.5rem;
                max-height: 4.5rem;
            }

            .ArticleCard_content_footer {
                .footer_left {
                    gap: 0.3rem;
                    
                    .footer_item {
                        font-size: 0.8rem;
                    }
                }

                .footer_right {
                    .el-button-group {
                        .el-button {
                            padding: 0.5rem 0.8rem;
                            min-width: 2.5rem;
                            height: 2.5rem;
                            
                            .el-icon {
                                font-size: 1.2rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style> 