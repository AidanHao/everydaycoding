<template>
    <div>
        <Head @add="handle"/>
        <List :Mydata="Mydata"/>

    </div>
</template>
  
<script>
import Head from './components/body3/Head.vue';
import List from './components/body3/List.vue';

export default {
    components:{
        Head,
        List
    },
    data() {
        return {
            Mydata:''
        }
    },
    methods: {
    handle(val){
        this.Mydata = val
    }
    }
}
</script>
  
<style lang="css" scoped></style>
  