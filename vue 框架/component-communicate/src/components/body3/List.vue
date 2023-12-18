<template>
    <div>
        <div class="body">
            <ul>
                <li v-for="(item, index) in lists" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { pushScopeId } from 'vue';

export default {
    props:{
        Mydata:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            lists: ['html', 'css',],
        }
    },methods:{
        
    },
    watch:{
        Mydata(newVal){
            this.lists.push(newVal);
        }
    }
}
</script>

<style lang="css" scoped></style>