<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-content">
          <h1>狮山论坛</h1>
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            background-color="var(--primary-color)"
            text-color="#fff"
            active-text-color="var(--accent-color)"
            class="nav-menu"
            router
          >
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/HotPosts">热帖排行</el-menu-item>
            <el-menu-item index="/Chat">私聊</el-menu-item>
            <el-menu-item index="/Post">我要发帖</el-menu-item>
            <el-menu-item index="/MyProfile">个人中心</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.header-content {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background-image: url('..\assets\photo\image.png');
  background-repeat: no-repeat;
  background-size: 95%;
  background-position: -300% 80%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.header-content::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: -1;
}

.header-content h1 {
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.nav-menu {
  border-bottom: none;
  height: 100%;
}
.nav-menu .el-menu-item {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 18px; /* 调整字体大小 */
  min-width: 120px; /* 调整最小宽度 */
}
.main-content {
margin-top: 40px;
  height: 100%;
  min-height: calc(100vh - 60px);
}
.el-menu-item:hover {
      color: #fff;
}

</style>