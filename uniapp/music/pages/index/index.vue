<template>
	
	<view class="index">
		<wyheader>
			<!-- 将内容填充到名为content的插槽当中 -->
			<template v-slot:content>
				<view class="search">
					<uni-search-bar @confirm="search" @input="input" placeholder="歌曲"></uni-search-bar>
				</view>
			</template>
		</wyheader>
		
		<!-- menu -->
		<menuLeft></menuLeft>
		
		<!-- banner 轮播图 -->
		<view class="banner">
			<!-- indicator-dots显示点  autoplay自动轮播  interval切换间隔时间  duration切换过程的时间  circular是否采用衔接滑动，即播放到末尾后重新回到开头 indicator-color指示点的颜色 indicator-active-color指示点选中的颜色 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" indicator-color="#eee" indicator-active-color="#d81e06" >
				<swiper-item v-for="item in state.banners" :key="item.encpdeId" class="swiper-item">
					<image :src="item.pic" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 首页图标入口列表balls -->
		<view class="balls">
			<view class="ball-item" v-for="item in state.balls" :key="item.id">
				<view class="icon">
					<image :src="item.iconUrl" mode="aspectFill"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- 专属推荐 -->
		<songList :List="state.recommendList" />
		
	</view>
</template>

<script setup>
	import wyheader from '../../components/wyheader/wyheader.vue'
	import {apiGetBanner,apiGetBall,apiGetRecommendList} from '../../api/index.js'
	import { onLoad } from '@dcloudio/uni-app'
	import { reactive, ref } from 'vue';
	const state = reactive({
		banners:[],
		balls:[],
		recommendList:[]
	})
	// 生命周期发送请求
	onLoad(()=>{
		 getBanner(),
		 getBall(),
		 getRecommendList()
		 
	})
	// 获取轮播图
	const getBanner = ()=>{
		apiGetBanner({type:2}).then(res=>{
			// console.log(res.data.banners);
			state.banners= res.data.banners
		})
	}
	// 获取首页入口图标列表
	const getBall = async() =>{
		const {data:{data:balls}} =  await apiGetBall()
		// console.log(balls);
		state.balls = balls
	}
	// 获取推荐歌单
	const getRecommendList = async()=>{
		const {data:{recommend:recommend}} = await apiGetRecommendList()
		console.log(recommend);
		state.recommendList = recommend
	}
</script>

<style lang="scss" scoped>
	.index{
		padding: 0 20rpx;
		box-sizing: border-box;
		.search{
			height: 60rpx;
			width: 540rpx;
			:deep(.uni-searchbar){
				height: 100%;
				padding: 0;
				.uni-searchbar__box{
					padding: 0;
					height: 100%;
				}
			}
		}
		.banner{
			.swiper-item{
				height: 100%;
				border-radius: 10px;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;

				}
			}
		}
		.balls{
			display: flex;
			overflow-x: scroll;
			margin: 30rpx 0;
			.ball-item{
				flex: 0 0 20%;
				font-size: 20rpx;
				// 控制我这个容器里面的文本居中，非块级
				text-align: center;
				.icon{
					width: 70rpx;
					height: 70rpx;
					// 让块级元素水平居中
					margin: 0 auto;
					margin-bottom: 14rpx;
					background-color: $uni-primary-color;
					border-radius: 50%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
.
<style>
	
</style>
