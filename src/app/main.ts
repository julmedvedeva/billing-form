import './styles/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupProviders } from './providers'

const app = createApp(App)

setupProviders(app)

app.mount('#app')
