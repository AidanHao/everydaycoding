<template>
    <div class="TextCard">
        <div class="TextCard_cover" v-if="props.left">
            <el-image style="width: 100%; height: 100%" :src="props.cover" fit="cover" loading="lazy">
                <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </div>
        <div class="TextCard_content">
            <div class="TextCard_content_title">
                {{ props.title }}
                <!-- <el-text class="mx-1" type="primary" size="large">Vue响应式原理</el-text> -->
            </div>
            <div class="TextCard_content_text">{{props.content}}</div>

        </div>
        <div class="TextCard_cover" v-if="!props.left">
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
const props = defineProps(['cover', 'title', 'content', 'left']);

</script>

<style lang="less" scoped>
.TextCard {
    width: 90%;
    height: 15rem;
    margin: auto;
    border-radius: 0.5rem;
    margin-top: 2rem;
    box-shadow: 0 0 5px rgb(41, 41, 41);
    display: flex;
    overflow: hidden;
    transition: all 0.5s; //控制速度，也可不加
    position: relative;

    .TextCard_cover {
        width: 40%;
        height: 100%;
        border-radius: 0.5rem;

    }

    .TextCard_content {
        height: 100%;
        flex: 1;

        .TextCard_content_title {
            color: rgb(65, 223, 223);
            padding: 1rem;
            font-size: 1.5rem;
            width: 100%;
            text-align: center;
            font-weight: bolder;
            // text-decoration: underline;
        }

        .TextCard_content_text {
            margin: 1rem;
            font-size: 1rem;
            line-height: 1.5rem;
            //多行文本用省略号
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box; //多行文本用省略号
            -webkit-line-clamp: 4; //显示的行数
            -webkit-box-orient: vertical;
        }
    }
}

.TextCard:hover {
    transform: scale(1.025); //放大倍数
}
</style>