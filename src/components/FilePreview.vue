<script setup>
const props = defineProps({
    title: String,
    content: String,
})
</script>
<template>
    <div>
        {{ props.content }}
    </div>
</template>