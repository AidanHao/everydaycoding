<template>
    <div>
        <van-notice-bar
        left-icon="volume-o"
        text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。 "
        />
        <van-notice-bar left-icon="volume-o" :scrollable="false">
            <van-swipe
                vertical
                class="notice-swipe"
                :autoplay="3000"
                :touchable="false"
                :show-indicators="false"
            >
                <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
                <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
                <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
            </van-swipe>
            </van-notice-bar>
        <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            input-align="center"
            />
            <van-signature  @submit="onSubmit" @clear="onClear" />
<van-image v-if="image" :src="image" />


        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
            <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
            <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
            <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
        </van-action-bar>

      

    </div>
</template>

<script setup>
// import axios from 'axios';
import {onMounted} from 'vue'
import {home} from '../api/user.js'

onMounted(()=>{
    // axios.get('/home')
    home()
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
})
</script>

<style lang="css" scoped>
 .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>