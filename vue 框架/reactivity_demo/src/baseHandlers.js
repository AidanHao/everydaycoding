import { reactive } from "./reactive"

const get = createGetter()
const set = createSetter()

// shallow 浅 下一层的就不监听了 {a:{b:2}} obj.a.b
function createGetter(shallow = false) {
    // 闭包 shallow 
    return function get(target,key,receiver){
        // 映射 reflection 
        // === target[key]
        // proxy 做自动的懒代理                         
        const res = Reflect.get(target,key,receiver)
        track(target,"get",key)
        if(isObject(res)){
            return shallow?res:reactive(res)
        }
        return res
    }
}
// {a:{b:c:3}，y:1}
// Proxy 优势 懒代理 性能

function createSetter() {

}

export const mutableHandlers = {
    get,
    set,
    // has
    // deleteProperty
}
export const shallowReactiveHandlers = {
    get,
    set
}