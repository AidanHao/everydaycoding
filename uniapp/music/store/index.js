import { createStore } from 'vuex'

export default createStore({
	state:{
		// 控制菜单显示隐藏
		isShowMenu:false
	},
	// 这个是同步代码，菜单的隐藏不会涉及到异步逻辑
	mutations:{
		changeIsShowMenu(state,flag){
			state.isShowMenu = flag
		}
	}
})