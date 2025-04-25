<template>
    <div class="ArticleCard">
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

const emit = defineEmits(['edit', 'delete', 'preview', 'review'])

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

const handleEdit = () => {
    emit('edit', props)
}

const handlePreview = () => {
    emit('preview', props)
}

const handleReview = () => {
    emit('review', props)
}

const handleDelete = () => {
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
</script>

<style lang="less" scoped>
.ArticleCard {
    width: 90%;
    height: 16rem;
    margin: auto;
    border-radius: 0.8rem;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    background-color: #ffffff;
    cursor: pointer;
    border: 1px solid rgba(14, 165, 233, 0.1);

    .ArticleCard_cover {
        width: 20%;
        height: 100%;
        position: relative;
        overflow: hidden;
        flex-shrink: 0;
        min-width: 120px;

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
        padding: 1.5rem;
        min-width: 0;
        background: #ffffff;
        position: relative;
        transition: background-color 0.3s ease;

        .ArticleCard_content_header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.8rem;
            min-height: 3.5rem;

            .ArticleCard_content_title {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                min-height: 2rem;
                flex: 1;
                margin-right: 1rem;

                .title-text {
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #0369a1;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .status-tag {
                    font-size: 0.9rem;
                    padding: 0.3rem 0.6rem;
                    flex-shrink: 0;
                }
            }

            .action-buttons {
                display: flex;
                gap: 1.2rem;
                flex-shrink: 0;
                margin-top: 0.2rem;

                .el-button {
                    padding: 1rem 2rem;
                    border-radius: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 5rem;
                    height: 5rem;
                    font-size: 1.6rem;
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                    .el-icon {
                        font-size: 2.4rem;
                    }

                    &.el-button--primary {
                        background: linear-gradient(135deg, #0ea5e9, #0369a1);
                        border: none;
                        color: white;
                    }

                    &.el-button--danger {
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        border: none;
                        color: white;
                    }

                    &:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                        
                        &.el-button--primary {
                            background: linear-gradient(135deg, #0369a1, #0ea5e9);
                        }
                        
                        &.el-button--danger {
                            background: linear-gradient(135deg, #dc2626, #ef4444);
                        }
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }

        .ArticleCard_content_meta {
            display: flex;
            gap: 1rem;
            color: #64748b;
            font-size: 1rem;
            margin-bottom: 0.8rem;
            flex-wrap: wrap;

            .meta_item {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                transition: all 0.3s ease;
                padding: 0.4rem 0.8rem;
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
            margin: 0.8rem 0;
            font-size: 1.1rem;
            line-height: 1.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            color: #475569;
            transition: color 0.3s ease;
            min-height: 5.4rem;
            max-height: 5.4rem;
        }

        .ArticleCard_content_footer {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0.8rem 0;
            color: #64748b;
            border-top: 1px solid rgba(14, 165, 233, 0.1);
            margin-top: auto;
            min-height: 3rem;

            .footer_left {
                display: flex;
                gap: 0.8rem;
                flex-wrap: wrap;
                flex: 1;
                min-width: 0;

                .footer_item {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 0.4rem 0.8rem;
                    border-radius: 0.4rem;
                    background: rgba(14, 165, 233, 0.1);
                    color: #0ea5e9;
                    font-size: 1rem;
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
                    gap: 0.8rem;
                    margin-left: 1rem;

                    .el-button {
                        padding: 0.8rem 1.2rem;
                        border-radius: 0.6rem;
                        font-size: 1.2rem;
                        font-weight: 600;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        border: none;
                        min-width: 3.5rem;
                        height: 3.5rem;

                        .el-icon {
                            font-size: 1.6rem;
                        }

                        &.el-button--primary {
                            background: linear-gradient(135deg, #0ea5e9, #0369a1);
                            color: white;
                            
                            &:hover {
                                background: linear-gradient(135deg, #0369a1, #0ea5e9);
                                transform: translateY(-3px);
                                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
                            }
                        }

                        &.el-button--danger {
                            background: linear-gradient(135deg, #ef4444, #dc2626);
                            color: white;
                            
                            &:hover {
                                background: linear-gradient(135deg, #dc2626, #ef4444);
                                transform: translateY(-3px);
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
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(14, 165, 233, 0.2);
    border-color: rgba(14, 165, 233, 0.3);
    
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
            height: 6rem;
            min-width: auto;
        }

        .ArticleCard_content {
            .ArticleCard_content_title {
                .title-text {
                    font-size: 1rem;
                }
            }

            .ArticleCard_content_meta {
                gap: 0.3rem;
            }

            .ArticleCard_content_footer {
                .footer_left {
                    gap: 0.3rem;
                }
            }
        }
    }
}
</style> 