<template>
  <div class="separator">
            <img src="../assets/主页.svg" alt="Milho Separator" class="separator-image" />
            <h2>我的主页</h2>
          </div>
  <div class="profile-container">
    <div class="grid-container">
      <el-card class="user-card" :style="{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '12px' }">
        <div class="user-info">
          <el-avatar :size="80" />
          <div class="user-meta">
            <img 
              src="../assets/老师教师男人.svg" 
              alt="用户头像" 
              class="user-avatar" 
              :style="{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }"
            />
            <h3 class="username">{{ userInfo.username }}</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">真实姓名：</span>
                <span class="value">{{ userInfo.realName }}</span>
              </div>
              <div class="info-item">
                <span class="label">账号ID：</span>
                <span class="value">{{ userInfo.userId }}</span>
              </div>
              <div class="info-item">
                <span class="label">现居地：</span>
                <span class="value">{{ userInfo.location }}</span>
              </div>
              <div class="info-item">
                <span class="label">职业：</span>
                <span class="value">{{ userInfo.occupation }}</span>
              </div>
              <div class="info-item">
                <span class="label">工作岗位：</span>
                <span class="value">{{ userInfo.jobTitle }}</span>
              </div>
            </div>
            <div class="action-buttons">
              <el-button type="primary" @click="showEditForm = !showEditForm" round>修改基本信息</el-button>
              <el-button type="danger" @click="handleLogout" round>退出登录</el-button>
              <el-button type="primary" @click="showPasswordForm = !showPasswordForm" round>修改密码</el-button>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="posts-card" :style="{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '12px' }">
        <h3 class="section-title">我的简介</h3>
      </el-card>
      <el-card class="posts-card" :style="{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '12px' }">
        <h3 class="section-title">我的帖子</h3>
        <div class="posts-grid">
          <el-card 
            v-for="post in myPosts" 
            :key="post.id" 
            class="post-item" 
            :style="{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }"
            @click="$router.push(`/article/${post.id}`)"
            style="cursor: pointer; transition: all 0.3s ease"
          >
            <div class="post-header">
              <h4 class="post-title">{{ post.title }}</h4>
              <p class="post-content">{{ post.content }}</p>
              <div class="post-meta">
                <span class="post-date">发布时间：{{ post.createTime }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="myPosts.length"
          class="pagination"
        />
      </el-card>
    </div>
    <div v-show="showEditForm || showPasswordForm" class="mask">
      <div v-show="showEditForm" class="mask-content">
        <el-form :model="editForm" label-width="80px" class="edit-form">
          <el-form-item label="真实姓名">
            <el-input v-model="editForm.realName" />
          </el-form-item>
          <el-form-item label="现居地">
            <el-input v-model="editForm.location" />
          </el-form-item>
          <el-form-item label="职业">
            <el-input v-model="editForm.occupation" />
          </el-form-item>
          <el-form-item label="工作岗位">
            <el-input v-model="editForm.jobTitle" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleEditInfo">保存</el-button>
            <el-button @click="showEditForm = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="mask-content" v-show="showPasswordForm">
        <el-form v-show="showPasswordForm" :model="passwordForm" label-width="80px" class="password-form">
          <el-form-item label="原密码">
            <el-input v-model="passwordForm.oldPassword" type="password" />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="passwordForm.newPassword" type="password" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="passwordForm.confirmPassword" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showPasswordForm = !showPasswordForm">确认密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

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
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.user-card {
  padding: 1.5rem;
}

.user-info {
  display: flex;
  gap: 1.5rem;
}

.user-meta {
  flex: 1;
}

.username {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #303133;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
}

.label {
  color: #606266;
}

.value {
  color: #303133;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.posts-card {
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #303133;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
}

.post-item {
  padding: 1rem;
  transition: transform 0.2s ease;
}

.post-item:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
}

.post-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #303133;
}

.post-content {
  font-size: 0.9rem;
  color: #606266;
  margin-bottom: 0.75rem;
}

.post-date {
  font-size: 0.8rem;
  color: #909399;
}

.pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.mask-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
}

.edit-form,
.password-form {
  margin-top: 1rem;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
//挂载时获取用户信息和帖子信息

const userInfo = ref({
  userId: 12345,//自动生成,八位
  username: '用户12138',
  realName: '张三',
  location: '北京',
  occupation: '前端工程师',//研究方向
  jobTitle: '高级开发工程师',//和学位二选一
  degree:'',//攻读学位
  avatar: '',//头像,
  createTime: '2023-10-01',
  profile:'',//简介,很多字
})

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const showEditForm = ref(false)
const editForm = ref({
  realName: '',
  location: '',
  occupation: '',
  jobTitle: ''
})
const showPasswordForm = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const handleEditInfo = () => {
  userInfo.value.realName = editForm.value.realName
  userInfo.value.location = editForm.value.location
  userInfo.value.occupation = editForm.value.occupation
  userInfo.value.jobTitle = editForm.value.jobTitle
  showEditForm.value = false
}

const handleChangePassword = () => {
  // 密码修改逻辑
  console.log('修改密码:', passwordForm.value)
}
const myPosts = ref([
  { 
    id: 1, 
    title: 'Vue3最佳实践', 
    content: '本文详细讲解Vue3的组合式API使用技巧...',
    createTime: '2023-10-01'
  },
  {
    id: 2,
    title: 'SpringBoot技巧分享',
    content: '分享SpringBoot开发中的实用技巧...',
    createTime: '2023-09-25'
  }
])

const fetchUserData = async () => {
  try {
    const response = await axios.get('/api/getUserInfo')
    userInfo.value = {
      ...response.data,
      userId: response.data.id || userInfo.value.userId
    }
    editForm.value = {
      realName: response.data.realName,
      location: response.data.location,
      occupation: response.data.occupation,
      jobTitle: response.data.jobTitle
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败: ' + error.message)
  }
}

const fetchPostsData = async () => {
  try {
    // const response = await axios.get('/api/user/posts')
    myPosts.value = response.data
  } catch (error) {
    ElMessage.error('获取帖子列表失败: ' + error.message)
  }
}

onMounted(() => {
  fetchUserData()
  fetchPostsData()
})
</script>

<style scoped>
.hot-container {
  padding: 20px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.mask-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
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
.password-form {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}
.my-posts {
  margin-top: 20px;
}
.post-item {
  margin-bottom: 15px;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>