/**
 * 首页 / 业务路由配置
 */

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
      keepAlive: true,
    },
    component: () => import('@/views/index/index.vue'),
  },
]

export default routes
