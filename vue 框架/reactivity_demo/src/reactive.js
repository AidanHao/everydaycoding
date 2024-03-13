import {mutableHandlers} from './baseHandlers'

// 可读性的接口
// VUE的 API 比 React 好 API 的简洁

// 缓存
// vue组件代码可能很长，多人开发
export const reactiveMap = new WeakMap()
export function reactive(target){
    // 提升可读性
    return createReactiveObject(
        target,reactiveMap,mutableHandlers
        )
}

function createReactiveObject(target,proxyMap,proxHandlers){
    if(typeof target !== 'object'){
        console.warn(`reactive ${target}必须是一个对象`);
        return target
    }
    const existingProxy = proxyMap.get(target)
    if(existingProxy){
        console.log('-----------cached',target)
        return existingProxy;
    }
    const proxy = new Proxy(target,proxyHandlers)
    proxyMap.set(target,proxy)
    return proxy
}
// 为什么proxHandlers要分开来写 模块化分离
// proxy 区别于 defineProperty 操作更多，模块化