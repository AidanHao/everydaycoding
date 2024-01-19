<template>
	<view class="menu-left" :class="isShow?'show':'hide'">
		<!-- 用户info -->
		<view class="menu-hd">
			<view class="user-info">
				<view class="avatar">
					<image class="pic" src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="username">
					<text>Aidan</text>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<!-- 扫一扫 -->
			<view class="qricon">
				<uni-icons type="scan" size="24"></uni-icons>
			</view>
		</view>
		<view class="menu-bd">
			无敌暴龙神
		</view>
		
	</view>
	<!-- 蒙层 -->
	<view class="menu-mask" @click="hideMenu" v-show="isShow" ></view>
</template>

<script setup>
	import {computed, ref} from 'vue'
	import { useStore } from 'vuex'
	const store = useStore()
	const isShow = computed(()=>{
		return store.state.isShowMenu
	})
const hideMenu = ()=>{
	// isShow.value = false
	store.commit('changeIsShowMenu',false)
}
</script>

<style lang="scss" scoped>
.menu-left{
	position: fixed;
	top: 0;
	z-index: 9999;
	width: 620rpx;
	height: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	background-color: #fff;
	// 阴影x轴 y轴 范围 颜色
	// box-shadow: 5px 0 20px #eee;
	// 过渡动画 平移出去的
	transition: all 0.5s ease-in-out;
	&.show{
		left: 0;
	}
	&.hide{
		left:-620rpx
	}
	.menu-hd{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.user-info{
			display: flex;
			align-items: center;
			.avatar{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;
				.pic{
					width: 100%;
					height: 100%;
				}
			}
			.username{
				margin-left: 20rpx;
			}
		}
	}
}
// 蒙层
.menu-mask{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		// 子容器会在父容器已有的层级上，已有的基础上再去计算新的层级，没办法使子容器的层级比父容器的层级更低，要么写在外面，要摸给其他的子容器套一层子容器，再定位
		z-index: 1000;
}
</style>