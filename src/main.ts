// 低版本浏览器缺少 AbortController，需先注入 polyfill（请求取消等功能依赖）
import 'abortcontroller-polyfill'

import './assets/css/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/packages/router'
import '@/resources/plugin'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
