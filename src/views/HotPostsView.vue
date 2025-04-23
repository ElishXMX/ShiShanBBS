<template>
  <el-container class="hot-container">
    <el-aside width="240px" class="left-aside">
      <el-card class="hot-topics-card" >
        <h3 class="section-title">热门话题</h3>
        <div class="tags-container">
          <el-tag
            v-for="tag in ['Vue3', 'SpringBoot', '微服务','SpringBoot','SpringBoot','SpringBoot']"
            :key="tag"
            class="topic-tag"
            effect="dark"
            @click="handleTagClick(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <div class="separator">
          <img src="../assets/文章.svg" alt="Milho Separator" class="separator-image" />
          <h2>热帖排行</h2>
        </div>
      <el-card class="main-card">
        <div class="search-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索文章标题"
          clearable
          @input="handleSearch"
          style="width: 80%"
          class="searchInput"
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="post-list">
        <el-card v-for="post in filteredPosts" :key="post.id" class="post-card" @click="handlePostClick(post.id)">
          <div class="post-header">
            <h3>{{ post.title }}</h3>
            <p class="post-content">{{ post.content }}</p>
            <div class="post-image">
            <img :src="post.imageUrl" alt="帖子配图">
          </div>
            <div class="post-meta">
              <span>作者：{{ post.author }}</span>
              <span>时间：{{ post.time }}</span>
            </div>
          </div>
          
        </el-card>
        <el-pagination
          layout="prev, pager, next"
          :total="filteredPosts.length"
          class="pagination"
        />
      </div>
      </el-card>
    </el-main>
    <el-aside width="200px" class="right-aside">
      <el-card>
        <div class="user-panel">
        <h3>我的信息</h3>
        <el-avatar :size="80" />
        <p>用户名：访客</p>
        <p>积分：0</p>
        <el-button type="text">查看资料</el-button>
      </div>
      </el-card>
    </el-aside>
  </el-container>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounce } from '@/utils/useDebounce'

const router = useRouter()
const searchKeyword = ref('')

const handleSearch = useDebounce(() => {
  // 防抖处理后的搜索逻辑
}, 300)

const filteredPosts = computed(() => {
  if (!searchKeyword.value) return posts.value
  const keyword = searchKeyword.value.toLowerCase()
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(keyword)
  )
})

const handlePostClick = (postId) => {
  console.log(`点击了文章：${postId}`)
  router.push(`/article`)
}
const posts = ref([
  { 
    id: 1, 
    title: 'Vue3最佳实践',
    content: '本文详细讲解Vue3的组合式API使用技巧...',
    views: 1520,
    likes: 245,
    imageUrl: '..\assets\photo\image.png'
  },
  {
    id: 2, 
    title: 'SpringBoot技巧分享',
    content: '深入探讨SpringBoot自动配置原理...',
    views: 980,
    likes: 182,
    imageUrl: '@/assets/post2.jpg'
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
.hot-topics-card{
  display: flex;
  justify-content: center;
  align-items: center
}

.hot-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  margin: auto;
  width: 300px;
}

.search-bar .el-input__wrapper {
  border-radius: 20px;
  padding: 4px 15px;
}

.post-card {
  margin: 15px 0;
  padding:20px;
  border-radius: 20px;
}

.post-content {
  flex: 1;
  min-width: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: 4.5em;
}

.post-header {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 200px;
  gap: 12px;
  margin-bottom: 12px;
  min-height: 180px;
}

.post-header h3 {
  grid-row: 1;
  grid-column: 1 / -1;
}

.post-content {
  grid-row: 2;
  grid-column: 1;
  align-self: start;
}

.post-image {
  grid-row: 2;
  grid-column: 2;
  margin: 0;
}

.post-meta {
  grid-row: 3;
  grid-column: 1 / -1;
  align-self: end;
}

@media (max-width: 768px) {
  .post-header {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
  }
  
  .post-image {
    grid-row: 2;
    grid-column: 1;
    height: 150px;
    width: 100%;
  }
  
  .post-content {
    grid-row: 3;
  }
}

.post-image {
  flex: 0 0 200px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  order: 2;
  margin-left: auto;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.left-aside,.right-aside{
  margin-top: 20px;
  background-color: transparent;
  height: auto;
  margin-right: 20px;
  margin-left: 20px;
  border: 0cap;
  border-radius: 2%;
  
}
.main-card{
  margin-top: 20px;
  padding: 20px;
  border-radius: 2%;
  height:80vh
}
.searchInput{
  transition: all 0.3s ease;
}

.searchInput .el-input__wrapper {
  border: 2px solid var(--el-border-color);
  transition: all 0.3s ease;
}

.searchInput .el-input__wrapper:hover {
  border-color: var(--el-color-primary);
}

.searchInput .el-input__wrapper.is-focus {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 8px rgba(var(--el-color-primary-rgb), 0.3);
}

.searchInput .el-input__clear {
  transition: opacity 0.3s ease;
}

.searchInput .el-input__clear:hover {
  opacity: 0.8;
}
.pagination {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
}
</style>