<template>
  <div class="separator">
            <img src="../assets/个人中心.svg" alt="Milho Separator" class="separator-image" />
            <h2>{{ user.username }}的主页</h2>
          </div>
  <el-container class="profile-container">
    <el-aside width="350px" class="left-panel">
      <el-card class="user-info-card">
        <div class="user-header">
          <el-avatar :size="100" />
          <h3>{{ user.username }}</h3>
          <p>现居地{{ user.registerDate }}</p>
          <p>岗位或攻读学位{{ user.registerDate }}</p>
          <p>用户简介{{ user.registerDate }}</p>
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
        <el-button type="success" round class="siliao" @click="ask">问个问题</el-button>
      </el-card>
    </el-aside>

    <el-main class="right-panel">
      <el-card class="post-list-card">
        <h3>他的文章</h3>
        <el-card 
          v-for="post in userPosts" 
          :key="post.id"
          class="post-item"
          @click="$router.push(`/article/${post.id}`)"
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
        <!-- <el-pagination
          layout="prev, pager, next"
          :total="50"
          class="pagination"
        /> -->
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const ask=()=>{
  router.push('/Chat');
}
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
.separator{
  width: 90%;
  height: 100px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 20px auto;
  /* background-color: #FFA500; */
  border-radius: 30px;
  padding: 10px;
  border-bottom: 5px solid #FFA500;
}
.separator h2{
  margin-left: 20px;
  font-size: 40px;
  font-weight: bold;
  font-style: normal;
  color: #333;
  text-align: left;
  text-transform: none;
  letter-spacing: 1px;
  line-height: 0;
}

.separator-image {
  max-width: 80px; 
  height: auto;
}
.siliao{
  margin: 20px;
  margin-left: 35%;
}
.right-panel{
  margin-left: 20px;
  padding:20px;
  margin-top: 20px;
}
.profile-container {
  padding: 20px;
}
.user-info-card {
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.user-info-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
.user-header {
  text-align: center;
  padding: 20px 0;
}
.user-header h3 {
  margin: 15px 0 5px;
  color: #303133;
}
.stat-item {
  text-align: center;
  padding: 15px;
  transition: all 0.3s;
}
.stat-item:hover {
  background-color: #f2f6fc;
  border-radius: 8px;
}
.stat-value {
  font-size: 24px;
  display: block;
  font-weight: 600;
  color: #409eff;
}
.stat-label {
  color: #909399;
  font-size: 14px;
}
.post-list-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding:20px
}
.post-item {
  margin: 16px 0;
  border-radius: 12px;
  transition: all 0.3s;
  border: 1px solid #ebeef5;
  background-color: #fff;
}
.post-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  cursor: pointer;
}
.post-header {
  padding: 16px 20px 0;
}
.post-header h4 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 8px;
}
.post-meta {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.post-meta span {
  font-size: 14px;
  color: #909399;
  margin-right: 12px;
}
.post-excerpt {
  color: #606266;
  margin: 0 20px 16px;
  font-size: 15px;
  line-height: 1.6;
}
.pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>
