<script setup>
</script>

<template>
    <div class="project-qq">
        <div class="qq-head">
            <div class="showhead">
                <span class="headtext"></span>
            </div>
            <div class="showname">Aidan</div>
            <div class="showadd">+</div>
        </div>



        <div class="qq-body">这里是body</div>
        <div class="qq-foot">这里是foot</div>
    </div>
  <router-view></router-view>
</template>

<style scoped>
.project-qq{
  height: 100vh;
}
  .qq-head{
    border-radius: 5px;
    height: 10%;
    background-color: #37cdfb;
    display: flex;
    align-items: center;
    .showhead{
      background: url('../public/vue.jpg') no-repeat;
      background-size: 100% 100%;
      display: flex;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      /* background-color: rgb(249, 17, 17); */
      margin-left: 5px;

    }
    .showname{
      margin-left: 5px;
    }
    .showadd{
      margin-left: auto;
      margin-right: 5px;
      font-size: 30px;

    }
  }
  .qq-body{
    height: 80%;
  }
  .qq-foot{
    height: 10%;
    background-color: #ec0f0f;
    border-radius: 5px;
  }
</style>
