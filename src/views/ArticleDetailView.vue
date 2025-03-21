<template>
  这是文章详情
  <div class="article-container">
    <div class="markdown-body" v-html="processedContent"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DOMPurify from 'dompurify'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const processedContent = computed(() => {
  return DOMPurify.sanitize(props.content)
})
</script>

<style scoped>
.article-container {
  margin: 20px;
  max-width: 800px;
}

.meta-info {
  color: #666;
  margin: 10px 0;
  display: flex;
  gap: 20px;
}

.markdown-body {
  padding: 15px 0;
}

.comment-section {
  margin-top: 20px;
}

.submit-btn {
  margin-top: 10px;
}

.comment-item {
  margin: 15px 0;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.username {
  font-weight: bold;
}

.time {
  color: #999;
  font-size: 0.9em;
}
</style>