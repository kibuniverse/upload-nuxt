<script setup>
const { data } = await useFetch("/api/hello");
</script>

<template>
  <div class="container"><span>Drag and drop here</span></div>
</template>

<style>
.container {
  min-width: 100px;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 30vh;
  border: 1px solid gray;
  border-radius: 4px;
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
