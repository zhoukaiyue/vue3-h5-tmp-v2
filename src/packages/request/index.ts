/*
 * axios 封装：取消重复请求、请求错误重试、loading、错误提示
 */
import axios from 'axios'
import QS from 'qs'
import loading, { setLoadingOptions } from './loading'
import { againRequest } from './retry'
import { addPendingMap, removePendingRequest } from './cancel'
import { httpErrorStatusHandle } from './error-handling'
import type { RequestConfig } from './types'
import { requestConfig } from './config'

// 设置基础URL（由环境变量控制）
// 支持绝对路径（如 "https://api.example.com"）和相对路径（如 "/api"）
// 相对路径会基于当前应用所在的域名进行请求
const baseURL = import.meta.env.VITE_APP_AXIOS_BASEURL as string
if (baseURL) {
  axios.defaults.baseURL = baseURL
}
// 从全局配置中应用 axios 默认行为
axios.defaults.withCredentials = requestConfig.axios.withCredentials
axios.defaults.timeout = requestConfig.axios.timeout

// 从全局配置中解构出「请求重试」相关默认配置
// - 默认对失败请求重试 requestConfig.retry.retryCount 次
// - 每次重试之间间隔 requestConfig.retry.retryDelay 毫秒
const defaultRetryOptions = {
  retryCount: requestConfig.retry.retryCount,
  retryDelay: requestConfig.retry.retryDelay,
}

// 初始化全局 loading 配置（文案、类名等），后续 loading.show/hide 都会使用该配置
setLoadingOptions(requestConfig.loading)

// 请求拦截器：统一处理 loading 展示和「取消重复请求」逻辑
axios.interceptors.request.use(
  (config) => {
    const reqConfig = config as RequestConfig
    // 1. 根据全局配置 + 单个请求开关，决定是否显示 loading
    const shouldShowLoading =
      (reqConfig.enableLoading ?? requestConfig.loading.loadingEnabled) !== false
    reqConfig.__showLoading = shouldShowLoading
    if (shouldShowLoading) {
      loading.show()
    }
    // 2. 注册到 pendingMap，用于根据「方法 + URL + 参数」控制重复请求
    //    - 发现相同 key 的请求会先 abort 再替换
    //    - 不要在发请求前调用 remove，否则会误删前一个导致无法取消
    addPendingMap(reqConfig)
    return config
  },
  (error) => {
    loading.hide()
    return Promise.reject(error)
  },
)

// 响应拦截器：统一收尾 loading / 取消 pending / 处理重试 & 错误提示
axios.interceptors.response.use(
  (response) => {
    const resConfig = response.config as RequestConfig
    if (resConfig.__showLoading) {
      loading.hide()
    }
    removePendingRequest(response.config as RequestConfig)
    return response
  },
  (error) => {
    const errConfig = error.config as RequestConfig | undefined
    if (errConfig?.__showLoading) {
      loading.hide()
    }
    if (errConfig) removePendingRequest(errConfig)
    const err = error as {
      name?: string
      code?: string
      config?: RequestConfig & { signal?: AbortSignal }
    }
    // 规范化各种「取消请求」场景（AbortError、axios.isCancel、信号已 aborted 等）
    const isCanceled =
      axios.isCancel(error) ||
      err?.name === 'AbortError' ||
      err?.name === 'CanceledError' ||
      err?.code === 'ERR_CANCELED' ||
      err?.config?.signal?.aborted === true

    // 非取消类错误，且：
    // - 全局开启重试（requestConfig.retry.retryEnabled 为 true）
    // - 当前请求未显式关闭重试（shouldRetry !== false）
    // 时，走统一重试逻辑 againRequest
    if (!isCanceled && requestConfig.retry.retryEnabled && (err.config?.shouldRetry ?? true)) {
      return againRequest(error, axios, defaultRetryOptions)
    }

    // 不符合重试条件或重试仍失败时，走统一错误提示处理
    httpErrorStatusHandle(error, axios)
    return Promise.reject(error)
  },
)

/** post 请求，入参 formData（application/x-www-form-urlencoded） */
export function $post<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config: RequestConfig = {},
): Promise<T> {
  return axios
    .post(url, QS.stringify(params ?? {}), config)
    .then((res) => res.data as T)
    .catch((err) => Promise.reject(err))
}

/** post 请求，入参 JSON */
export function $http<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config: RequestConfig = {},
): Promise<T> {
  return axios
    .post(url, params ?? {}, config)
    .then((res) => res.data as T)
    .catch((err) => Promise.reject(err))
}

/** get 请求 */
export function $get<T = unknown>(
  url: string,
  params: Record<string, unknown> = {},
  config: RequestConfig = {},
): Promise<T> {
  return axios
    .get(url, { params, ...config })
    .then((res) => res.data as T)
    .catch((err) => Promise.reject(err))
}

// 对外统一导出请求配置类型及 loading 相关方法，便于业务代码按需引用
export type { RequestConfig } from './types'
export { setLoadingOptions } from './loading'
