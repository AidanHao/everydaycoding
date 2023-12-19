<template>
    <div>
        item
        <ItemContainer parent-component="item"/>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import ItemContainer from '@/components/ItemContainer.vue'
    export default {
        components: {
            ItemContainer
        },
        methods:{
            ...mapActions(['getQuestionListAction'])
        },
        created(){
            this.getQuestionListAction()
        }
    }
</script>

<style lang="less" scoped>

</style>