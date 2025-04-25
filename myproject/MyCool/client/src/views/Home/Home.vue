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
                    <div class="Home_Welcome_main_text_content">{{ displayText }}<span class="cursor">|</span></div>
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
import { ref, onMounted } from 'vue';
import HomeIntroduce from './components/HomeIntroduce.vue';

const avaterShowDetail = ref(false);
const displayText = ref('');
const fullText = '欢迎来到我的个人站';
let currentIndex = 0;
let isDeleting = false;
let typingSpeed = 300;

const typeWriter = () => {
    if (!isDeleting && currentIndex < fullText.length) {
        // 打字阶段
        displayText.value += fullText[currentIndex];
        currentIndex++;
        typingSpeed = 300;
    } else if (isDeleting && currentIndex > 0) {
        // 删除阶段
        displayText.value = displayText.value.slice(0, -1);
        currentIndex--;
        typingSpeed = 200;
    } else {
        // 切换阶段
        isDeleting = !isDeleting;
        typingSpeed = isDeleting ? 200 : 300;
    }
    
    setTimeout(typeWriter, typingSpeed);
};

onMounted(() => {
    typeWriter();
});

const mouseenter = () => {
    console.log("进入了");
    if(avaterShowDetail.value == false){
        avaterShowDetail.value = true;
    }
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
    height: 100vh;

    .Home_Welcome {
        height: 100%;
        width: 100%;
        background: url(../../public/沙滩.png);
        background-size: cover;
        background-color: rgba(104, 104, 99);
        z-index: 0;
        position: relative;

        .Home_Welcome_main {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80%;
            width: 100%;
            position: relative;

            .Home_Welcome_main_avatar {
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                background: url(../../public/头像.jpg);
                background-size: cover;
                animation: aperture 2s linear infinite;
                cursor: pointer;
                transition: transform 0.3s ease;
                
                &:hover {
                    transform: scale(1.05);
                }
            }

            .Home_Welcome_main_avatar::after {
                content: '';
                display: block;
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                animation: aperture 2s linear infinite 0.6s;
            }
            .Home_Welcome_main_showDetail {
                width: 30rem;
                height: 30rem;
                border-radius: 50%;
                position: absolute;
                margin-top: 12rem;

                .detailCard {
                    width: 3rem;
                    height: 3rem;
                    background: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform-origin: center;
                    transform: translate(-50%, -50%) rotate(0deg);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    
                    &:hover {
                        transform: translate(-50%, -50%) scale(1.2) rotate(360deg);
                        box-shadow: 0 0 20px rgba(255, 255, 255, 1);
                        z-index: 1;
                    }
                }

                .js {
                    background: url(../../public/js.jpg);
                    background-size: cover;
                    animation: around1 40s linear infinite;
                }

                .ts {
                    background: url(../../public/ts.jpg);
                    background-size: cover;
                    animation: around2 40s linear infinite;
                }

                .node {
                    background: url(../../public/node.jpg);
                    background-size: cover;
                    animation: around3 40s linear infinite;
                }

                .vue {
                    background: url(../../public/vue.jpg);
                    background-size: cover;
                    animation: around4 40s linear infinite;
                }

                .mysql {
                    background: url(../../public/mysql.jpg);
                    background-size: cover;
                    animation: around5 40s linear infinite;
                }

                .vite {
                    background: url(../../public/vite.jpg);
                    background-size: cover;
                    animation: around6 40s linear infinite;
                }

                @keyframes around1 {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg) translate(20rem) rotate(0deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(360deg) translate(20rem) rotate(-360deg);
                    }
                }
                @keyframes around2 {
                    0% {
                        transform: translate(-50%, -50%) rotate(60deg) translate(20rem) rotate(-60deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(420deg) translate(20rem) rotate(-420deg);
                    }
                }
                @keyframes around3 {
                    0% {
                        transform: translate(-50%, -50%) rotate(120deg) translate(20rem) rotate(-120deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(480deg) translate(20rem) rotate(-480deg);
                    }
                }
                @keyframes around4 {
                    0% {
                        transform: translate(-50%, -50%) rotate(180deg) translate(20rem) rotate(-180deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(540deg) translate(20rem) rotate(-540deg);
                    }
                }
                @keyframes around5 {
                    0% {
                        transform: translate(-50%, -50%) rotate(240deg) translate(20rem) rotate(-240deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(600deg) translate(20rem) rotate(-600deg);
                    }
                }
                @keyframes around6 {
                    0% {
                        transform: translate(-50%, -50%) rotate(300deg) translate(20rem) rotate(-300deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(660deg) translate(20rem) rotate(-660deg);
                    }
                }

            }

            .Home_Welcome_main_myname {
                width: fit-content;
                position: absolute;
                margin-top: 12rem;
                font-size: 3rem;
                font-weight: bold;
                color: #fff;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }

            .Home_Welcome_main_text {
                width: fit-content;
                overflow: hidden;
                position: absolute;
                margin-top: 18rem;

                .Home_Welcome_main_text_content {
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 1.5rem;
                    color: #fff;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 1.5rem; // 确保文字区域高度固定

                    .cursor {
                        display: inline-block;
                        width: 2px;
                        height: 1.2em;
                        background-color: #fff;
                        margin-left: 2px;
                        animation: blink 0.7s infinite;
                    }
                }
            }

            @keyframes aperture {
                0% {
                    box-shadow: 0 0 0 0 rgba(255, 255, 255, 60%);
                }

                60% {
                    box-shadow: 0 0 0 2rem rgba(255, 255, 255, 0%);
                }

                100% {
                    box-shadow: 0 0 0 4rem rgba(255, 255, 255, 0%);
                }
            }

        }

        .Home_Welcome_animation {
            height: 20%;
            width: 100%;
            position: absolute;
            bottom: 0;

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
        width: 100%;
        min-height: 100vh;
        background-color: rgb(255, 255, 255);
    }

    .Home_Last {
        width: 100%;
        min-height: 100vh;
        background: url(../../public/木鱼.jpg);
        background-size: cover;
    }
}

@keyframes blink {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}
</style>