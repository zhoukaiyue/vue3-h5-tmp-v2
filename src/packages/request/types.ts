import type { AxiosRequestConfig } from 'axios'

/** 扩展的请求配置（支持取消重复请求、重试、错误提示等开关） */
export interface RequestConfig extends AxiosRequestConfig {
  /**
   * 是否对当前请求启用 loading
   * - 不设置时走全局配置 requestConfig.loading.loadingEnabled
   * - true：本次请求显示 loading
   * - false：本次请求不显示 loading
   */
  enableLoading?: boolean

  /**
   * 是否启用当前请求的「取消重复请求」功能
   * - 不设置时走全局配置 requestConfig.cancel.cancelDuplicated
   */
  cancelDuplicated?: boolean

  /**
   * 当前请求使用的取消策略
   * - 'cancel-prev': 取消前一个，保留当前（默认）
   * - 'cancel-next': 取消当前，保留前一个
   * - 不设置时走全局配置 requestConfig.cancel.cancelStrategy
   */
  cancelStrategy?: 'cancel-prev' | 'cancel-next'

  /** 单个请求的重试次数（不含首次），优先级高于全局默认 */
  retryCount?: number
  retryDelay?: number
  /** 是否对该请求启用重试，默认 true */
  shouldRetry?: boolean

  /** 是否展示错误信息，默认 true（走全局开关） */
  enableErrorMessage?: boolean

  /** 内部使用：记录已重试次数 */
  __retryCount?: number

  /** 内部使用：本次请求是否实际展示了 loading，用于在响应阶段成对关闭 */
  __showLoading?: boolean
}
