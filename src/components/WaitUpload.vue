<script setup lang="ts">
import { computed } from 'vue'
import { store, FileStatus } from '../store'
const waitUploadFiles = computed(() => {
    return store.files.filter(file => file.status === FileStatus.ready)
})
</script>

<template>
    <div>待上传列表</div>
    <div v-for="fileItem in waitUploadFiles">
        <div>{{ fileItem.file.name }}</div>
    </div>
</template>