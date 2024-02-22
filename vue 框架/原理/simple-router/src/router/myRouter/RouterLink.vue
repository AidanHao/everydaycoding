<template>
    <a :href="'#'+to">
        <!-- 插槽 -->
        <slot />
    </a>
</template>

<script setup>
defineProps({
    to:{
        type:String,
        required:true,//必须传

    }
})
</script>
