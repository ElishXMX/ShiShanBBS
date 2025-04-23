<script setup>
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

// 2. 获取DOM引用
const vditor = ref()

// 3. 在组件初始化时，就创建Vditor对象，并引用
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '70vh',
    width: '80%',
    placeholder: '请输入内容...',
    after: () => {
      // 编辑器初始化完成后的回调
      console.log('Vditor初始化完成')
    }
  })
})

const handleSave = async () => {
  const content = vditor.value.getValue()
  if (!content) {
    ElMessage.warning('请输入内容')
    return
  }
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        createdAt: new Date().toISOString()
      })
    })
    if (!response.ok) {
      throw new Error('上传失败')
    }
    ElMessage.success('文章上传成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('文章上传失败，请稍后重试')
  }
}

const handlePreview = () => {
  const content = vditor.value.getValue()
  if (!content) {
    ElMessage.warning('请输入内容')
    return
  }
  // TODO: 预览逻辑
}
</script>

<style scoped>
.post-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.action-buttons {
  margin-top: 20px;
  text-align: right;
}
#vditor {
  margin-bottom: 20px;
  width: 80%;
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
</style>

<template>
  <div class="post-container">
    <div class="separator">
            <img src="../assets/手写签名.svg" alt="Milho Separator" class="separator-image" />
            <h2>写篇帖子</h2>
          </div>
    <div id="vditor"></div>
    <div class="action-buttons">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handlePreview">预览</el-button>
    </div>
  </div>
</template>
