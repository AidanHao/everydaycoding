//hooks 函数化编程 函数式编程思想
import { defineStore } from 'pinia'
// 仓库的分支，
//专注于数据编程
import {ref} from "vue"
import type{ Banner } from '../models/banner'
import { useBanner } from '../api';

export const useBannerStore = defineStore("banner",()=>{
    const banners = ref<Banner[]>([]);
    const getBanners  = async ()=>{
        if(banners.value.length)return;
        banners.value = await useBanner()
    }
    return {
        banners,
        getBanners
    }
})