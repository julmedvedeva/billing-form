import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/home/ui/HomePage.vue'
import ChamberOfSecretsPage from '@/pages/chamber-of-secrets/ui/ChamberOfSecretsPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/chamber-of-secrets',
      name: 'chamber-of-secrets',
      component: ChamberOfSecretsPage,
    },
  ],
})
