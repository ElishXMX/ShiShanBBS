<template>
  <div class="post-view-container">
    <h2>发表新帖子</h2>
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" :rows="8" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPost">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  data() {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submitPost() {
      // 提交逻辑待实现
      this.$message.success('帖子提交成功（模拟）')
    }
  }
}
</script>

<style scoped>
.post-view-container {

  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>