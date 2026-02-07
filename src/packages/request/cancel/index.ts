import axios from 'axios'
import { requestConfig } from '../config'
import type { RequestConfig } from '../types'

const pendingMap = new Map<string, AbortController>()

/**
 * 生成用于判定「同一个请求」的 key
 *
 * 规则：方法 + URL + 参数
 * - 对于 GET：使用 params
 * - 对于非 GET：使用 data
 */
function getPendingKey(config: RequestConfig): string {
  const method = (config.method ?? 'get').toString().toLowerCase()
  const url = config.url ?? ''
  const isGet = method === 'get'
  const paramsOrData = (isGet ? config.params : config.data) ?? {}
  let paramsString = ''
  try {
    paramsString = JSON.stringify(paramsOrData || {})
  } catch {
    paramsString = ''
  }
  return `${method}-${url}-${paramsString}`
}

function shouldUseCancelFeature(config: RequestConfig): boolean {
  const globalCancel = requestConfig.cancel
  const url = config.url ?? ''

  // 全局开关关闭，则不启用
  if (!globalCancel.cancelDuplicated) return false

  // 命中忽略名单的 URL，不启用
  if (globalCancel.ignoreUrls.includes(url)) return false

  // 单个请求显式关闭
  if (config.cancelDuplicated === false) return false

  return true
}

/** 在发送请求前注册到 pendingMap，并根据策略处理重复请求 */
export function addPendingMap(config: RequestConfig): void {
  if (!shouldUseCancelFeature(config)) return

  const pendingKey = getPendingKey(config)
  const existing = pendingMap.get(pendingKey)

  const globalCancel = requestConfig.cancel
  const strategy = config.cancelStrategy ?? globalCancel.cancelStrategy

  // 已有相同 key 的请求
  if (existing) {
    if (strategy === 'cancel-next') {
      // 取消当前请求，保留前一个
      throw new axios.Cancel('请求已取消（重复请求：保留前一个）')
    }

    // 默认策略：取消前一个，保留当前
    existing.abort()
    pendingMap.delete(pendingKey)
  }

  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(pendingKey, controller)
}

/** 在请求结束（成功或失败）后，从 pendingMap 中移除 */
export function removePendingRequest(config: RequestConfig): void {
  if (!shouldUseCancelFeature(config)) return
  const pendingKey = getPendingKey(config)
  pendingMap.delete(pendingKey)
}
