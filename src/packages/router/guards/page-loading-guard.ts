/**
 * 页面切换 loading 守卫
 * 在 beforeEach 显示 #toggle-loading，在 afterEach / onError 隐藏
 */

import type { Router } from 'vue-router'

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(() => {
    document.getElementById('toggle-loading')?.setAttribute('style', 'display:auto')
  })

  router.afterEach(() => {
    document.getElementById('toggle-loading')?.setAttribute('style', 'display:none')
  })

  router.onError(() => {
    document.getElementById('toggle-loading')?.setAttribute('style', 'display:none')
  })
}
