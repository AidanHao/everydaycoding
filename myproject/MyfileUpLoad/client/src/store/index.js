import {defineStore} from 'pinia'

export const userStore = defineStore('user',{
    state:() =>({
        islogin:false,
        nickname:'未登录',
        isAdmin:false
    }),
    actions:{

    },
    getters:{

    }
})