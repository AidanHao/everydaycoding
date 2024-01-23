<template>
	<view class="recommend-song">
		<view class="recommend-hd">
			<view class="title">
				推荐歌曲
			</view>
			<view class="more">
				<uni-icons type="more-filled" size="16"></uni-icons>
				
			</view>
		</view>
		<swiper class="swiper-wrap">
			<swiper-item v-for="(item , i) in swiperList" :key="i">
				<view class="swiper-item">
					<view class="song-item" v-for="(song,j) in item" :key="j">
						<view class="song-detail">
							<view class="pic">
								<image :src="song.al.picUrl" mode="aspectFill"></image>
							</view>
							<view class="desc">
								<view class="name"> {{song.al.name}} </view>
								<view class="author">
									<text class="reason" v-if="song.reason">{{song.reason}}</text>
									{{song.ar[0].name}}
								</view>
							</view>
						</view>
						<view class="mv" >
							<view class="mv iconfont icon-video1" v-if="song.videoInfo.video">
				
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
import { computed, onUpdated ,ref} from 'vue';
	const props = defineProps({
		List:Array
	})
	// const swiperList = computed(()=>{
	// 	const swiperList = []
	// 	const arr = []
	// 	props.List.forEach((item,i)=>{
	// 		if(arr.length === 3)
	// 		{
	// 			swiperList.push(arr)
	// 			arr = []
	// 		}
	// 		arr.push(item)
	// 	})
	// 	return swiperList
	// })
	const swiperList = ref([])
	onUpdated(()=>{
		let arr = []
		props.List.forEach((item,i)=>{
			if(arr.length === 3)
			{
				swiperList.value.push(arr)
				arr = []
			}
			arr.push(item)
		})
		// console.log(swiperList.value);
	})
	
	
	
	
</script>

<style lang="scss" scoped>
.recommend-song{
	margin: 30rpx 0;
	.recommend-hd{
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		font-weight: bold;
	}
	.swiper-item{
		overflow: hidden;
		padding-right: 30rpx;
		.song-item{
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			margin: 20rpx 0;
			.song-detail{
				display: flex;
				.pic{
					width: 100rpx;
					height: 100rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10px;
					}
				}
				.desc{
					margin-left: 26rpx;
					line-height: 1.5;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.name{
						// 限制宽度
						width: 450rpx;
						// 超出隐藏
						overflow: hidden;
						// 强制不换行
						white-space: nowrap; 
						// 超出显示省略号
						text-overflow:ellipsis;
					}
					.author{
						font-size: 24rpx;
						color: #666;
						.reason{
							font-size: 20rpx;
							color: $uni-primary-color;
							background-color: rgb(245,231,233);
							padding: 4rpx;
							border: 1rpx solid rgb(245,231,233);
							
						}
					}
				}
			
			}
		}
	}
	// 深度修改
	:deep(.uni-swiper-slide-frame){
			width: 95% !important; 
		}
}
.swiper-wrap{
	height: 370rpx;
}
</style>