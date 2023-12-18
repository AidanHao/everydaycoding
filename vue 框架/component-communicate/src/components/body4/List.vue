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
// 引入公共数据源，直接拿来用就好了
import {mapState} from 'vuex'
export default {
    computed:mapState(['lists']),
    data() {
        return {
            
        }
    }, methods: {

    },

}
</script>

<style lang="css" scoped></style>