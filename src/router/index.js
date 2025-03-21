import { createRouter, createWebHistory } from 'vue-router'

import CommonLayout from '@/components/CommonLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: CommonLayout,
      children: [
        { path: '/userprofile', component: () => import('@/views/UserProfileView.vue') },
        { path: '/article', component: () => import('@/views/ArticleDetailView.vue') },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'hot',
          name: 'hot',
          component: () => import('@/views/HotPostsView.vue')
        },
        {
          path: 'messages',
          name: 'messages',
          component: () => import('@/views/MessagesView.vue')
        },
        {
          path: 'post',
          name: 'post',
          component: () => import('@/views/PostView.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // next({ name: 'Login' })
  } else {
    next()
  }
})

export default router