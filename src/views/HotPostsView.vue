<template>
  <el-container class="hot-container">
    <el-aside width="240px" class="left-aside">
      <el-card class="hot-topics-card" >
        <h3 class="section-title">热门话题</h3>
        <div class="tags-container">
          <el-tag
            v-for="tag in [...new Set(['Vue3', 'SpringBoot', '微服务'])]"
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
        <el-card v-for="post in filteredPosts" :key="post.articleId" class="post-card" @click="handlePostClick(post.articleId)">
          <div class="post-header">
            <h3>{{ post.title }}</h3>
            <p class="post-content">{{ post.summary }}</p>
            <div class="post-image">
            <img :src=post.cover alt="帖子配图">
          </div>
          <div class="post-meta2">
              <el-tag
                v-for="tag in post.tags"
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

const filteredPosts = computed(() => {
  let filtered = posts.value
  
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(post => 
      post.tags.some(tag => selectedTags.value.includes(tag))
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

onMounted(async () => {
  try {
    const response = await axios.get('/api/forum/loadArticle')
//     const response = {
//     "status": "success",
//     "code": 200,
//     "info": "请求成功",
//     "data": {
//         "totalCount": 18,
//         "pageSize": 15,
//         "pageNo": 1,
//         "pageTotal": 2,
//         "list": [
//             {
//                 "articleId": "RtiXj832TFL4nhW",
//                 "boardId": 10003,
//                 "boardName": "Vue",
//                 "pBoardId": 10000,
//                 "pBoardName": "前端",
//                 "userId": "1890524956",
//                 "nickName": "测试账号",
//                 "userIpAddress": "未知",
//                 "title": "第一个帖子，带图，带附件",
//                 "cover": "202301/8Hyca1SDrUWhBRy.jpeg",
//                 "content": null,
//                 "summary": "第一个帖子，带图，带附件，这里是摘要",
//                 "postTime": "2023-01-15 18:01:23",
//                 "readCount": 103,
//                 "goodCount": 1,
//                 "commentCount": 4,
//                 "topType": 0,
//                 "attachmentType": 1,
//                 "status": 1
//             },
//             {
//                 "articleId": "7QdXp0FkOIyJAsG",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "同样是光头造型，把刘学义茅子俊边程放一起，差别就出来了",
//                 "cover": null,
//                 "content": null,
//                 "summary": "《少年歌行》剧版上线，豆瓣开分7.3，相信有数不清的书粉、漫粉慕名而来。圈里有这么一句大家都认同的老话，是说一部优秀的作品，原著是天，漫改是地，剧版则是毁天又灭地。那到底这部剧拍出来精髓还剩了多少？",
//                 "postTime": "2023-01-16 10:01:14",
//                 "readCount": 4,
//                 "goodCount": 1,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "foP3hhNAJTVCQYz",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "新射雕英雄传：梅超风路透，孟子义散发超美，洪七公南帝路透！",
//                 "cover": "202301/qkq0V8xvwQ8pQ4m.png",
//                 "content": null,
//                 "summary": "新版的射雕英雄传《金庸武侠世界》，目前还在拍摄中。一共有5个单元，请来了很多大家熟悉的演员",
//                 "postTime": "2023-01-16 09:58:54",
//                 "readCount": 78,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "V4a8RUmYw6X9R0y",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "投资仅850万，翻拍战狼，一上映就夺冠，于荣光带来一部生猛新片",
//                 "cover": "202301/8nsyR6wYBFi2wBL.png",
//                 "content": null,
//                 "summary": "近些年的内地电影市场，线下院线的发展有所停滞，但是网大电影似乎迎来了一波发展高潮，众多明星都开始转型拍摄网大电影",
//                 "postTime": "2023-01-16 10:01:43",
//                 "readCount": 56,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "kFmzzykJHesxjuv",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "金庸笔下，若把射雕三男主vs天龙三兄弟，哪个更厉害？",
//                 "cover": "202301/kOL99fdJztTWTa1.png",
//                 "content": null,
//                 "summary": "金庸先生一生写了多篇武侠小说，而最有影响力的莫过于《天龙八部》与“射雕三部曲”共四部小说。这四部小说不断被翻拍为影视作品，活跃在大众视野之下",
//                 "postTime": "2023-01-16 10:09:28",
//                 "readCount": 52,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "U2zRa4cFPwLF4rR",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "38岁凤姐现状：异国他乡漂泊十年，孤苦无依，网友“自作自受”",
//                 "cover": "202301/M5Apq2fXSfqQ9Lu.png",
//                 "content": null,
//                 "summary": "在贴吧和博客刚刚诞生的那几年，一位凹着“S型”造型的美女，横空出世，她就是来自陕西的芙蓉姐姐。",
//                 "postTime": "2023-01-16 10:00:18",
//                 "readCount": 45,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "sgXFWoQx4Fn3BsN",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "连续9天拿下收视冠军！久违的谭松韵一出手，就是国剧天花板！",
//                 "cover": "202301/OazOPuaQnfmpJcF.png",
//                 "content": null,
//                 "summary": "20岁，她在《甄嬛传》中演豆蔻少女“淳贵人”，少女的天真烂漫被她完美诠释，从而收获首波关注。",
//                 "postTime": "2023-01-16 09:59:37",
//                 "readCount": 42,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "gWiZMhCluNCfYRR",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "外媒镜头里的国内女星，简直堪比照妖镜：刘亦菲美的太不真实",
//                 "cover": "202301/2lR1QAS78RUrdX4.png",
//                 "content": null,
//                 "summary": "拍照五分钟，P图两小时，想要青春永驻、容颜不老，P图和美颜技术必须要好",
//                 "postTime": "2023-01-16 09:58:13",
//                 "readCount": 23,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "Qyj3cTZFfhO3wZM",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "在拍戏的过程中我们真的很爱对方”，张彬彬为什么这样说",
//                 "cover": "202301/d7eGKIvOtsBUFUo.png",
//                 "content": null,
//                 "summary": null,
//                 "postTime": "2023-01-16 10:05:02",
//                 "readCount": 10,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "QbanyzWzq3XV5KU",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "华为二公主姚安娜赢麻了！带资进组做配角，演技自然收获一致好评",
//                 "cover": "202301/nxUQw81IuTtUYCU.png",
//                 "content": null,
//                 "summary": "由刘亦菲和李现合作出演的电视剧《去有风的地方》正在热播中，据悉这是神仙姐姐刘亦菲首部现代剧，自从刘亦菲主演的",
//                 "postTime": "2023-01-16 09:57:32",
//                 "readCount": 7,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "HBNzH4CgFsitvtf",
//                 "boardId": 0,
//                 "boardName": "",
//                 "pBoardId": 10002,
//                 "pBoardName": "摸鱼",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "赵樱子的演技，好吗？吴镇宇的不鼓掌就是最好的回答",
//                 "cover": null,
//                 "content": null,
//                 "summary": "赵樱子身穿乞丐服，化着乞丐的妆容，扮演起了娇俏可人的黄蓉。",
//                 "postTime": "2023-01-16 10:02:53",
//                 "readCount": 5,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "NaU1ktjwN7h0EHf",
//                 "boardId": 10003,
//                 "boardName": "Vue",
//                 "pBoardId": 10000,
//                 "pBoardName": "前端",
//                 "userId": "1890524956",
//                 "nickName": "测试账号",
//                 "userIpAddress": "未知",
//                 "title": "创建一个应用",
//                 "cover": "202301/iqlAZcksrj7NaDd.png",
//                 "content": null,
//                 "summary": "",
//                 "postTime": "2023-01-16 09:31:13",
//                 "readCount": 5,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "D3fj3tiHMCpDubm",
//                 "boardId": 10003,
//                 "boardName": "Vue",
//                 "pBoardId": 10000,
//                 "pBoardName": "前端",
//                 "userId": "1890524956",
//                 "nickName": "测试账号",
//                 "userIpAddress": "未知",
//                 "title": "Class 与 Style 绑定",
//                 "cover": null,
//                 "content": null,
//                 "summary": null,
//                 "postTime": "2023-01-16 09:35:14",
//                 "readCount": 1,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "f9xkyY6K6mZZ41G",
//                 "boardId": 10003,
//                 "boardName": "Vue",
//                 "pBoardId": 10000,
//                 "pBoardName": "前端",
//                 "userId": "7437465925",
//                 "nickName": "测试账号02",
//                 "userIpAddress": "未知",
//                 "title": "条件渲染",
//                 "cover": null,
//                 "content": null,
//                 "summary": "令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。",
//                 "postTime": "2023-01-16 09:55:37",
//                 "readCount": 1,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             },
//             {
//                 "articleId": "odFjtwnRa5pVvD8",
//                 "boardId": 10003,
//                 "boardName": "Vue",
//                 "pBoardId": 10000,
//                 "pBoardName": "前端",
//                 "userId": "1890524956",
//                 "nickName": "测试账号",
//                 "userIpAddress": "未知",
//                 "title": "计算属性",
//                 "cover": null,
//                 "content": null,
//                 "summary": null,
//                 "postTime": "2023-01-16 09:34:52",
//                 "readCount": 1,
//                 "goodCount": 0,
//                 "commentCount": 0,
//                 "topType": 0,
//                 "attachmentType": 0,
//                 "status": 1
//             }
//         ]
//     }
// }
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