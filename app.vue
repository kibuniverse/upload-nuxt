<script setup>
const { data } = await useFetch("/api/hello");
console.log(data, "data");
</script>

<template>
  <div>
    <NuxtWelcome />
    <pre>{{ data.hello }}</pre>
  </div>
</template>
