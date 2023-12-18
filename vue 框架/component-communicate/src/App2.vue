<template>
    <div>
        <!-- 名字不要和h5里面的标签冲突,否则会被直接生成为h5的标签 -->
        <!-- 只要子组件发布了这个事件，那么handle就会触发 -->
        <Head @add="handle"/>
        <div class="body">
            <ul>
                <li v-for="(item, index) in lists" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import Head from '@/components/body2/Head2.vue'
export default {
    components: {
        Head
    },
    data() {
        return {
            lists: ['html', 'css'],

        }
    },
    methods: {
        // handle会有一个参数(自己发布事件的参数),
        handle(val){
            console.log(val);
            this.lists.push(val)
        }
    }
}
</script>
  
<style lang="css" scoped></style>
  