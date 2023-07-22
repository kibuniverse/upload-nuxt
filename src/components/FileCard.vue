<script setup lang="ts">
import { fileStatusConfigMap } from '../utils/config';
import { FileStatus } from '../store/index'
import ProgressBar from './ProgressBar.vue';
import { store } from '../store/index';
const props = defineProps<{
    id: string;
    status: FileStatus;
    uploadProgress: number;
    name: string;
    resourceUrl?: string | undefined;
}>()
const statusInfo = computed(() => {
    return fileStatusConfigMap.get(props.status)
})
const isUploading = computed(() => {
    return props.status === FileStatus.Uploading
})
const showPreview = computed(() => {
    return props.status === FileStatus.Finish && props.resourceUrl
})
const btnText = computed(() => {
    if (props.status === FileStatus.Ready) {
        return 'upload'
    }
    if (props.status === FileStatus.Uploading) {
        return 'pause'
    }
    if (props.status === FileStatus.Pause) {
        return 'continue'
    }
})
const showBtn = computed(() => {
    return props.status !== FileStatus.Finish
})
function onClick() {
    if (props.status === FileStatus.Ready) {
        uploadFile()
        return
    }
    if (props.status === FileStatus.Uploading) {
        onPause()
        return
    }
    if (props.status === FileStatus.Pause) {
        uploadFile()
        return
    }
}
function uploadFile() {
    store.uploadFile(props.id)
}
function onPause() {
    store.pauseFile(props.id)
}
</script>

<template>
    <div class="card-item">
        <div class="left">
            <div class="name">{{ props?.name }}</div>
            <div class="progress">
                <ProgressBar v-if="isUploading" :progress="props.uploadProgress" />
            </div>
        </div>
        <div class="right">
            <div class="status">
                <div class="dot" :style="{ backgroundColor: statusInfo?.color }"></div>
                <span>{{ statusInfo?.text }}</span>
            </div>
            <button class="btn" v-if="showBtn" @click="onClick">{{ btnText }}</button>
        </div>
    </div>
</template>

<style>
.card-item {
    height: 60px;
    display: flex;
    padding: 8px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d6cccc;
    margin-bottom: 8px;
}

.card-item .left {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 8px;
    box-sizing: border-box;
}

.card-item .right {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.status {
    display: flex;
    align-items: center;
}

.status .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

.right .btn {
    width: 80px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #d6cccc;
    background-color: #fff;
    color: #000;
    cursor: pointer;
    margin-top: 8px;
}

.right .btn:hover {
    color: gray
}

.name {
    margin-bottom: 8px;
}
</style>