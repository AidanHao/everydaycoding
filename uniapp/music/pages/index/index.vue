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
		
		<view class="text-area">
			<text class="title"></text>
		</view>
	</view>
	<view class="">
		你好
	</view>
</template>

<script setup>
	import wyheader from '../../components/wyheader/wyheader.vue'
	const styles = {
		height:'60rpx',
	}
</script>

<style lang="scss" scoped>
	.index{
		.search{
			height: 60rpx;
			width: 540rpx;
			.uni-searchbar{
				height: 100%;
				padding: 0;
				.uni-searchbar__box{
					padding: 0;
				}
			}
		}
	}
</style>
.
<style>
	
</style>
