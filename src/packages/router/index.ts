/**
 * Router 构造
 * 使用 VITE_APP_ROUTER_BASE 作为 base，并挂载全局守卫
 */

import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { createGuardSlice } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ROUTER_BASE),
  routes,
})

createGuardSlice(router)
export default router
