<template>
    <div class="Home">
        <div class="Home_Welcome">
            <div class="Home_Welcome_main">
                <div class="Home_Welcome_main_avatar" v-on:mouseenter="mouseenter" v-on:mouseleave="mouseleave">
                </div>
                <div class="Home_Welcome_main_showDetail"   >
                    <div class="detailCard vue"></div>
                    <div class="detailCard js"></div>
                    <div class="detailCard ts"></div>
                    <div class="detailCard node"></div>
                    <div class="detailCard mysql"></div>
                    <div class="detailCard vite"></div>
                </div>
                <div class="Home_Welcome_main_myname">小王同志</div>
                <div class="Home_Welcome_main_text">
                    <div class="Home_Welcome_main_text_content">欢迎来到我的个人站</div>
                </div>
            </div>
            <div class="Home_Welcome_animation">
                <svg class="Home_Welcome_animation_waves" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none"
                    shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,254,255,0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(125,176,169,0.2)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(255, 255, 255,0.8)" />
                    </g>
                </svg>
            </div>
        </div>
        <div class="Home_Introduce">
            <HomeIntroduce></HomeIntroduce>
        </div>
        <div class="Home_Last">
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import HomeIntroduce from './components/HomeIntroduce.vue';

const avaterShowDetail = ref(false);
const mouseenter = () => {
    console.log("进入了");
    if(avaterShowDetail.value == false){
        avaterShowDetail.value = true;
    }
    // avaterShowDetail.value = true;
};
const mouseleave = () => {
    if(avaterShowDetail.value === true){
        avaterShowDetail.value = false;
    }
};
</script>

