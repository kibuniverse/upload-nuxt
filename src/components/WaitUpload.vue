<script setup>
import { computed } from 'vue'
import { store, FileStatus } from '../store'
const waitUploadFiles = computed(() => {
    return store.files.filter(file => file.status === FileStatus.ready)
})
console.log(waitUploadFiles.value)
</script>

<template>
    <div>待上传列表</div>
    <div v-for="file in store.files">
        <div>{{ file.name }}</div>
    </div>
</template>