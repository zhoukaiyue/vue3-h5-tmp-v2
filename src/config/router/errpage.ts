/**
 * 错误页路由配置（如 404）
 */

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'err404',
    meta: {
      title: '页面不存在',
    },
    component: () => import('@/views/errPage/err404/index.vue'),
  },
]

export default routes
