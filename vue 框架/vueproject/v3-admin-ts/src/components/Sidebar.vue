<template>
    <div>
        <div class="sidebar">
            <!-- 菜单 -->
            <!-- element-ui会匹配路由 -->
            <el-menu class="sidebar-el-menu" background-color="#324157" text-color="#bfcdb9" active-text-color="#20a0ff" 
                unique-opened :default-active="route.path" :collapse="collapse" router>
                <!-- slot占位符 用于自定义组件的内部 -->
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <!-- 如果有多级菜单就用这里的输出方式 -->
                        <el-sub-menu :index='item.index' :key="item.index" v-permiss = 'item.permiss'>
                            <template #title>
                                <el-icon>
                                    <component :is="item.icon" />
                                </el-icon>
                                <span>{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs">
                               <el-menu-item
                               :index="subItem.index"
                               >
                               {{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-sub-menu>
                    </template>
                    <template v-else >
                        <!-- index是要打开的菜单的索引 -->
                        <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss" >
                            <el-icon>
                                <!-- 很多个菜单，很多个图标，使用component 这里是组件占位符，:is表示是什么组件，里面写的就是组件名-组件name -->
                                <component :is="item.icon" />
                            </el-icon>
                            <template #title>{{ item.title }}</template>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import { useSidebarStore } from '../store/sidebar';
const route = useRoute()
const collapse = computed(()=>sidebarStore.collapse)
const sidebarStore = useSidebarStore()

// const onRoutes = computed(()=>{
//     return route.path
// })
const items = [
    {
        icon:'Odometer',
        index:'/dashboard',
        title:'系统首页',
        permiss:'1'
    },
    {
        icon:'Calendar',
        index:'1',
        title:'表格相关',
        permiss:'2',
        subs:[
            {
                index:'/table',
                title:'常用表格',
                permiss:'2',
            },
            {
                index:'/import',
                title:'导入Excel',
                permiss:'2',
            },
            {
                index:'/export',
                title:'导出Excel',
                permiss:'2',
            },
        ]
    },
    {
        icon:'Edit',
        index:'3',
        title:'表单相关',
        permiss:'4',
        subs:[
            {
                index:'/form',
                title:'基本表单',
                permiss:'5'
            },
            {
                index:'/upload',
                title:'文件上传',
                permiss:'6'
            },
        ]
    }
]
</script>

<style scoped></style>