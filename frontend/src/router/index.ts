import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import PreviewView from '@/views/PreviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProfileView,
    },
    {
      path: '/preview',
      name: 'preview',
      component: PreviewView,
    },
    {
      path: '/:username',
      name: 'profile',
      component: ProfileView,
      props: true,
    },
  ],
})

export default router
