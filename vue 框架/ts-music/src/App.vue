<script setup lang="ts">
// import { onMounted,ref } from 'vue';
// import {useBanner} from './api/index';
// import type {Banner} from './models/banner';
// let banners = ref<Banner[]>([])//所有的vue的响应式

// import { onMounted,toRefs} from 'vue';
// import { useBannerStore } from './store/banner';
// import {usePersonalizedStore} from './store/personalized';
import Banner from './components/Banner.vue'

// const {banners} = toRefs(useBannerStore())
// const {getBanners} = useBannerStore()

// const {personalizedMv} = toRefs(usePersonalizedStore())
// const {getPersonalized} = usePersonalizedStore()
// const {banners,getBanners}=useBannerStore()

// onMounted(async ()=>{
//   // banners.value=await useBanner()
//   // console.log(banners.value);
//   await getBanners()
//   await getPersonalized()
  
// })
</script>

<template>
  <div>
    <Banner />
    <!-- <ul>
      <li v-for="banner in banners" :key="banner.targetId"> <img :src="banner.pic"></li>
    </ul>
  </div>

  <div>
    <ul>
      <li v-for="mv in personalizedMv" :key="mv.id"> <img :src="mv.picUrl"></li>
    </ul> -->
  </div>

</template>

<style scoped>

</style>
