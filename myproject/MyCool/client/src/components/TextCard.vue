<template>
    <div class="TextCard" @click="goToArticle">
        <div class="TextCard_cover" v-if="props.left && props.hasCover">
            <el-image style="width: 100%; height: 100%" :src="props.cover" fit="cover" loading="lazy">
                <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </div>
        <div class="TextCard_content" :class="{ 'no-cover': !props.hasCover }">
            <div class="TextCard_content_header">
                <div class="TextCard_content_title">
                    {{ props.title }}
                </div>
                <div class="TextCard_content_meta">
                    <div class="meta_item">
                        <el-icon><User /></el-icon>
                        <span>{{ props.author || '匿名作者' }}</span>
                    </div>
                    <div class="meta_item">
                        <el-icon><Calendar /></el-icon>
                        <span>{{ props.releaseDate }}</span>
                    </div>
                </div>
            </div>
            <div class="TextCard_content_text">{{props.content}}</div>
            <div class="TextCard_content_footer">
                <div class="footer_item">
                    <el-icon><Star /></el-icon>
                    <span>{{ props.thumbsUp || 0 }}</span>
                </div>
                <div class="footer_item">
                    <el-icon><Collection /></el-icon>
                    <span>{{ props.collection || 0 }}</span>
                </div>
            </div>
        </div>
        <div class="TextCard_cover" v-if="!props.left && props.hasCover">
            <el-image style="width: 100%; height: 100%" :src="props.cover" fit="cover" loading="lazy">
                <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, Calendar, Star, Collection } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    cover: String,
    title: String,
    content: String,
    left: Boolean,
    author: String,
    releaseDate: String,
    thumbsUp: Number,
    collection: Number,
    hasCover: {
        type: Boolean,
        default: true
    },
    id: {
        type: String,
        default: '1'
    }
});

const goToArticle = () => {
    router.push({
        path: `/article/${props.id}`,
        query: { _t: Date.now() }
    })
}
</script>

<style lang="less" scoped>
.TextCard {
    width: 90%;
    height: 18rem;
    margin: auto;
    border-radius: 1rem;
    margin-top: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    background-color: #f0f9ff;
    cursor: pointer;

    .TextCard_cover {
        width: 35%;
        height: 100%;
        position: relative;
        overflow: hidden;
        flex-shrink: 0;

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
            transform: scale(1.1);
        }
    }

    .TextCard_content {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        min-width: 0;
        background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);

        .TextCard_content_header {
            .TextCard_content_title {
                color: #0369a1;
                font-size: 1.8rem;
                width: 100%;
                text-align: center;
                font-weight: 600;
                margin-bottom: 1rem;
                transition: color 0.3s ease;
                position: relative;
                padding-bottom: 0.5rem;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 3rem;
                    height: 3px;
                    background: linear-gradient(to right, transparent, #0ea5e9, transparent);
                    transition: width 0.3s ease;
                }
            }

            .TextCard_content_meta {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                color: #64748b;
                font-size: 0.9rem;
                margin-bottom: 1rem;

                .meta_item {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: all 0.3s ease;
                    padding: 0.3rem 0.8rem;
                    border-radius: 1rem;
                    background: rgba(14, 165, 233, 0.1);
                    color: #0ea5e9;

                    &:hover {
                        color: #ffffff;
                        background: #0ea5e9;
                        transform: translateY(-2px);
                    }
                }
            }
        }

        .TextCard_content_text {
            flex: 1;
            margin: 1rem 0;
            font-size: 1rem;
            line-height: 1.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            color: #475569;
            transition: color 0.3s ease;
            padding: 0 1rem;
        }

        .TextCard_content_footer {
            display: flex;
            justify-content: flex-end;
            gap: 1.5rem;
            padding: 1rem;
            color: #64748b;
            border-top: 1px solid rgba(14, 165, 233, 0.1);
            margin-top: auto;
            height: 3rem;

            .footer_item {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                background: rgba(14, 165, 233, 0.1);
                color: #0ea5e9;

                &:hover {
                    color: #ffffff;
                    background: #0ea5e9;
                    transform: translateY(-2px);
                }
            }
        }

        &.no-cover {
            width: 100%;
        }
    }
}

.TextCard:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.15);

    .TextCard_content_title::after {
        width: 6rem;
    }
}
</style>