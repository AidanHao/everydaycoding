// 必须抛出，才能引入
// 为什么要打花括号，如果是default 它抛出的是对象
// export直接抛出的要用{}承接
import { get } from './axios.js'

const getSeller = get('/api/seller')
export {
    getSeller,
}