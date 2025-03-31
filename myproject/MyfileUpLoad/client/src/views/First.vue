<template>
    <div class="first">
        <!-- 轮播图 -->
        <div class="first-headbox">
            <div class="first-swiper">
                <el-carousel :interval="3000" type="card" height='10rem' autoplay>
                    <el-carousel-item v-for="item in 4" :key="item">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="first-other"  ref="chartContainer" style="width: 30%; height: 12rem;">
            </div>

        </div>
        <!-- 用户信息 -->
        <div class="first-userinfo">
            <el-descriptions title="用户信息" border>
                <el-descriptions-item label="昵称">{{ state.nickname }}</el-descriptions-item>
                <el-descriptions-item label="手机号">15514786464</el-descriptions-item>
                <el-descriptions-item label="地址">江西南昌</el-descriptions-item>
                <el-descriptions-item label="用户权限">
                    <el-tag size="small">{{ state.userpower }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="访问时间">{{ state.logintime }}</el-descriptions-item>
            </el-descriptions>
        </div>
        <!-- 文件内存 -->
        <div class="first-datainfo" >
          <div ref="chartData" style="width: 30%; height: 12rem;">

          </div>
        </div>
    </div>
</template>

<script setup>
// 引入---------------------------------------------------------------------
//引入计算函数
import convertMillisToDate from '../util/datecompute/index.js'

import { onBeforeMount, reactive,ref,onMounted ,onBeforeUnmount } from 'vue';
// 引入封装好的axios
import axios from '../api'
// 引入pinia
import { userStore } from '../store'
import { storeToRefs } from 'pinia'
const store = userStore()

//----------------------------------------------------------------------------



// Echarts-----------------------------------------------------------
import * as echarts from 'echarts';

// 设置响应式数据
const fileSize = reactive({
  total:null,
  free:null,
  used:null
})

// 获取容器元素
const chartContainer = ref(null);
const chartData = ref(null);


// 在onMounted生命周期钩子中初始化图表
onMounted( async () => {
  const chartInstance = echarts.init(chartContainer.value);
  const chartDisk = echarts.init(chartData.value)
  const res1 = await axios.post('/mycomputer')
  function bytesToGB(bytes) {
    /**
     * 将字节转换为GB。
     * 
     * @param {number} bytes - 需要转换的字节数。
     * @return {number} 转换后的GB数，保留两位小数。
     */
    const GB = 1024 * 1024 * 1024;
    return parseFloat((bytes / GB).toFixed(2));
  }
  fileSize.total = bytesToGB(res1.data.total)
  fileSize.free = bytesToGB(res1.data.free)
  fileSize.used = bytesToGB(res1.data.total-res1.data.free)
  // console.log(fileSize);
  // 配置图表选项
  const options = {
    // 圆饼图配置
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['睡觉', '游戏', '学习', '日常'],
    },
    series: [
      {
        name: '活动占比',
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [
          { value: 40, name: '睡觉' }, // 占比40%
          { value: 10, name: '游戏' }, // 占比10%
          { value: 35, name: '学习' }, // 占比35%
          { value: 15, name: '日常' }, // 占比15%
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  // 配置图表Data-disk
  const options2 = {
    title: {
      text: '磁盘内存使用情况/GB',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['已用空间', '剩余空间']
    },
    series: [
      {
        name: '磁盘空间',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: fileSize.used, name: '已用空间' },
          { value: fileSize.free, name: '剩余空间' }
        ]
      }
    ]
  }

  // 载入图表配置
  chartInstance.setOption(options);
  chartDisk.setOption(options2);
});
//----------------------------------------------------------------



//用户信息--------------------------------------------------------
// 解构拿到数据
const { nickname, islogin,isAdmin } = storeToRefs(store)

const state = reactive({
    nickname: nickname.value,
    logintime: '',
    userpower: '普通用户'
})

// 拿到当前登录时间
state.logintime = convertMillisToDate(Date.now())

// 在转载阶段发送请求,获取用户信息
onBeforeMount(async () => {
    const res = await axios.post('/first')
    // console.log(res);
    state.nickname = res.data.nickname
    state.userpower = res.data.userpower == 'admin' ? '管理员' : '普通用户'
  
})
//--------------------------------------------------------
</script>

<style lang="less" scoped>
.first {
    width: 100%;
    height: calc(100vh - 5rem);
    overflow: scroll;
    // margin-top: -20px;
    .first-headbox {
        width: 100%;
        height: 10%;

        .first-swiper {
            width: 50%;
            height: 10%;
            position: relative;

            .el-carousel__item h3 {
                color: #475669;
                opacity: 0.75;
                line-height: 200px;
                margin: 0;
                text-align: center;
            }

            .el-carousel__item:nth-child(1) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper1.jpg);
                background-size: 100% 100%;
            }

            .el-carousel__item:nth-child(2) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper2.jpg);
                background-size: 100% 100%;

            }

            .el-carousel__item:nth-child(3) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper3.jpg);
                background-size: 100% 100%;
            }

            .el-carousel__item:nth-child(4) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper4.jpg);
                background-size: 100% 100%;
            }
        }

        .first-other {
            height: 10%;
            width: 50%;
            margin-left: 50%;
        }

    }



    .first-userinfo {
        margin-top: 7rem;
    }
    .first-datainfo{
      margin-top: 1rem;
      width: 100%;
    }

}
</style>