<template>
  <div class="article-container">
    <div class="article-sidebar-left">
      <button class="outer-container" @click="handleLike">
        <div class="circle-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="26.463" height="26.647" viewBox="0 0 26.463 26.647">
                <g id="Grupo_3793" data-name="Grupo 3793" transform="translate(1.5 1.5)">
                    <path id="Trazado_28219" data-name="Trazado 28219" d="M7,10V24.188"
                        transform="translate(-1.088 -0.541)" fill="none" stroke="#000" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="3"></path>
                    <path id="Trazado_28220" data-name="Trazado 28220"
                        d="M17.37,6.587l-1.182,4.871h6.893a2.365,2.365,0,0,1,2.27,3.027L22.6,23.944a2.365,2.365,0,0,1-2.27,1.7H4.365A2.365,2.365,0,0,1,2,23.282V13.823a2.365,2.365,0,0,1,2.365-2.365H7.628a2.365,2.365,0,0,0,2.116-1.312L13.823,2A3.7,3.7,0,0,1,17.37,6.587Z"
                        transform="translate(-2 -2)" fill="none" stroke="#000" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="3"></path>
                </g>
            </svg>
        </div>
      </button>
      <button class="outer-container" @click="handleCollect">
        <div class="circle-container">
          <svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
        </div>
      </button>
      <div class="tags-container">
    <el-tag
      v-for="tag in articleInfo.tags"
      :key="tag"
      type="success"
      class="tag-item"
      effect="dark"
      round
    >
      {{ tag }}
    </el-tag>
</div>
    </div>
    <el-card class="article-card">
      <div class="article-header">
        <h1 class="article-title">{{articleInfo.title}}</h1>
        <div class="article-meta">
          <span class="author">作者：{{articleInfo.nickName}}</span>
          <span class="date">发布日期：{{articleInfo.postTime}}</span>
          <span class="views">浏览量：{{articleInfo.readCount}}</span>
          <span class="likes">点赞量：{{articleInfo.goodCount}}</span>
        </div>
      </div>
      <v-md-preview :text="articleInfo.content" class="article-content" />
    </el-card>
    <div class="article-sidebar-right">
      <div class="author-info">
        <div class="author-header" @click="goToAuthorPage">
          <el-avatar :size="60" :src="authorInfo.avatar" />
          <h3>{{authorInfo.name}}</h3>
        </div>
        <div class="author-meta">
          <p><span class="meta-label">研究方向：</span>{{authorInfo.researchField}}</p>
          <p><span class="meta-label">发表文章：</span>{{authorInfo.articlesCount}}篇</p>
          <p><span class="meta-label">粉丝数：</span>{{authorInfo.followers}}</p>
        </div>
        <p class="author-bio">{{authorInfo.bio}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.article-sidebar-left {
  width: 100px;
  margin-right: 20px;
}

.article-sidebar-left>* {
  margin-bottom: 50px;
  width: 100%;

}

.article-card {
  flex: 1;
  border-radius: 28px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  padding: 20px;
}

.article-sidebar-right {
  width: 250px;
  margin-left: 20px;
}

.author-info {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.author-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.author-header:hover {
  opacity: 0.8;
}

.author-header h3 {
  margin-left: 12px;
  font-size: 18px;
  color: #1f2d3d;
}

.author-meta {
  margin-bottom: 12px;
}

.author-meta p {
  margin-bottom: 8px;
  font-size: 14px;
  color: #5e6d82;
}

.meta-label {
  color: #99a9bf;
}

.author-bio {
  font-size: 14px;
  line-height: 1.6;
  color: #5e6d82;
}

.article-header {
  margin-bottom: 24px;
}

.article-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2d3d;
  line-height: 1.5;
  margin-bottom: 12px;
}

.article-meta {
  font-size: 14px;
  color: #99a9bf;
}
.article-meta > * {
  margin-right: 16px;
}
.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: #34495e;
  padding: 10px;
}

.article-content h1,
.article-content h2,
.article-content h3 {
  margin-top: 24px;
  margin-bottom: 16px;
  color: #1f2d3d;
}

.article-content p {
  margin-bottom: 16px;
}

.outer-container {
  width: 56px;
  height: 56px;
  overflow-x: visible;
  overflow-y: clip;
  position: relative;
  text-align: center;
  background: 0px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0;
}

.circle-container {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

  .outer-container:hover .circle-container {
      transform: scale(0.85);
      transform-origin: center;
      background-color: #fcd34d;
  }

.outer-container:active .circle-container {
    transform: scale(0.8);
    background-color: #fbbf24;
}

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 50px;
}

.tag-item {
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;
}

.tag-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

        .text-container {
            position: absolute;
            color: #4b5563;
            font-weight: 600;
            font-size: 0.875rem;
            text-align: center;
            white-space: nowrap;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            transition: all 0.3s ease;
            opacity: 0;
        }

        .outer-container:hover .text-container {
            bottom: -20px;
            opacity: 1;
        }
</style>

<script setup>
import { ref } from 'vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github'

VMdPreview.use(githubTheme)
const mdContent = ref('')

const articleInfo = ref({});
mdContent.value = articleInfo.content;
const handleLike = () => {
  // 处理点赞逻辑
  const likeButton = document.querySelector('.article-sidebar-left:nthchild(1)');
  if (likeButton) {
    likeButton.classList.toggle('active');
  }
};

const handleCollect = () => {
  // 处理收藏逻辑
  const collectButton = document.querySelector('.article-sidebar-left:nthchild(2)');
  if (collectButton) {
    collectButton.classList.toggle('active');
  }
};

const handleTagClick = (tag) => {
  // 处理标签点击逻辑
  router.push(`/tag/${tag}`);
};

// const authorInfo = {
//   id: 1,
//   name: 'Trae AI',
//   avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
//   researchField: '机器学习与深度学习',
//   articlesCount: 42,
//   followers: 1280,
//   bio: '资深人工智能研究员，专注于机器学习与深度学习领域的研究。在顶级会议和期刊发表多篇论文。'
// };

import { useRouter } from 'vue-router';
import {useRoute} from 'vue-router';

const router = useRouter();
const goToAuthorPage = () => {
  // 跳转到作者主页
  router.push(`/UserProfile/${authorInfo.id}`);
};

import { onMounted } from 'vue';
import axios from 'axios';
// 获取当前路由信息
const route = useRoute();
const articleId = route.params.articleId;
const authorInfo = ref({});

async function fetchAuthorData(userId) {
  try {
    const response = await axios.post('/api/ucenter/getUserInfo', null, {
      params: { userId }
    });
    authorInfo.value = response.data.data;
  } catch (error) {
    console.error('获取作者信息失败:', error);
  }
}

onMounted(async () => {
  try {
    const response = await axios.post('/api/forum/getArticleDetail',null, {
      params: {
        articleId:articleId,
      },
    });
    articleInfo.value = response.data.data.forumArticle;
    console.log(articleInfo.value);
    await fetchAuthorData(articleInfo.value.userId);
  } catch (error) {
    console.error('获取文章详情失败:', error);
    // 这里可以添加错误处理逻辑，比如显示错误提示
  }
});

</script>