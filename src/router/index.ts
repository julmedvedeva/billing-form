import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChamberOfSecrets from '../views/ChamberOfSecrets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/chamber-of-secrets',
      name: 'chamber-of-secrets',
      component: ChamberOfSecrets,
    },
  ],
})

export default router
