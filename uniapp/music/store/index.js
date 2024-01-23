import { createStore } from 'vuex'

export default createStore({
	state:{
		// 控制菜单显示隐藏
		isShowMenu:false,
		loginState:false,//是否登录
		userInfo:{//用户信息
			nickname:'',
			userId:null,
			avatar:''
		}
	},
	// 这个是同步代码，菜单的隐藏不会涉及到异步逻辑
	mutations:{
		changeIsShowMenu(state,flag){
			state.isShowMenu = flag
		},
		changeLoginState(state,val){
			state.loginState = val
		},
		// 获取用户信息
		getUserInfo(state,opt){
			state.userInfo = opt
		}
	}
})