import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'head',
    component: () => import('@/components/CommonLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/HotPosts',
        name: 'HotPosts',
        component: () => import('@/views/HotPostsView.vue')
      },
      {
        path: '/Chat',
        name: 'Chat',
        component: () => import('@/views/ChatWith.vue')
      },
      {
        path: '/Post',
        name: 'post',
        component: () => import('@/views/PostView.vue')
      },
      {
        path: '/MyProfile',
        name: 'MyProfile',
        component: () => import('@/views/ProfileView.vue')
      },
      {
        path: '/UserProfile',
        name: 'UserProfile',
        component: () => import('@/views/UserProfileView.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/ArticleDetailView.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginAnd.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局路由守卫示例
router.beforeEach((to, from, next) => {
  // 这里可以添加权限验证等逻辑
  next()
})

export default router