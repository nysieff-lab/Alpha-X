import About from '@/Views/About.vue'
import Cart from '@/Views/Cart.vue'
import Home from '@/Views/Home.vue'
import Login from '@/Views/Login.vue'
import Shop from '@/Views/Shop.vue'
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
      name: 'About',
      component: About
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ],
  scrollBehavior() {
        return {top:0}}
})

export default router
