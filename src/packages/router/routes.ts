/**
 * 读取 config/router 下所有路由配置并合并
 * 使用 import.meta.glob 自动收集各模块的 default 导出
 */

import type { RouteRecordRaw } from 'vue-router'

type RouterModule = { default?: RouteRecordRaw[] }

const metaRouters = import.meta.glob<RouterModule>('../../config/router/*.ts', { eager: true })

export const routerArray: RouteRecordRaw[] = []

Object.keys(metaRouters).forEach((path) => {
  const mod = metaRouters[path]
  if (mod?.default?.length) {
    routerArray.push(...mod.default)
  }
})

// 捕获未匹配路径，重定向到 404
routerArray.push({
  path: '/:pathMatch(.*)*',
  redirect: '/404',
})

export default routerArray
