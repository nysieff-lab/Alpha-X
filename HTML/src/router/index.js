import About from '@/Views/About.vue'
import Home from '@/Views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/About',
      name: 'ABout',
      component: About
    }
  ],
  scrollBehavior() {
        return {top:0}}
})

export default router
