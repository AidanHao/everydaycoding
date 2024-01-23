<template>
    <div class="index-all">
        <Header />
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
                    <li v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
                        <div class="item">
                            <div class="mechine-left">
                                <div class="mechine-img">
                                    <img src="@/assets/img/艾伦.png" alt="">
                                </div>
                                <div class="mechine-desc">
                                    <div class="mechine-name">七楼洗衣机</div>
                                    <div class="mechine-position">
                                        江西省萍乡湘东区湘东中学</div>
                                </div>
                            </div>
                            <div class="mechine-right">
                                <div class="mechine-state">在线</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Bottom />
    </div>
</template>

<script setup>
import Header from '@/components/header.vue'
import Bottom from '@/components/bottom.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toWallet = () => {
    router.push('/mywallet')
}
const toCard = () => {
    router.push('/mycard')
}
</script>

<style lang="less" scoped>
.index-all {
    background: #F2F2F2;

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
    }

    .index-useItems {
        overflow-y: auto;
        width: 100vw;

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
                // justify-content: center;
                align-items: center;

                img {
                    margin-left: 10px;
                    height: 3rem;
                    width: 3rem;
                    border-radius: 50%;
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
        }
    }
}</style>