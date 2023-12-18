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
    export default{

        data(){
            return {
                message:''
            }
        },
        methods:{
            submit(){
                if (!this.message) return
                //将message传给父组件使用 this.$emit('add',this.message)先定义一个事件名，再抛出一个值
                //这个交发布一个add事件，父组件负责关注这个事件
                this.$emit('add',this.message)
                this.message = ''
                
            }
        }
    }
</script>

<style lang="css" scoped></style>