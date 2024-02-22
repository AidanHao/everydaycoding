<template>
    <div class="index-bd">
            <div class="index-options">
                <!-- 我的钱包 -->
                <div class="option" @click="toWallet">
                    <div class="iconfont icon-qianbao"></div>
                    <div class="option-text">我的钱包</div>
                </div>
                <!-- 我的卡包 -->
                <div class="option" @click="toCard">
                    <div class="iconfont icon-kabao"></div>
                    <div class="option-text">我的卡包</div>
                </div>
                <!-- 添加设备 -->
                <div class="option">
                    <div class="iconfont icon-tianjiashebei"></div>
                    <div class="option-text">添加设备</div>
                </div>
                <!-- 扫一扫 -->
                <div class="option">
                    <div class="iconfont icon-saoyisao1"></div>
                    <div class="option-text">扫一扫</div>
                </div>
            </div>
            <div class="index-useItems">
                <ul>
                    <li v-for="item in machines" :key="item.machine_id">
                        <div class="item">
                            <div class="mechine-left">
                                <div class="mechine-img">
                                    <img src='../assets/img/吹风机.png'  alt="" v-if="item.machine_type == '1'">
                                    <img src='../assets/img/淋浴.png'  alt="" v-if="item.machine_type == '2'">
                                    <img src='../assets/img/热水器.png'  alt="" v-if="item.machine_type == '3'">
                                    <img src='../assets/img/洗衣机.png'  alt="" v-if="item.machine_type == '4'">
                                    <img src='../assets/img/饮水机.png'  alt="" v-if="item.machine_type == '5'">
                                </div>
                                <div class="mechine-desc">
                                    <div class="mechine-name">{{item.machine_name}}</div>
                                    <div class="mechine-position">{{ item.machine_address }}</div>
                                </div>
                            </div>
                            <div class="mechine-right" v-if="item.machine_network">
                                <div class="mechine-state">在线</div>
                            </div>
                            <div class="mechine-right-2" v-else>
                                <div class="mechine-state">离线</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script setup>
//路由部分
import { useRouter } from 'vue-router'
// 引入axios
import axios from '../api'
import {onMounted} from 'vue'
import { ref } from 'vue';


// 定义路由
const router = useRouter()
const machines = ref([])

// 在页面加载时获取数据
onMounted(async() => {
    const {data} = await axios.post('/getMachine')
    console.log(data)
    machines.value = data
})


// 路由的跳转
const toWallet = () => {
    router.push('/mywallet')
}
const toCard = () => {
    router.push('/mycard')
}

</script>

<style lang="less" scoped>
 .index-bd {
        .index-options {
            width: 100vw;
            height: 5rem;
            background: #5C78FF;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;

            .option {
                padding: 0 1rem;
                text-align: center;

                .iconfont {
                    font-size: 1.7rem;
                }

                .option-text {
                    padding-top: 10px;
                    font-size: 0.8rem;
                }
            }
        }
        .index-useItems {
        overflow-y: auto;
        width: 100%;
        padding-bottom: 9rem;

        .item {
            position: relative;
            overflow: hidden;
            width: 95%;
            margin: 0.5rem;
            background-color: #fff;
            border-radius: 15px;

            .mechine-left {
                height: 5rem;
                width: 18rem;
                display: flex;
                align-items: center;
                .mechine-img{
                    margin-left: 0.5rem;
                    height: 3rem;
                    width: 3rem;
                    border-radius: 50%;
                    background: #5C78FF;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        height: 80%;
                        width: 80%;
                }
                }
                

                .mechine-desc {
                    margin-left: 10px;
                    width: 80%;
                    .mechine-name {
                        margin-bottom: 10px;
                        // 强制不换行
                        white-space: nowrap;
                        overflow: hidden;
                        width: 100%;
                        // 超出省略号
                        text-overflow: ellipsis;
                        font-size: 0.9rem;
                        font-weight: bold;
                    }

                    .mechine-position {
                        margin-top: 5px;
                        font-size: 0.7rem;
                        width: 100%;
                        height: 1.4rem; //限制高度为1.4rem只能显示两行
                        // text-overflow: ellipsis; ///超出部分省略号显示
                        overflow: hidden; //超出文本隐藏
                    }
                }

            }
            .mechine-right{
                height: 1.5rem;
                width: 15%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 999;
                background-color: #5C78FF;
                border-radius: 0 0 0 15px;
                .mechine-state{
                    color: #fff;
                    text-align: center;
                    font-size: 0.7rem;
                    margin-top: 0.4rem;
                }
            }
            .mechine-right-2{
                height: 1.5rem;
                width: 15%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 999;
                background-color: #EDEDED;
                border-radius: 0 0 0 15px;
                .mechine-state{
                    color: #A3A3A3;
                    text-align: center;
                    font-size: 0.7rem;
                    margin-top: 0.4rem;
                }
            }
        }
    }
    }
</style>