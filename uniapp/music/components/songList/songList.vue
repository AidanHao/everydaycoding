<template>		
<!-- 专属推荐 -->
		<view class="recommend">
			<view class="recommend-hd">
				<view class="title">
					{{title}}
				</view>
				<view class="more">
					<uni-icons type="more-filled" size="16"></uni-icons>
		
				</view>
			</view>
			<view class="recommend-bd">
				<view class="recommend-bd__item" v-for="item in List" :key="item.id">
					<view class="item-pic">
						<image :src="item.picUrl" mode="aspectFill"></image>
					</view>
					<view class="title">{{item.name}}</view>
				</view>
			</view>
		</view>
</template>

<script setup>
	defineProps({
		List:Array,
		title:String
	})
</script>

<style lang="scss" scoped>
.recommend{
			.recommend-hd{
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				font-weight: bold;
			}
			.recommend-bd{
				display: flex;
				overflow-x: scroll;
				margin-top: 20rpx;
				
				// 控制弹性容器换行
				// flex-wrap: wrap;
				.recommend-bd__item{
					flex: 0 0 240rpx;
					margin-left: 30rpx;
					// 第一个不加
					&:nth-child(1){
						margin-left: 0;
					}
					.item-pic{
						width: 240rpx;
						image{
								width: 100%;
								height: 240rpx;
								border-radius: 10px;
						}
					}
					.title{
						font-size: 24rpx;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						// 超出之后打点
						text-overflow: ellipsis;
						overflow: hidden;
						color: #2c2c2c;
					}
				}
			}
		}
</style>