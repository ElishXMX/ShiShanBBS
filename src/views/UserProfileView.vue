<template>
  <div class="separator">
            <img src="../assets/个人中心.svg" alt="Milho Separator" class="separator-image" />
            <h2>{{ user.nickName }}的主页</h2>
          </div>
  <el-container class="profile-container">
    <el-aside width="350px" class="left-panel">
      <el-card class="user-info-card">
        <div class="user-header">
          <img src="../assets/老师教师男人.svg" alt="用户头像" style="width: 100px; height: 100px; border-radius: 50%;" />
          <h3>{{ user.nickName }}</h3>
          <p>现居地:{{ user.location }}</p>
          <p>岗位或攻读学位:{{ user.degree }}</p>
          <p>用户简介:{{ user.personDescription }}</p>
        </div>
        <el-divider />
        <el-button type="success" round class="siliao" @click="ask">问个问题</el-button>
      </el-card>
    </el-aside>

    <el-main class="right-panel">
      <el-card class="post-list-card">
        <h3>他的文章</h3>
        <div class="post-list">
        <el-card 
          v-for="post in userPosts" 
          :key="post.articleId" 
          class="post-card" 
          @click="$router.push(`/article/${post.articleId}`)"
          shadow="hover"
        >
          <div class="post-header">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-content">{{ post.summary }}</p>
            <div class="post-image" v-if="post.cover">
              <img :src="post.cover" alt="帖子配图" style="max-width: 100%; border-radius: 8px;">
            </div>
            <div class="post-meta2">
              <el-tag
                v-for="tag in post.tag"
                :key="tag"
                class="post-tag"
                effect="dark"
                type="info"
                size="small"
                style="margin-right: 8px;"
              >
                {{ tag }}
              </el-tag>
            </div>
            <div class="post-meta">
              <span class="post-author">作者：{{ post.nickName }}</span>
              <span class="post-time">时间：{{ post.postTime }}</span>
              <span class="post-counts" style="margin-left: 12px;">
                <el-icon><View /></el-icon> {{ post.readCount }}
                <el-icon style="margin-left: 8px;"><Star /></el-icon> {{ post.goodCount }}
              </span>
            </div>
          </div>
        </el-card>
      </div>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';
const router = useRouter();
const ask=()=>{
  router.push('/Chat');
}
const user = ref({
  username: '',
  registerDate: '',
  postCount: 0,
  followers: 0
})

const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get('/api/ucenter/getUserInfo', {
      params: { userId }
    });
    return response.data.data;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    ElMessage.error('获取用户数据失败');
    throw error;
  }
};

const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get('/api/ucenter/loadUserArticle', {
      params: { 
        userId:userId,
        type:0
       }
    });
    return response.data.data.list;
  } catch (error) {
    console.error('获取用户帖子失败:', error);
    ElMessage.error('获取用户帖子失败');
    throw error;
  }
};

onMounted(async () => {
  try {
    const route = useRoute();
    user.value = await fetchUserInfo(route.params.userId);
    userPosts.value = await fetchUserPosts(route.params.userId);
    console.log(user.value,userPosts.value);
  } catch (error) {
    console.error('初始化数据失败:', error);
  }
});

const userPosts = ref([
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
.post-card {
  margin: 16px 0;
  border-radius: 12px;
  transition: all 0.3s;
  border: 1px solid #ebeef5;
  background-color: #fff;
  padding: 20px;
}
.post-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  cursor: pointer;
}
.post-header {
  padding: 16px 20px 0;
}
.post-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.post-author, .post-time {
  font-size: 14px;
  color: #909399;
  margin-right: 15px;
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
