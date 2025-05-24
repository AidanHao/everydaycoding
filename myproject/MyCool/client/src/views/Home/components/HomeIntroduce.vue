<template>
    <div class="Introduce">
        <div class="Introduce_content">
            <div v-for="(data, index) in articleList" :key="data.articleId">
                <TextCard 
                    :id="String(data.articleId)"
                    :title="data.title" 
                    :content="data.articleDesc" 
                    :cover="data.coverImg" 
                    :left="index % 2 === 0"
                    :author="data.authorName"
                    :releaseDate="formatDate(data.publishTime)"
                    :thumbsUp="data.likeCount || 0"
                    :collection="data.commentCount || 0"
                    :hasCover="!!data.coverImg"
                ></TextCard>
            </div>
        </div>
        <DateTimeCard />
    </div>
</template>

<script setup lang="ts">
    import TextCard from '@/components/TextCard.vue';
    import DateTimeCard from '@/components/DateTimeCard.vue';
    import { ref, onMounted } from 'vue';
    import axios from '../../../api'

    interface Article {
        articleId: number;
        title: string;
        articleDesc: string;
        content: string;
        articleLabel: string;
        articleType: string;
        coverImg: string;
        publishTime: string;
        viewCount: number;
        commentCount: number;
        likeCount: number;
        authorName: string;
        authorAvatar: string;
        hotScore: number;
    }

    const articleList = ref<Article[]>([]);

    // 格式化日期
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };

    // 获取首页文章
    const getHomeArticles = async () => {
        try {
            console.log('开始获取首页文章...');
            const response = await axios.get('/getHomeArticles?page=1&pageSize=10');
            
            console.log('API响应:', response.data);
            
            if (response.data.code === '8000') {
                console.log('获取到的文章列表:', response.data.data.list);
                articleList.value = response.data.data.list;
            } else {
                console.error('获取首页文章失败:', response.data.msg);
            }
        } catch (error) {
            console.error('获取首页文章失败:', error);
        }
    };

    onMounted(() => {
        console.log('组件已挂载，开始获取文章...');
        getHomeArticles();
    });
</script>

<style lang="less" scoped>
    .Introduce {
        padding: 1.5rem;
        width: 95%;
        height: fit-content;
        margin: 1.5rem auto;
        border-radius: 0.8rem;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        box-shadow: 0 0 1.5rem rgba(14, 165, 233, 0.05);
        transition: all 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        &:hover {
            box-shadow: 0 0 2rem rgba(14, 165, 233, 0.08);
        }

        .Introduce_content {
            flex: 1;
            margin-right: 1.5rem;

            > div {
                margin-bottom: 2rem;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .Introduce {
            padding: 1rem;
            width: 98%;
            margin: 1rem auto;

            .Introduce_content {
                margin-right: 1rem;

                > div {
                    margin-bottom: 1.5rem;
                }
            }
        }
    }
</style>