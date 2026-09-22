<template>
    <section></section>
    <p>TEST</p>
</template>

<script setup>
import router from '@/router';
import { onUnmounted } from 'vue';

// Refine Needs Work
onUnmounted(()=>{
    window.alert('test')//Remove
    router.removeRoute('/Admin')
});
</script>