import baseUrl from './request.js'


// 首页轮播图的接口请求
export const apiGetBanner = (data) => {
	return uni.request({
		url: baseUrl + '/banner',
		method: 'GET',
		data: data
	})
}
// 首页入口图标列表的请求
export const apiGetBall = () =>{
	return uni.request({
		url:baseUrl + '/homepage/dragon/ball',
		method:'GET'
	})
}
// 获取推荐歌单的数据
export const apiGetRecommendList = ()=>{
	return uni.request({
		url:baseUrl + '/recommend/resource',
		method:'GET'
	})
}
