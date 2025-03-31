<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { startSakura, stopp } from './methods/allPageAnimation';
import { onMounted } from 'vue';
onMounted(() => {
  startSakura();
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
