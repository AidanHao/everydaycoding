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
export default {
    data() {
        return {
            message: ''
        }
    },methods:{
        submit(){
            if(!this.message)return
            this.$emit('add',this.message)
            this.message = ''
        }
    }

}
</script>

<style lang="css" scoped></style>