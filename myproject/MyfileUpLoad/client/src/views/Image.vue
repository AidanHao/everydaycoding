<template>
  <div class="img-all">
    <!-- 上传图片区域 -->
    <div class="img-upload">

    </div>
    <!-- 展示图片区域 -->
    <div class="img-show">

    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.img-all {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background-color: red;

  .img-upload {
    width: 100%;
    height: 30%;
    background: red;
  }

  .img-show {
    width: 100%;
    height: 70%;
    background: pink;
  }

}
</style>