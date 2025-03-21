<template>
  <div class="hot-container">
    <el-card class="user-card">
      <div class="user-info">
        <el-avatar :size="60" />
        <div class="user-meta">
          <h3>用户名：{{ userInfo.username }}</h3>
          <el-button 
            type="danger" 
            @click="handleLogout"
            class="logout-btn"
          >
            退出登录
          </el-button>
        </div>
      </div>
    </el-card>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userInfo = ref({
  username: '测试用户',
  avatar: ''
})

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
const hotPosts = ref([
  { id: 1, title: 'Vue3最佳实践', views: 1520, likes: 245 },
  { id: 2, title: 'SpringBoot技巧分享', views: 980, likes: 182 }
])
</script>

<style scoped>
.hot-container {
  padding: 20px;
}
.post-card {
  margin: 15px 0;
}
.user-card {
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}
.logout-btn {
  margin-top: 10px;
}
</style>