import axios from 'axios'
import { showNotify } from 'vant'
import type { AxiosInstance } from 'axios'

export function httpErrorStatusHandle(error: unknown, _axiosInstance: AxiosInstance): void {
  const err = error as {
    config?: { enableErrorMessage?: boolean }
    response?: { status: number; config?: { url?: string } }
    message?: string
  }
  const config = err.config
  if (!config || config.enableErrorMessage === false) {
    return
  }
  const isCanceled = axios.isCancel(error) || (error as { name?: string })?.name === 'AbortError'
  if (isCanceled) {
    return console.error('请求已取消：' + (error as { message?: string }).message)
  }
  let message = '请求异常！'
  if (err?.response) {
    switch (err.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${err.response.config?.url ?? ''}`
        break
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (err.message?.includes('timeout')) message = '网络请求超时！'
  if (err.message?.includes('Network'))
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  showNotify({ type: 'danger', message })
}
