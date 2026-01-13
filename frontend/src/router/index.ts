import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
    },
    {
      path: '/payment-result',
      name: 'payment-result',
      component: () => import('../views/PaymentResult.vue'),
    },
  ],
})

export default router
