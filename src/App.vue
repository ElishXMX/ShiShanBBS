<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
</script>

<template>
  <router-view />
</template>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
