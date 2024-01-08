<template>
    <Transition name="move">
      <router-view></router-view>
    </Transition>

</template>

<script setup>

</script>


<!-- VUE 中的transition动画组件 -->
<style lang="less">
/* 进入动画 */
  .move-enter-active,.move-leave-active{
    /* ease 消散淡入淡出 */
    transition:all 0.5s ease-out;
  }
  .move-enter-from,.move-leave-to{
    transition:translateX(100vw);//从偏移x轴进入页面，回归到正常位置
    opacity:0;
  }

</style>


<!-- <style lang="less">
* {
  margin: 0;
  padding: 0;
}
.move-enter-active, // move是动画名 enter是进入动画
.move-leave-active{  
  transition: all 0.5s ease-out;
}

.move-enter-from, 
.move-leave-to {
  transition: translateX(10px);  // 从偏离x轴 10px 回归到目前的状态
  opacity: 0;
}
</style> -->

