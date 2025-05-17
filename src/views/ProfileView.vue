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
            <h3 class="username">昵称:{{ userInfo.nickName }}</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">真实姓名：</span>
                <span class="value">{{ userInfo.realName }}</span>
              </div>
              <div class="info-item">
                <span class="label">账号ID：</span>
                <span class="value">{{ userInfo.account }}</span>
              </div>
              <div class="info-item">
                <span class="label">现居地：</span>
                <span class="value">{{userInfo.province}}{{userInfo.location }}</span>
              </div>
              <div class="info-item">
                <span class="label">研究方向</span>
                <span class="value">{{ userInfo.occupation }}</span>
              </div>
              <div class="info-item">
                <span class="label">工作岗位：</span>
                <span class="value">{{ userInfo.degree }}</span>
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
        <h3 class="section-title">{{userInfo.personDescription}}</h3>
      </el-card>
     
    </div>
    <el-card class="posts-card" :style="{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '12px' }">
        <h3 class="section-title">我的帖子</h3>
        <div class="posts-grid">
          <el-card 
            v-for="post in myPosts" 
            :key="post.articleId" 
            class="post-item" 
            :style="{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderRadius: '12px' }"
            @click="$router.push(`/article/${post.articleId}`)"
            style="cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
          >
            <div class="post-header">
              <h4 class="post-title" style="font-size: 1.2rem; color: #1a73e8; margin-bottom: 0.8rem;">{{ post.title }}</h4>
              <p class="post-content" style="font-size: 0.95rem; color: #5f6368; line-height: 1.6; margin-bottom: 1rem;">{{ post.summary }}</p>
              <div class="post-tags" style="margin-bottom: 1rem;">
                <el-tag 
                  v-for="tag in post.tag" 
                  :key="tag" 
                  size="small" 
                  style="margin-right: 0.5rem;"
                >
                  {{ tag }}
                </el-tag>
              </div>
              <div class="post-meta" style="display: flex; justify-content: space-between; align-items: center;">
                <span class="post-date" style="font-size: 0.85rem; color: #70757a;">发布时间：{{ post.postTime }}</span>
                <div>
                  <span style="font-size: 0.85rem; color: #70757a; margin-right: 1rem;">阅读: {{ post.readCount }}</span>
                  <span style="font-size: 0.85rem; color: #70757a;">点赞: {{ post.goodCount }}</span>
                </div>
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
    <div v-show="showEditForm || showPasswordForm" class="mask">
      <div v-show="showEditForm" class="mask-content">
        <el-form :model="editForm" label-width="80px" class="edit-form">
          <el-form-item label="昵称">
            <el-input v-model="editForm.nickName" />
          </el-form-item>
          <el-form-item label="省份">
            <el-input v-model="editForm.province" />
          </el-form-item>
          <el-form-item label="现居地">
            <el-input v-model="editForm.location" />
          </el-form-item> 
          <el-form-item label="zhiye">
            <el-input v-model="editForm.occupation" />
          </el-form-item>
          <el-form-item label="工作岗位">
            <el-input v-model="editForm.jobTitle" />
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="editForm.degree" />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="editForm.personDescription" type="textarea" :rows="3" />
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
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.post-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12) !important;
  border-color: rgba(66, 133, 244, 0.2);
}

.post-title {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #1a73e8;
  font-weight: 500;
}

