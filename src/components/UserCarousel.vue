<template>

  <el-carousel :interval="5000" height="420px" indicator-position="outside">
    <el-carousel-item v-for="(group, index) in chunkedUsers" :key="index">
      <div class="user-group">
        <div 
          v-for="user in group" 
          :key="user.id" 
          class="user-card vertical"
          @mouseenter="hoverEffect"
        >
          <el-avatar :size="80" :src="user.avatar" />
          <div class="user-info">
            <h4>{{ user.name }}</h4>
            <p class="region">{{ user.region }}</p>
            <el-divider class="divider" />
            <p class="occupation">{{ user.occupation }}</p>
            <p class="register-date">注册时间：{{ user.registerDate }}</p>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  Users: {
    type: Array,
    required: true
  }
});
const chunkedUsers = computed(() => {
  const filtered = props.Users.filterRegion 
    ? props.Users.users.filter(u => u.region === props.Users.filterRegion)
    : props.Users.users
  
  return filtered.reduce((acc, _, i) => {
    if (i % 5 === 0) acc.push(filtered.slice(i, i + 5))
    return acc
  }, [])
})

const hoverEffect = (e) => {
  e.currentTarget.style.transform = 'translateY(-5px)'
  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
}
</script>

<style scoped>
.user-group {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 30px;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.user-card.vertical {
  height: 320px;
}

.user-info {
  text-align: center;
  margin-top: 15px;
}

.region {
  color: #409EFF;
  font-weight: 500;
  margin: 10px 0;
}

.occupation {
  color: #666;
  font-size: 0.9em;
}

.register-date {
  color: #999;
  font-size: 0.85em;
  margin-top: 10px;
}

.divider {
  margin: 12px 0;
}

.el-carousel__item {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>