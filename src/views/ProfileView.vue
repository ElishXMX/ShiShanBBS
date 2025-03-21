<template>
  个人中心
  <div class="hot-container">
    
    <el-card class="user-card">
      <div class="user-info">
        <el-avatar :size="60" />
        <div class="user-meta">
          <h3>用户名：{{ userInfo.username }}</h3>
          <p>真实姓名：{{ userInfo.realName }}</p>
          <p>账号ID：{{ userInfo.userId }}</p>
          <p>现居地：{{ userInfo.location }}</p>
          <p>职业：{{ userInfo.occupation }}</p>
          <p>工作岗位：{{ userInfo.jobTitle }}</p>
          <el-button type="primary" @click="showEditForm = !showEditForm">修改基本信息</el-button>
          <el-button 
            type="danger" 
            @click="handleLogout"
            class="logout-btn"
          >
            退出登录
          </el-button>
          <el-button type="primary" @click="showPasswordForm = !showPasswordForm">修改密码</el-button>
        </div>
      </div>
    </el-card>
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

    <el-card class="my-posts">
      <h3>我的帖子</h3>
      <el-card 
        v-for="post in myPosts" 
        :key="post.id"
        class="post-item"
      >
        <div class="post-header">
          <h4>{{ post.title }}</h4>
          <p class="post-content">{{ post.content }}</p>
          <div class="post-meta">
            <span>发布时间：{{ post.createTime }}</span>
          </div>
        </div>
      </el-card>
      <el-pagination
        layout="prev, pager, next"
        :total="myPosts.length"
        class="pagination"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userInfo = ref({
  userId: 12345,
  realName: '张三',
  location: '北京',
  occupation: '前端工程师',
  jobTitle: '高级开发工程师',
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