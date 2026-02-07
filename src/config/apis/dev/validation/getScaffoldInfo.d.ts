/*
 * @Descripttion: vue3-h5-tmp-v2-info 接口入参出参类型定义
 * @version:
 * @Author: zhoukai
 * @Date: 2026-02-06 00:00:00
 * @LastEditors: zhoukai
 * @LastEditTime: 2026-02-06 17:08:14
 */

export namespace getScaffoldInfoValidator {
  /**
   * 接口返回 data 字段类型定义
   */
  export interface Data {
    /** 项目标题 */
    title: string
    /** 项目描述 */
    description: string
    /** 项目版本号 */
    version: string
  }

  /**
   * 接口整体返回类型定义
   */
  export interface ReturnType {
    /** 接口状态 */
    status: string
    /** 业务数据 */
    data: Data
    /** 提示信息 */
    message: string
  }
}
