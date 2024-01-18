<script>
	// 应用的入口
	export default {
		globalData:{
			name:'全局名称',
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入图标 */
	@import 'common/font/iconfont.css';
</style>
