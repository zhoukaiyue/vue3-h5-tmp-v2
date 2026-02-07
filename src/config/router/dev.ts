/**
 * 开发者中心 / demo 路由配置
 */

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dev',
    name: 'dev',
    meta: { title: '开发者中心' },
    component: () => import('@/views/dev/index.vue'),
  },
  {
    path: '/dev/layOut',
    meta: { title: 'layOut 布局组件的使用' },
    component: () => import('@/views/dev/components/layOut/index.vue'),
  },
  {
    path: '/dev/pinia',
    meta: { title: 'pinia 状态管理的使用' },
    component: () => import('@/views/dev/components/pinia/index.vue'),
  },
  {
    path: '/dev/tabbar',
    meta: { title: 'tabbar 底部标签栏' },
    component: () => import('@/views/dev/components/tabbar/index.vue'),
  },
  {
    path: '/dev/request',
    meta: { title: '请求库 request 使用 demo' },
    component: () => import('@/views/dev/components/request/index.vue'),
  },
  {
    path: '/dev/tool',
    meta: { title: '脚手架已集成的工具库' },
    component: () => import('@/views/dev/components/tool/index.vue'),
  },
  {
    path: '/dev/tool/copy',
    meta: { title: 'JavaScript | 文本复制工具' },
    component: () => import('@/views/dev/components/tool/components/copy.vue'),
  },
  {
    path: '/dev/tool/lodashjs',
    meta: { title: 'JavaScript | lodash 使用' },
    component: () => import('@/views/dev/components/tool/components/lodashjs.vue'),
  },
]

export default routes
