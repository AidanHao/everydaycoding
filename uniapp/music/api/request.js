// 用于读取当前的开发环境的一个是development 还有一个product
const baseUrl = process.env.NODE_ENV === 'development'?'http://172.22.145.0:3000':'xxxx'

export default baseUrl