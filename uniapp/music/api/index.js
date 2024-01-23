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

// 获取推荐歌曲的数据
export const apiGetRecommendSongs = ()=>{
	return uni.request({
		url:baseUrl + '/recommend/songs',
		method:'GET'
	})
}
// 雷达歌单
export const apiGetpersonalizedList = ()=>{
	return uni.request({
		url:baseUrl + '/personalized?limit=6',
		method:'GET'
	})
}
