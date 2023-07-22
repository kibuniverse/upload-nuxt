<script setup>
const { progress = 0 } = defineProps({
    progress: Number,
})
</script>

<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
</template>

<style scoped>
.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    transition: width 0.3s ease-in-out;
}
</style>