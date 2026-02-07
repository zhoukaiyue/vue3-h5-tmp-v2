/**
 * 路由守卫统一注册
 */

import type { Router } from 'vue-router'
import { createPageLoadingGuard } from './page-loading-guard'
import { createPageScrollGuard } from './page-scroll-guard'
import { createPageTitleGuard } from './page-title-guard'

export function createGuardSlice(router: Router) {
  createPageLoadingGuard(router)
  createPageTitleGuard(router)
  createPageScrollGuard(router)
}
