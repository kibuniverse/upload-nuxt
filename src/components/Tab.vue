<script setup lang="ts">
import { store, FileStatus } from '../store'
import { ref } from 'vue'

function clickTab(i: number, status?: FileStatus) {
    store.updateSelectShowStatus(status)
    if (inkBarRef.value) {
        inkBarRef.value.style.width = tabItemInkInfo.value[i - 1].width + 'px'
        inkBarRef.value.style.left = tabItemInkInfo.value[i - 1].start + 'px'
    }
}
const tabItemInkInfo = ref<{ start: number, width: number }[]>([])
const inkBarRef = ref<HTMLDivElement>()
onMounted(() => {
    const containerDom = document.querySelector(`.tab-container`)
    let currentStart = 0
    if (containerDom?.children) {
        for (const item of containerDom?.children) {
            // compute the item margin-right value
            const style = window.getComputedStyle(item)
            const marginRight = parseInt(style.marginRight)
            tabItemInkInfo.value.push({ start: currentStart, width: item.clientWidth })
            // the new currentStart is the last start + the last width + the last margin-right
            currentStart = currentStart + item.clientWidth + marginRight
        }
    }
    if (inkBarRef.value) {
        const selectDom = document.querySelector(`.tab-container div:nth-child(1)`)
        inkBarRef.value.style.width = `${selectDom?.clientWidth}px`
    }
})
</script>
<template>
    <div class="tab-container">
        <div @click="clickTab(1)" :class="{ isSelect: store.selectShowStatus === undefined }">All</div>
        <div @click="clickTab(2, FileStatus.Uploading)"
            :class="{ isSelect: store.selectShowStatus === FileStatus.Uploading }">
            上传中
        </div>
        <div @click="clickTab(3, FileStatus.Finish)" :class="{ isSelect: store.selectShowStatus === FileStatus.Finish }">已完成
        </div>
        <div ref="inkBarRef" class="ink-bar"></div>
    </div>
</template>

<style scoped>
.tab-container {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding-bottom: 4px;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 16px;
    position: relative;
}

.tab-container div {
    cursor: pointer;
    margin-right: 16px;
}

.tab-container div:hover {
    color: #85b6f1;
}

.isSelect {
    color: #4096ff;
}

.tab-container .ink-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #4096ff;
    transition: .4s all;
}
</style>