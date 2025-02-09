import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiTrash, GiCancel, FaSave, BiPencilFill  } from 'oh-vue-icons/icons'

addIcons(BiTrash, GiCancel, FaSave, BiPencilFill)

import App from './App.vue'
import router from './router'

const pinia = createPinia();
const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(pinia)
app.use(router)

app.mount('#app')
