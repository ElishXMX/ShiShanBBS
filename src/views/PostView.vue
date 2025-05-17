<script setup>
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

// 2. 定义响应式数据
const vditor = ref()
const title = ref('')
const tags = ref([])
const inputTag = ref('')
const showData = ref(false)

// 3. 在组件初始化时，就创建Vditor对象，并引用
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '60vh',
    width: '80%',
    placeholder: '请输入内容...',
    after: () => {
      console.log('Vditor初始化完成')
    }
  })
})

// 4. 添加标签
const addTag = () => {
  if (inputTag.value && !tags.value.includes(inputTag.value)) {
    tags.value.push(inputTag.value)
    inputTag.value = ''
  }
}

// 5. 删除标签
const removeTag = (index) => {
  tags.value.splice(index, 1)
}

// 6. 保存文章
const handleSave = async () => {
  const content = vditor.value.getValue()
  if (!title.value || !content) {
    ElMessage.warning('请输入标题和内容')
    return
  }
  let temp=tags.value.join(',')
  const postData = {
    title: title.value,
    content: content,
    tag: temp,
    summary: content.slice(0, 100) + '...',
    editorType:0,
  }
  
  try {
    const response = await axios.post('/api/forum/postArticle', postData)
    
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '上传失败')
    }
    
    ElMessage.success('文章上传成功')
    showData.value = true
  } catch (error) {
    console.error(error)
    ElMessage.error('文章上传失败，请稍后重试')
  }
}

// 7. 预览文章
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

.title-input {
  width: 80%;
  margin: 30px 0;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
}

.tag-input-container {
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.tags-container {
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  background-color: #FFA500;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.tag-remove {
  cursor: pointer;
  color: #999;
}

.action-buttons {
  margin-top: 20px;
  text-align: right;
  width: 80%;
  display: flex;
  justify-content: space-between;
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

.data-preview {
  width: 80%;
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>

<template>
  <div class="post-container">
    <div class="separator">
      <img src="../assets/手写签名.svg" alt="Milho Separator" class="separator-image" />
      <h2>写篇帖子</h2>
    </div>
    
    <div class="input-with-icon">
      <svg t="1745564299453" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4276" width="40" height="40" style="margin-right: 10px; vertical-align: middle;"><path d="M983.04 772.48H44.16a37.76 37.76 0 0 1 0-74.88h938.88a37.76 37.76 0 1 1 0 74.88z" fill="#323333" p-id="4277"></path><path d="M27.52 348.16h211.2V384H154.24v222.08h-42.24V384H27.52zM269.44 348.16h42.24v256h-42.24zM342.4 348.16h211.84V384H469.76v222.08h-42.24V384H342.4zM584.96 348.16h41.6v222.08H768v35.84H584.96zM798.72 348.16h186.24V384h-144v71.68h135.68v36.48h-135.68v78.08h150.4v35.84h-192z" fill="#323333" p-id="4278"></path></svg>
      <el-input 
        v-model="title" 
        placeholder="请输入文章标题" 
        class="title-input" 
        clearable
        size="large"
      />
    </div>
    
    <div class="tag-input-container">
      <svg t="1745564511951" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5259" width="40" height="40" style="margin-right: 10px; vertical-align: middle;"><path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="5260"></path><path d="M324.88448 106.7008a81.92 81.92 0 0 1 59.392-40.1408l201.33888-28.68224a81.92 81.92 0 0 1 87.56224 50.55488l75.8272 188.70272a81.92 81.92 0 0 1-5.0688 71.50592L439.54176 875.8784a81.92 81.92 0 0 1-111.90272 29.98272L50.46272 745.84064A81.92 81.92 0 0 1 20.48 633.93792L324.88448 106.7008z" fill="#E36130" p-id="5261"></path><path d="M317.44 251.11552a81.92 81.92 0 0 1 34.22208-66.60096l209.92-150.35392a81.92 81.92 0 0 1 95.39584 0l209.92 150.35392A81.92 81.92 0 0 1 901.12 251.11552V931.84a81.92 81.92 0 0 1-81.92 81.92H399.36a81.92 81.92 0 0 1-81.92-81.92V251.11552z" fill="#FF7744" p-id="5262"></path><path d="M614.4 235.52m-71.68 0a71.68 71.68 0 1 0 143.36 0 71.68 71.68 0 1 0-143.36 0Z" fill="#E36130" p-id="5263"></path><path d="M705.7408 174.7968a189.32736 189.32736 0 0 1 166.44096-99.19488h5.3248c13.1584 0 25.94816 4.27008 36.46464 12.17536 33.536 25.1904 32.13312 76.04224-2.75456 99.328l-3.65568 2.4576a74.38336 74.38336 0 0 1 28.2624 58.368v1.30048l11.59168-7.74144c72.33536-48.30208 75.25376-153.7536 5.70368-206.00832A125.8496 125.8496 0 0 0 877.5168 10.24h-5.33504A254.55616 254.55616 0 0 0 648.3968 143.616l-40.28416 74.3424a32.70656 32.70656 0 0 0 13.1072 44.31872c15.83104 8.6016 35.6352 2.73408 44.2368-13.12768l40.28416-74.3424z" fill="#FFA17E" p-id="5264"></path><path d="M614.4 440.32l50.31936 125.30688 134.71744 9.13408-103.6288 86.56896 32.95232 130.94912L614.4 720.4864l-114.36032 71.79264 32.94208-130.94912-103.6288-86.56896 134.72768-9.13408z" fill="#FFA17E" p-id="5265"></path></svg>
      <el-input 
        v-model="inputTag" 
        placeholder="输入标签后按回车添加" 
        @keyup.enter="addTag"
      />
      <el-button @click="addTag" type="warning" plain size="large">添加</el-button>
    </div>
    
    <div class="tags-container" v-if="tags.length > 0">
      <div class="tag-item" v-for="(tag, index) in tags" :key="index" type="success">
        {{ tag }}
        <span class="tag-remove" @click="removeTag(index)">×</span>
      </div>
    </div>
    
    <div id="vditor"></div>
    
    <div class="action-buttons">
      <div>
        <el-button type="primary" @click="handleSave">发布</el-button>
        <el-button @click="handlePreview">预览</el-button>
      </div>
      <el-button @click="showData = !showData">
        {{ showData ? '隐藏数据' : '查看数据' }}
      </el-button>
    </div>
    
    <div class="data-preview" v-if="showData">
      {{ 
        JSON.stringify({
          title: title,
          tags: tags,
          content: vditor?.getValue() || '',
          createdAt: new Date().toISOString()
        }, null, 2)
      }}
    </div>
  </div>
</template>