.post-content {
  font-size: 0.95rem;
  color: #5f6368;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-date {
  font-size: 0.85rem;
  color: #70757a;
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
const fetchUserData = async () => {
  try {
    const response = await axios.post('/api/getUserInfo', {
      params: {
        userId: localStorage.getItem('userID')
      }
    })
    userInfo.value = {
      ...response.data.data,
    }
    console.log('用户信息:', userInfo.value)
    editForm.value = {
      nickName: userInfo.value.nickName,
      province: userInfo.value.province,
      location: userInfo.value.location,
      occupation: userInfo.value.occupation,
      jobTitle: userInfo.value.jobTitle,
      degree: userInfo.value.degree,
      personDescription: userInfo.value.personDescription
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败: ' + error.message)
  }
}

const fetchPostsData = async () => {
  try {
    const response = await axios.get('/api/ucenter/loadUserArticle',
      {
        params: {
          userId: localStorage.getItem('userID'),
          type:0,
        }
      }
    )
    myPosts.value = response.data.data.list
    console.log('帖子信息:', myPosts.value)
  } catch (error) {
    ElMessage.error('获取帖子列表失败: ' + error.message)
  }
}
const userInfo = ref(
  {
    "nickName": "emma_w",
    "province": "陕西省",
    "userId": "6943225789",
    "account": "2023317220307",
    "realName": "肖明煊",
    "location": "西安市",
    "occupation": "生物信息学",
    "jobTitle": null,
    "degree": "生物信息学博士",
    "avatar": null,
    "personDescription": "探索生命科学的奥秘",
    "joinTime": "2025-04-25T08:36:56.000+00:00",
    "admin": false
}
)

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const showEditForm = ref(false)
const editForm = ref({
  nickName: userInfo.nickName,
  location: userInfo.value.location,
  province: userInfo.value.province,
  occupation: userInfo.value.occupation,
  jobTitle: userInfo.value.jobTitle,
  degree: userInfo.value.degree,
  personDescription: userInfo.value.personDescription
})
const showPasswordForm = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const handleEditInfo = async () => {
  try {
const response = await axios.post('/api/ucenter/updateUserInfo', {
    nickName: editForm.value.nickName,
    province: editForm.value.province,
    location: editForm.value.location,
    occupation: editForm.value.occupation,
    jobTitle: editForm.value.jobTitle,
    degree: editForm.value.degree,
    personDescription: editForm.value.personDescription
  
})
    
    if (response.data.code === 200) {
      ElMessage.success('用户信息更新成功')
      setTimeout(() => {
        const response =  axios.post('/api/getUserInfo', {
      params: {
        userId: localStorage.getItem('userID')
      }
    })
    userInfo.value = {
      ...response.data.data,
    }
      },1000)
      showEditForm.value = false
      handleLogout();
    } else {
      ElMessage.error(response.data.message || '更新用户信息失败')
    }
  } catch (error) {
    ElMessage.error('网络错误: ' + error.message)
  }
}

const handleChangePassword = () => {
  // 密码修改逻辑
  console.log('修改密码:', passwordForm.value)
}
const myPosts = ref([
  {
    "articleId": "7QdXp0FkOIyJAsG",
    "boardId": null,
    "boardName": "",
    "pBoardId": null,
    "pBoardName": "",
    "userId": "0796700655",
    "nickName": "alice_2023",
    "userIpAddress": "未知",
    "title": "[算法基础] 递归算法入门：从斐波那契数列到汉诺塔",
    "cover": null,
    "content": null,
    "summary": "深入浅出解析递归算法的核心思想与实现技巧。",
    "postTime": "2023-01-16 10:01:14",
    "readCount": 8,
    "goodCount": 2,
    "commentCount": 0,
    "topType": 0,
    "attachmentType": 0,
    "status": 1,
    "tag": [
      "算法",
      "编程",
      "基础",
      "递归"
    ]
  },
  {
    "articleId": "D3fj3tiHMCpDubm",
    "boardId": null,
    "boardName": "",
    "pBoardId": null,
    "pBoardName": "",
    "userId": "0796700655",
    "nickName": "alice_2023",
    "userIpAddress": "未知",
    "title": "如何设计一个高并发的分布式系统？",
    "cover": null,
    "content": null,
    "summary": "探讨分布式系统设计的核心原则与实践经验。",
    "postTime": "2023-01-16 09:35:14",
    "readCount": 1,
    "goodCount": 0,
    "commentCount": 0,
    "topType": 0,
    "attachmentType": 0,
    "status": 1,
    "tag": [
      "分布式系统",
      "高并发",
      "架构设计",
      "云计算"
    ]
  }
])



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