/*
 * @Descripttion:
 * @version:
 * @Author: zhoukai
 * @Date: 2026-02-06 17:07:09
 * @LastEditors: zhoukai
 * @LastEditTime: 2026-02-07 15:56:08
 */
import { $get } from '@/packages/request'
import type { RequestConfig } from '@/packages/request'

import type { getScaffoldInfoValidator } from './validation/getScaffoldInfo.d'

/**
 * 获取脚手架项目信息
 * GET https://mock.127516.com/mock/14/demo/vue3-h5-tmp-v2-info
 * 无入参（预留 config，方便在 demo 中演示重试、取消重复请求等配置）
 */
export const getScaffoldInfo = (
  config?: RequestConfig,
): Promise<getScaffoldInfoValidator.ReturnType> => {
  return $get<getScaffoldInfoValidator.ReturnType>(
    '/mock/14/demo/vue3-h5-tmp-v2-info',
    {},
    config ?? {},
  )
}
