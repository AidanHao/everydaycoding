<script setup>

</script>

<template>
    <Transition name="move">
      <router-view></router-view>
    </Transition>
</template>

<!-- VUE 中的transition动画组件 -->
<style lang="less">
// /* 进入动画 */
//   .move-enter-active,.move-leave-active{
//     /* ease 消散淡入淡出 */
//     transition:all 0.01s ease-out;
//   }
//   .move-enter-from,.move-leave-to{
//     transition:translateX(100vw);//从偏移x轴进入页面，回归到正常位置
//     opacity:0;
//   }

</style>
