<script setup>
import { store } from './src/store'
import WaitUploadFiles from './src/components/WaitUpload.vue'
import FileCard from './src/components/FileCard.vue'
import Tab from './src/components/Tab.vue'
import ProgressBar from './src/components/ProgressBar.vue'


const filteredFiles = computed(() => {
    return store.files.filter(file => !store.selectShowStatus || file.status === store.selectShowStatus)
})
function onFile(e) {
    store.addFile(e.target.files)
}
</script>

<template>
    <div class="container">
        <input class="input" @change="onFile" multiple type="file">
        <div class="info">Drag and drop here</div>
    </div>
    <Tab />
    <div v-for="fileItem in filteredFiles">
        <FileCard :name="fileItem.name" :status="fileItem.status" :upload-progress="fileItem.uploadProgress"
            :id="fileItem.id" />
    </div>
</template>

<style>
.container {
    position: relative;
    min-width: 100px;
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 30vh;
    border: 1px solid gray;
    border-radius: 4px;
    transition: .4s all;
}

.container input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.container .info {
    position: absolute;
    z-index: -1;
    top: 50%;
    margin-top: -10px;
}


.container:hover {
    border: 1px solid cadetblue;
}


body {
    margin: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
