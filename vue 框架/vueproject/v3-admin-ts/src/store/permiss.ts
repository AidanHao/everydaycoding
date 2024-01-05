// store 提供数据 给router提供角色数据
import { defineStore, } from 'pinia'
// 接口定义
interface ObjectList {
    [key: string]: string[]
}
//提供不同的角色的权限
export const usePermissStore = defineStore('permiss',()=>{
    return{
        //角色列表
        // 添加一个泛型约束就好
        roleList: <ObjectList>{//权限列表
            admin:['1','2','3','4'],
            user:['1'],// 没有的地方对应的状态码就是403
            

        }
    }
})

