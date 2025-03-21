<template>
  <h1>nihao </h1>
  <TDCard
  :user="user"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TDCard from '../components/TDCard.vue'

let user={ 
          id: 1,
          name: '张三',
          region: '北京',
          province: '北京',
          occupation: '前端工程师',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          registerDate: '2023-03-15'
      }
</script>

<style scoped>
</style>