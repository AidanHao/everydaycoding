<template>
    <div>
        <div class="head">
            <!-- v-model 双向数据绑定 -->
            <input type="text" v-model="message">
            <button @click="submit">确定</button>
        </div>
    </div>
</template>

<script>
// 引入公共数据源，直接拿来用就好了
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            message: ''
        }
    }, methods: {
        submit() {
            //把数据放到store
            if(!this.message)return
            this.listsAdd(this.message)
            this.message=''
            
        },
        ...mapMutations(['listsAdd']),
    }

}
</script>

<style lang="css" scoped></style>