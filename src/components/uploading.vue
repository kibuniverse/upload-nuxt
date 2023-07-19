<script>
import { computed } from 'vue'
import { store } from '@/src/store'
const uploadingFile = computed(() => store.files.filter(file => file.status === 'uploading'))
</script>