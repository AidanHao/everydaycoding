<template>
    <div class="project-qq">
        <div class="qq-head">
            <div class="showhead">
                <span class="headtext"></span>
            </div>
            <div class="showname">Aidan</div>
            <div class="showadd">+</div>
        </div>



        <div class="qq-body">
            <ul class="body-info">
                <li v-for="(item, index) in communication">
                    <div class="oneinfo">
                        <div class="body-showhead">
                            <img :src='item.img' alt="" class="oneimg">
                        </div>
                        <div class="body-showname">
                            <div class="body-name">
                                {{ item.name }}
                            </div>
                            <div class="lastinfo">
                                {{ item.lastinfo }}
                            </div>
                        </div>

                    </div>
                </li>
            </ul>
        </div>






        <div class="qq-foot">这里是foot</div>
    </div>
    <router-view></router-view>
</template>

<script>
export default {
    data() {
        return {
            communication: [
                {
                    img: '../public/vue.jpg',
                    name: '小小',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶'
                },
                {
                    img: '../public/vue2.jpg',
                    name: '班级群',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue3.jpg',
                    name: '幸福的一家人',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue4.jpg',
                    name: '同学群',
                    time: '昨天21:00',
                    lastinfo: '班长：明天不要迟到'
                },
                {
                    img: '../public/vue5.jpg',
                    name: '小明同学',
                    time: '昨天21:00',
                    lastinfo: '小明同学：吃饭了嘛'
                }, {
                    img: '../public/vue.jpg',
                    name: '小小',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue2.jpg',
                    name: '班级群',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue3.jpg',
                    name: '幸福的一家人',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue4.jpg',
                    name: '同学群',
                    time: '昨天21:00',
                    lastinfo: '班长：明天不要迟到'
                },
                {
                    img: '../public/vue5.jpg',
                    name: '小明同学',
                    time: '昨天21:00',
                    lastinfo: '小明同学：吃饭了嘛'
                }, {
                    img: '../public/vue.jpg',
                    name: '小小',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue2.jpg',
                    name: '班级群',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue3.jpg',
                    name: '幸福的一家人',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue4.jpg',
                    name: '同学群',
                    time: '昨天21:00',
                    lastinfo: '班长：明天不要迟到'
                },
                {
                    img: '../public/vue5.jpg',
                    name: '小明同学',
                    time: '昨天21:00',
                    lastinfo: '小明同学：吃饭了嘛'
                }, {
                    img: '../public/vue.jpg',
                    name: '小小',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue2.jpg',
                    name: '班级群',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue3.jpg',
                    name: '幸福的一家人',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue4.jpg',
                    name: '同学群',
                    time: '昨天21:00',
                    lastinfo: '班长：明天不要迟到'
                },
                {
                    img: '../public/vue5.jpg',
                    name: '小明同学',
                    time: '昨天21:00',
                    lastinfo: '小明同学：吃饭了嘛'
                }, {
                    img: '../public/vue.jpg',
                    name: '小小',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue2.jpg',
                    name: '班级群',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue3.jpg',
                    name: '幸福的一家人',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue4.jpg',
                    name: '同学群',
                    time: '昨天21:00',
                    lastinfo: '班长：明天不要迟到'
                },
                {
                    img: '../public/vue5.jpg',
                    name: '小明同学',
                    time: '昨天21:00',
                    lastinfo: '小明同学：吃饭了嘛'
                }, {
                    img: '../public/vue.jpg',
                    name: '小小',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue2.jpg',
                    name: '班级群',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue3.jpg',
                    name: '幸福的一家人',
                    time: '昨天20:01',
                    lastinfo: '小下：我们截个图'
                },
                {
                    img: '../public/vue4.jpg',
                    name: '同学群',
                    time: '昨天21:00',
                    lastinfo: '班长：明天不要迟到'
                },
                {
                    img: '../public/vue5.jpg',
                    name: '小明同学',
                    time: '昨天21:00',
                    lastinfo: '小明同学：吃饭了嘛'
                },

            ]
        }
    }

}
</script>

<style scoped>
.project-qq {
    height: 100vh;
}

.qq-head {
    border-radius: 5px;
    height: 10%;
    background-color: #37cdfb;
    display: flex;
    align-items: center;

    .showhead {
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

    .showname {
        margin-left: 5px;
    }

    .showadd {
        margin-left: auto;
        margin-right: 5px;
        font-size: 30px;

    }
}

.qq-body {
    height: 80%;
    overflow: auto;
    .body-info {
        list-style: none;

        .oneinfo {

            margin-top: 5px;
            height: 60px;
            background-color: white;
            display: flex;
            align-items: center;
            .lastinfo{
                    font-size: 10px;
                }

            .body-showhead {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                background-color: #fff;
                margin-left: 2px;
                overflow: hidden;

                .oneimg {
                    width: 100%;
                    height: 100%;
                }
            }
        }

    }

}

.qq-foot {
    height: 10%;
    background-color: #ec0f0f;
    border-radius: 5px;
}</style>