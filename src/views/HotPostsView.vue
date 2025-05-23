<template>
  <el-container class="hot-container">
    <el-aside width="240px" class="left-aside">
      <el-card class="hot-topics-card" >
        <h3 class="section-title">热门话题</h3>
        <div class="tags-container">
          <el-tag
            v-for="tag in uniqueTags"
            :key="tag"
            class="topic-tag"
            :effect="selectedTags.includes(tag) ? 'dark' : 'light'"
            :type="selectedTags.includes(tag) ? 'success' : 'success'"
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
        <el-card v-for="post in paginatedPosts" :key="post.articleId" class="post-card" @click="handlePostClick(post.articleId)">
          <div class="post-header">
            <h3>{{ post.title }}</h3>
            <p class="post-content">{{ post.summary }}</p>
            <div class="post-image">
            <img :src=post.cover alt="帖子配图">
          </div>
          <div class="post-meta2">
              <el-tag
                v-for="tag in post.tag"
                :key="tag"
                class="post-tag"
                effect="dark"
                type="info"
                size="small"
              >
                {{ tag }}
              </el-tag>
            </div>
            <div class="post-meta">
              <span>作者：{{ post.nickName }}</span>
              <span>时间：{{ post.postTime }}</span>
            </div>
          </div>
          
        </el-card>
        <el-pagination
          layout="prev, pager, next"
          :total="filteredPosts.length"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          class="pagination"
        />
      </div>
      </el-card>
    </el-main>
    
  </el-container>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounce } from '@/utils/useDebounce'
import axios from 'axios'

const router = useRouter()
const searchKeyword = ref('')

const selectedTags = ref([])

const handleTagClick = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

const handleSearch = useDebounce(() => {
  // 防抖处理后的搜索逻辑
}, 300)

const uniqueTags = computed(() => {
  const allTags = []
  for (let i = 0; i < posts.value.length; i++) {
    const post = posts.value[i]
    if (post.tag && Array.isArray(post.tag)) {
      for (let j = 0; j < post.tag.length; j++) {
        allTags.push(post.tag[j])
      }
    }
  }
  return [...new Set(allTags)]
})

const filteredPosts = computed(() => {
  let filtered = posts.value
  
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(post => 
      post.tag.some(tag => selectedTags.value.includes(tag))
    )
  }
  
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(keyword)
    )
  }
  
  return filtered
})

const handlePostClick = (postId) => {
  console.log(`点击了文章：${postId}`)
  router.push(`/article/${postId}`)
}
const posts = ref('')
const currentPage = ref(1)
const pageSize = ref(2)

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const handleSizeChange = (val) => {
  pageSize.value = val
}

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPosts.value.slice(start, end)
})




onMounted(async () => {
  try {
    const response = await axios.get('/api/forum/loadArticle')
    posts.value = response.data.data.list
    console.log('获取到的帖子数据:', posts.value)
  } catch (error) {
    console.error('获取热门帖子失败:', error)
  }
})
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
  cursor: pointer;
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
  gap: 16px;
  margin-bottom: 16px;
  min-height: 200px;
}

.post-header h3 {
  grid-row: 1;
  grid-column: 1 / -1;
  font-size: 18px;
  margin: 0;
  color: #333;
}

.post-content {
  grid-row: 2;
  grid-column: 1;
  align-self: start;
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.post-image {
  grid-row: 2;
  grid-column: 2;
  margin: 0;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.post-meta .post-meta2{
  grid-row: 3;
  grid-column: 1 / -1;
  align-self: end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.post-tag {
  margin-right: 8px;
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
  margin-right: 100px;
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
  left: 0;
  right: 0;
}
.post-list {
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  /* padding: 20px; */
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 2px 8px rgba(0,0,0,0.1); */
  margin: 20px 0;
  max-height: 800px;
}
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
  cursor: pointer;
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
  gap: 16px;
  margin-bottom: 16px;
  min-height: 200px;
}

.post-header h3 {
  grid-row: 1;
  grid-column: 1 / -1;
  font-size: 18px;
  margin: 0;
  color: #333;
}

.post-content {
  grid-row: 2;
  grid-column: 1;
  align-self: start;
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.post-image {
  grid-row: 2;
  grid-column: 2;
  margin: 0;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.post-meta .post-meta2{
  grid-row: 3;
  grid-column: 1 / -1;
  align-self: end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.post-tag {
  margin-right: 8px;
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
  bottom: -10px;
  left: 0;
  right: 0;
}
</style>