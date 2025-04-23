<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
</script>

<template>
  <div class="container">
    <router-view />
  </div>
 
</template>

<style scoped>
/* From Uiverse.io by elijahgummer */ 
.container {
  width: 100%;
  height: 0%;
  background: radial-gradient(
    125% 125% at -2% 101%,
    rgba(204, 255, 153, 1) 10.5%,
    rgba(217, 255, 179, 1) 16%,
    rgba(229, 255, 204, 1) 17.5%,
    rgba(242, 255, 229, 1) 25%,
    rgba(247, 255, 237, 1) 40%,
    rgba(237, 255, 242, 1) 65%,
    rgba(229, 255, 250, 1) 100%
  );
}


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
