<template>
	<view class="mine">
		
		<wyheader icon="more-filled" bgColor='transparent' :needBox="false" fontColor='#fff'>
			<template v-slot:content>
				<view>我的音乐</view>
			</template>
		</wyheader>
		
		<menuLeft></menuLeft>
		<!-- :style="{backgroundImage:`url(${userInfo.profile&&userInfo.profile.backgroundUrl})`}" -->
		<!-- :style="{'background-image':'url(' + userInfo.profile.backgroundUrl + ')'}" -->
		<view class="mine-bd" >
			<view class="bg" :style="{backgroundImage:`url(${userInfo.profile&&userInfo.profile.backgroundUrl})`}">
				
			</view>
			<view class="user">
				<view class="pic">
					<image :src="userInfo.profile&&userInfo.profile.avatarUrl" mode="aspectFill"></image>
				</view>
				
				
				<view class="user-online" v-if="isLogin">
					<view class="username">
						<text>{{userInfo.profile&&userInfo.profile.nickname}}</text>
					</view>
					<view class="user-desc">
						<view class="user-desc-horoscope">
							<text class="iconfont icon-boy">
							</text>
							<text>{{ formateTime(userInfo.profile&&userInfo.profile.birthday).ageLever }}后</text>
							<text>{{formateTime(userInfo.profile&&userInfo.profile.birthday).horoscope}}座</text>
						</view>
						<view class="user-desc-address">
							<text>江西 南昌</text>
						</view>
						<view class="user-desc-age">
							<!-- {{Math.floor(userInfo.createDays/365)}} -->
							<!-- 位运算~~(userInfo.createDays/365) -->
							<text>村龄{{~~(userInfo.createDays/365)}}年</text>
						</view>
					</view>
					<view class="user-wyInfo">
						<view class="wyInfo-gz">
							<text>{{userInfo.profile&&userInfo.profile.follows}} </text>关注
						</view>
						<view class="wyInfo-fs">
							<text>{{userInfo.profile&&userInfo.profile.followeds}} </text>粉丝
						</view>
						<view class="wyInfo-dj">
							<text>Lv.{{userInfo.level}} </text>等级
						</view>
						<view class="wyInfo-tg">
							<text>{{userInfo.listenSongs}}时 </text>听歌
						</view>
					</view>
					<view class="user-list">
						<view class="zj btn">
							<text class="iconfont icon-zuijinlaifang"></text>
							<text class="text">最近</text>
						</view>
						<view class="bd btn">
							<text class="iconfont icon-bendisucai"></text>
							<text class="text">本地</text>
						</view>
						<view class="yp btn">
							<text class="iconfont icon-shangchuanyunpan"></text>
							<text class="text">云盘</text>
						</view>
						<view class="yg btn">
							<text class="iconfont icon-yigou"></text>
							<text class="text">已购</text>
						</view>
						<view class="fl btn">
							<text class="iconfont icon-bendifenlei"></text>
							<text class="text"></text>
						</view>
					</view>
				</view>
				
				<view class="user-outline" v-else @click="login">
					<text>立即登录</text>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
				
				
				
			</view>
			<view class="list">
				<view class="nav">
					<view class="nav-item"  :class="{'active':activeNum===index}" v-for="(item,index) in listNav" :key="index" @click="changeNav(index)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { computed,watch,ref } from 'vue';
import { useStore } from 'vuex'
import {apiGetUserInfo} from '@/api/mine.js'
import { formateTime } from '@/utils/index.js'
const store = useStore()

const userInfo = ref({});
const activeNum = ref(0)
const listNav = ['音乐','播客','动态']
const nav_bottom = ref( 750/3/2 + 'rpx')


const isLogin = computed(() => {
	return store.state.loginState
})

const login = () => {
	uni.reLaunch({
		url: '/pages/login/login'
	})
}

// onLoad(()=>{
// 	getUserInfo()
// })

const getUserInfo =async()=>{
	const res = await apiGetUserInfo(store.state.userInfo.userId)//'传入用户id
	console.log(res.data);
	userInfo.value = res.data
}

// 监听器仓库的用户数据是否更新
watch(()=>store.state.userInfo.userId,(newVal,oldVal)=>{
	if(newVal)
	{
		getUserInfo()
	}
},{immediate:true})

const changeNav = (index)=>{
	activeNum.value = index
	nav_bottom.value = 750/3/2 * ((2*index)+1) + 'rpx'
}
</script>

<style lang="scss" scoped>
.mine-bd{
	padding: 280rpx 30rpx 80rpx;
	position: relative;
	.user{
		
		.pic{
			width: 120rpx;
			height: 120rpx;
			margin: 0 auto;
			image{
				border: 1rpx solid #fff;
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.user-outline{
			text-align: center;
			margin: 30rpx 0;
			color: #fff;
			:deep(.uni-icons){
				color: #fff !important;
			}
		}
		.user-online{
			text-align: center;
			color: #fff;
			.username{
				margin: 40rpx 0 16rpx 0;
				font-size: 40rpx;
				font-weight: 500;
			}
			.user-desc{
				// // 网格
				// display: grid;
				// // 设置网格的列数
				// grid-template-columns: 1fr 1fr 1fr;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				text{
					margin-left: 10rpx;
					&.iconfont{
						color: #72939f;
					}
				}
			}
			.user-wyInfo{
				margin: 40rpx 0;
				display: flex;
				justify-content: center;
				font-size: 24rpx;
				color: #eee;
				view{
					margin-left: 40rpx;
					&:first-child{
						margin-left: 0;
					}
					text{
						font-size: 28rpx;
						color: #fff;
					}
					
				}
			}
			.user-list{
				display: grid;
				grid-template-columns: 2fr 2fr 2fr 2fr 1fr;
				grid-column-gap: 10rpx;
				.btn{
					padding: 10rpx 0;
					font-size: 24rpx;
					background-color: rgba(255, 255, 255, 0.1);
					border-radius: 10rpx;
					.iconfont{
						font-size: 24rpx;
						margin-right: 4rpx;
					}
				}
			}
			}
			
	}
	.bg{
		background-color: #93969d;
		background-size: cover;
		position: absolute;
		height: 800rpx;
		left: 0;
		right: 0;
		top: 0;
		z-index: -1;
		
	}
	.list{
		position: relative;
		top: -30rpx;
		background-color: #fff;
		margin-left: -30rpx;
		margin-right: -30rpx;
		margin-top: 80rpx;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		.nav{
			display: flex;
			.nav-item{
				flex: 1;
				text-align: center;
				padding: 30rpx 0;
				color:#666 ;
				&.active{
					position: relative;
					color: #000;
					// active的伪类
					// &::after{
					// 	content: '';
					// 	display: block;
					// 	width: 30rpx;
					// 	height: 6rpx;
					// 	background-color: $uni-primary-color;
					// 	position: absolute;
					// 	left: 50%;
					// 	transform: translateX(-50%);
					// 	bottom: 15rpx;
					// 	border-radius: 20rpx;
					// }
				}
				
			}
			// nav的伪元素
			&::after{
				content: '';
				display: block;
				width: 30rpx;
				height: 6rpx;
				background-color: $uni-primary-color;
				position: absolute;
				// css计算器calc
				left: v-bind(nav_bottom);
				transform: translateX(-50%);
				bottom: 15rpx;
				border-radius: 20rpx;
				transition: left 0.5s ease;
			}
		}
	}
}
</style>