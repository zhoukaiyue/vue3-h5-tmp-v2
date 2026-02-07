/**
 * 页面滚动位置守卫
 * 对带 meta.keepAlive 的路由，离开时保存 .frame-view-content 滚动位置，进入时恢复
 */

import { nextTick, ref } from 'vue'
import type { Router } from 'vue-router'

export function createPageScrollGuard(router: Router) {
  const scrollPositions = ref<Record<string, number>>({})

  router.beforeEach(async (_to, from) => {
    if (from.meta?.keepAlive) {
      await nextTick()
      const $content = document.querySelector('.frame-view-content')
      const scrollTop = ($content as HTMLElement)?.scrollTop ?? 0
      scrollPositions.value[from.path] = scrollTop
    }
  })

  router.afterEach(async (to) => {
    await nextTick()
    const $content = document.querySelector('.frame-view-content')
    if ($content) {
      ;($content as HTMLElement).scrollTop = scrollPositions.value[to.path] ?? 0
    }
  })
}
