<template>
  <el-container class="profile-container">
    <el-aside width="300px" class="left-panel">
      <el-card class="user-info-card">
        <div class="user-header">
          <el-avatar :size="100" />
          <h3>{{ user.username }}</h3>
          <p>注册时间：{{ user.registerDate }}</p>
        </div>
        <el-divider />
        <div class="user-stats">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="stat-item">
                <span class="stat-value">{{ user.postCount }}</span>
                <span class="stat-label">发帖数</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="stat-item">
                <span class="stat-value">{{ user.followers }}</span>
                <span class="stat-label">粉丝数</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-aside>

    <el-main class="right-panel">
      <el-card class="post-list-card">
        <h3>我的帖子</h3>
        <el-card 
          v-for="post in userPosts" 
          :key="post.id"
          class="post-item"
        >
          <div class="post-header">
            <h4>{{ post.title }}</h4>
            <div class="post-meta">
              <span>{{ post.createTime }}</span>
              <el-tag type="info">{{ post.category }}</el-tag>
            </div>
          </div>
          <p class="post-excerpt">{{ post.excerpt }}</p>
        </el-card>
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          class="pagination"
        />
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  username: '示例用户',
  registerDate: '2023-01-01',
  postCount: 15,
  followers: 234
})

const userPosts = ref([
  {
    id: 1,
    title: 'Vue3组件设计实践',
    createTime: '2023-03-15',
    category: '前端开发',
    excerpt: '本文主要探讨Vue3组合式API在复杂组件中的应用...'
  },
  {
    id: 2,
    title: '微服务架构设计模式',
    createTime: '2023-02-28',
    category: '后端架构',
    excerpt: '分布式系统中常见的服务通信模式分析...'
  }
])
</script>

<style scoped>
.profile-container {
  padding: 20px;
}
.user-info-card {
  margin-bottom: 20px;
}
.user-header {
  text-align: center;
}
.stat-item {
  text-align: center;
  padding: 10px;
}
.stat-value {
  font-size: 24px;
  display: block;
}
.stat-label {
  color: #666;
}
.post-item {
  margin: 10px 0;
}
.post-excerpt {
  color: #666;
  margin-top: 8px;
}
</style>