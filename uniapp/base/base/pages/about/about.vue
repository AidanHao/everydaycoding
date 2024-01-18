<template>
	<view>
		about page
	</view>
	<view class="btn">
		<button type="default">按钮</button>
		<!-- 图标库的两种用法 -->
		<view class="iconfont icon-yinle"></view>
		<view class="iconfont">&#xe600;</view>
	</view>
</template>

<script setup>
import { onMounted } from 'vue';
	// 怎么做接口请求呢？
	onMounted(()=>{
		const reqTask = uni.request({
			url:'https://mock.presstime.cn/mock/65a915509358b0b690cf1395/movie/movieList',
			method:'GET',
			success:(res)=>{
				console.log(res);
				
				// 往本地存储里面存储东西
				uni.setStorage({
					key:'movieName',
					data:res.data.movieList[0].nm,
					success:function(){
						console.log('success');
						uni.showToast({
							title:'保存成功',
							duration:2000,
							icon:'success'
						});

						
					},
					fail:function(){
						console.log('faild');
					},
					complete:()=>{
						console.log('完成');
					}
				})
			}
		})
		// .then(res=>{
		// 	console.log(res);
		// })
		
		// 截断请求
		// reqTask.abort()
	})
</script>

<style lang="scss">
.btn{
	button{
		// rpx 响应式的px
		// 750rpx就是屏幕宽度的100%  750像素的设计稿，量到多少像素就写多少rpx
		width: 200rpx;//rpx是根据屏幕宽度制定的响应式单位，rpx是物理像素单位1rpx等于0.5个px
	}
}
</style>
