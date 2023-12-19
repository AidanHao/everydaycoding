<template>
    <div class="score">
        <h2>得分为:{{ score_right }}</h2>
    </div>
</template>

<script>
//把数据拿过来
import { mapState, mapGetters } from 'vuex'
export default {
    computed:
    {
        ...mapState(['answerId',]),
        ...mapGetters(['rightAnswer'])
    },
    created() {
        this.calcScore()
    }, 
    data() {
        return {
            score_right: 0
        }
    },
    methods: {
        calcScore() {
            let every = 100 / this.answerId.length

            this.answerId.forEach((item, index) => {
                if (item === this.rightAnswer[index]) {
                    this.score_right += every
                }
            });
        }
    }

}
</script>

<style lang="less" scoped>
.score {
    color: white;

    h2 {
        color: white;
    }
}</style>