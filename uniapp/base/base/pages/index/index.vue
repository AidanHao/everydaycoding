<template>
	<view class="content">
		<navigator url="/pages/about/about">去关于页面</navigator>
		<image class="logo" src="/static/logo.png" @click="goAbout"></image>
		
		<view class="text-area">
			<text class="title" @click="changeTitle">{{title}}</text>
			<text>{{ reverseTitle}}</text>
		</view>
		<view class="name">
			<text>{{name}}</text>
		</view>
		<song :data = 'list.song'/>
	</view>
</template>

<script setup>
	
import { computed, reactive, ref } from 'vue'
import song from '../../components/song.vue'

// 这个数据不是响应式的
const name = getApp().globalData.name

const title = ref('你好')

const changeTitle = ()=>{
	title.value = title.value==='你好'?'hello':'你好'
}
const reverseTitle = computed(()=>{
	return title.value.split('').reverse().join('')
})

const list = reactive({
	song:{
		img:'https://p.qqan.com/up/2020-11/16063720932682248.jpg',
		title:'美女头像',
		price:'20',
		marketPrice:'25'
	}
})

const goAbout = ()=>{
	uni.navigateTo({
		url:'/pages/about/about'
	})
}
</script>


<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
