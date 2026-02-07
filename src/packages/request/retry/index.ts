import { isJsonStr, sleep } from '@/utils/helper'
import { httpErrorStatusHandle } from '../error-handling'
import type { AxiosInstance } from 'axios'
import type { RequestConfig } from '../types'

interface RetryOptions {
  /** 全局默认重试次数（不含首次） */
  retryCount: number
  /** 全局默认两次重试之间的等待时间（毫秒） */
  retryDelay: number
}

export async function againRequest(
  error: unknown,
  axiosInstance: AxiosInstance,
  defaultOptions: RetryOptions,
): Promise<unknown> {
  const err = error as { config?: RequestConfig & { signal?: AbortSignal } }
  const config = err.config

  // 没有 config，直接走统一错误处理
  if (!config) {
    httpErrorStatusHandle(error, axiosInstance)
    return Promise.reject(error)
  }

  // 单个请求可通过 shouldRetry = false 关闭重试
  const shouldRetry = config.shouldRetry ?? true
  if (!shouldRetry) {
    httpErrorStatusHandle(error, axiosInstance)
    return Promise.reject(error)
  }

  // 请求已被取消，不再重试
  if (config.signal?.aborted) {
    return Promise.reject(error)
  }

  const maxRetryCount = config.retryCount ?? defaultOptions.retryCount
  if (!maxRetryCount || maxRetryCount <= 0) {
    httpErrorStatusHandle(error, axiosInstance)
    return Promise.reject(error)
  }

  config.__retryCount = config.__retryCount ?? 0
  if (config.__retryCount >= maxRetryCount) {
    httpErrorStatusHandle(error, axiosInstance)
    return Promise.reject(error)
  }

  config.__retryCount += 1

  const retryDelay = config.retryDelay ?? defaultOptions.retryDelay

  // 等待一段时间后重试，中间再检查一次取消信号
  await sleep(retryDelay)

  if (config.signal?.aborted) {
    return Promise.reject(error)
  }

  // 兼容之前 axios 对 data 处理为字符串的情况
  if (config.data && typeof config.data === 'string' && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data) as RequestConfig['data']
  }

  return axiosInstance(config)
}
