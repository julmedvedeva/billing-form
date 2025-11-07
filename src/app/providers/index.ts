import { createPinia } from 'pinia'
import { router } from './router'
import type { App } from 'vue'

export function setupProviders(app: App) {
  const pinia = createPinia()
  app.use(router)
  app.use(pinia)
}
