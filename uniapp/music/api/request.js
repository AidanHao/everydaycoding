// 用于读取当前的开发环境的一个是development 还有一个product
const baseUrl = process.env.NODE_ENV === 'development'?'http://192.168.10.198:3000':'xxxx'

export default baseUrl