<template>
    <div>
        <ul>
      <li v-for="banner in banners" :key="banner.targetId"> <img :src="banner.pic"></li>
    </ul>
  </div>

  <div>
    <ul>
      <li v-for="mv in personalizedMv" :key="mv.id"> <img :src="mv.picUrl"></li>
    </ul>
    </div>
</template>

<script setup lang="ts">

import { onMounted,toRefs} from 'vue';
import { useBannerStore } from '../store/banner';
import {usePersonalizedStore} from '../store/personalized';


const {personalizedMv} = toRefs(usePersonalizedStore())
const {getPersonalized} = usePersonalizedStore()
const {banners,getBanners}=useBannerStore()

onMounted(async ()=>{
  // banners.value=await useBanner()
  // console.log(banners.value);
  await getBanners()
  await getPersonalized()
  
})
</script>

<style scoped>

</style>