<style lang="less" scoped>
.Home {
    width: 100%;
    height: 100%;

    .Home_Welcome {
        height: 100%;
        width: 100%;
        background: url(../../public/沙滩.png);
        background-size: cover;
        background-color: rgba(104, 104, 99);
        z-index: 0;

        .Home_Welcome_main {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80%;
            width: 100%;
            position: relative;

            .Home_Welcome_main_avatar {
                width: 4.5rem;
                height: 4.5rem;
                border-radius: 50%;
                background: url(../../public/头像.jpg);
                background-size: cover;
                animation: aperture 2s linear infinite;
            }

            .Home_Welcome_main_avatar::after {
                content: '';
                display: block;
                width: 4.5rem;
                height: 4.5rem;
                border-radius: 50%;
                animation: aperture 2s linear infinite 0.6s;
            }
            .Home_Welcome_main_showDetail {
                width: 22rem;
                height: 22rem;
                border-radius: 50%;
                position: absolute;
                margin-top: 8rem;

                .detailCard {
                    width: 2rem;
                    height: 2rem;
                    background: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 5px white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    /* 初始位置设置为父容器的中心 */
                    transform-origin: center;
                    /* 旋转中心设置为元素自身中心 */
                    transform: translate(-50%, -50%) rotate(0deg);
                    /* 先平移回中心，再旋转0度（默认） */
                }

                .js {
                    background: url(../../public/js.jpg);
                    background-size: cover;
                    // transform: translate(-11rem * sin(60deg) - 1rem, -11rem * cos(60deg) - 1rem);
                    animation: around1 30s linear infinite;
                }

                .ts {
                    background: url(../../public/ts.jpg);
                    background-size: cover;
                    // transform: translate(-11rem * sin(120deg) - 1rem, -11rem * cos(120deg) - 1rem);
                    animation: around2 30s linear infinite;
                }

                .node {
                    background: url(../../public/node.jpg);
                    background-size: cover;
                    // transform: translate(-11rem * sin(180deg) - 1rem, -11rem * cos(180deg) - 1rem);
                    animation: around3 30s linear infinite;
                }

                .vue {
                    background: url(../../public/vue.jpg);
                    background-size: cover;
                    // transform: translate(-11rem * sin(240deg) - 1rem, -11rem * cos(240deg) - 1rem);
                    animation: around4 30s linear infinite;
                }

                .mysql {
                    background: url(../../public/mysql.jpg);
                    background-size: cover;
                    // transform: translate(-11rem * sin(300deg) - 1rem, -11rem * cos(300deg) - 1rem);
                    animation: around5 30s linear infinite;
                }

                .vite {
                    background: url(../../public/vite.jpg);
                    background-size: cover;
                    // transform: translate(-11rem * sin(0) - 1rem, -11rem * cos(0deg) - 1rem);
                    animation: around6 30s linear infinite;
                }

                @keyframes around1 {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg) translate(16rem) rotate(0deg);
                    }

                    100% {
                        transform: translate(-50%, -50%) rotate(360deg) translate(16rem) rotate(-360deg);
                    }
                }
                @keyframes around2 {
                    0% {
                        transform: translate(-50%, -50%) rotate(60deg) translate(14rem) rotate(-60deg);
                    }

                    100% {
                        transform: translate(-50%, -50%) rotate(420deg) translate(14rem) rotate(-420deg);
                    }
                }
                @keyframes around3 {
                    0% {
                        transform: translate(-50%, -50%) rotate(120deg) translate(12rem) rotate(-120deg);
                    }

                    100% {
                        transform: translate(-50%, -50%) rotate(480deg) translate(12rem) rotate(-480deg);
                    }
                }
                @keyframes around4 {
                    0% {
                        transform: translate(-50%, -50%) rotate(180deg) translate(10rem) rotate(-180deg);
                    }

                    100% {
                        transform: translate(-50%, -50%) rotate(540deg) translate(10rem) rotate(-540deg);
                    }
                }
                @keyframes around5 {
                    0% {
                        transform: translate(-50%, -50%) rotate(240deg) translate(9rem) rotate(-240deg);
                    }

                    100% {
                        transform: translate(-50%, -50%) rotate(600deg) translate(9rem) rotate(-600deg);
                    }
                }
                @keyframes around6 {
                    0% {
                        transform: translate(-50%, -50%) rotate(300deg) translate(8rem) rotate(-300deg);
                    }

                    100% {
                        transform: translate(-50%, -50%) rotate(660deg) translate(8rem) rotate(-660deg);
                    }
                }

            }

            .Home_Welcome_main_myname {
                width: fit-content;
                position: absolute;
                // top: 60%;
                margin-top: 8rem;
                font-size: 2rem;
                font-weight: bold;
            }

            .Home_Welcome_main_text {

                width: fit-content;
                overflow: hidden;
                position: absolute;
                // top: 70%;
                margin-top: 13rem;

                .Home_Welcome_main_text_content {
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 1em;
                }



            }




            @keyframes aperture {
                0% {
                    box-shadow: 0 0 0 0 rgba(255, 255, 255, 60%);
                }

                60% {
                    box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0%);
                }

                100% {
                    box-shadow: 0 0 0 3rem rgba(255, 255, 255, 0%);
                }
            }

        }

        .Home_Welcome_animation {
            height: 20%;
            width: 100%;

            .Home_Welcome_animation_waves {
                width: 100%;
                height: 100%;

                /* Animation */
                .parallax>use {
                    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
                }

                .parallax>use:nth-child(1) {
                    animation-delay: -2s;
                    animation-duration: 7s;
                }

                .parallax>use:nth-child(2) {
                    animation-delay: -3s;
                    animation-duration: 10s;
                }

                .parallax>use:nth-child(3) {
                    animation-delay: -4s;
                    animation-duration: 13s;
                }

                .parallax>use:nth-child(4) {
                    animation-delay: -5s;
                    animation-duration: 20s;
                }

                @keyframes move-forever {
                    0% {
                        transform: translate3d(-90px, 0, 0);
                    }

                    100% {
                        transform: translate3d(85px, 0, 0);
                    }
                }
            }

        }

    }

    .Home_Introduce {
        // height: 100%;
        width: 100%;
        background-color: rgb(255, 255, 255);
    }

    .Home_Last {
        height: 100%;
        width: 100%;
        background: url(../../public/木鱼.jpg);
        background-size: cover;
    }
}
</style>