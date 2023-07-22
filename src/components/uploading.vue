<script>
import { computed } from 'vue'
import { store } from '@/src/store'
const uploadingFile = computed(() => {
    console.log('uploadingFile', store.files)
    return store.files.filter(file => file.status === 'uploading')
})
</script>