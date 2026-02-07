/**
 * Pinia Store - dev 示例
 * 用于开发者中心 pinia 使用 demo
 *
 * 📖 使用指南：
 * 1. 定义方式：使用 Options API 风格（state, getters, actions）
 * 2. 导入使用：import { useDevStore } from '@/config/store/dev'
 * 3. 组件中使用：const store = useDevStore()
 */

import { defineStore } from 'pinia'

/**
 * Dev Store 接口定义
 */
interface DevState {
  count1: number // 方式一：计算属性方式使用
  count2: number // 方式二：storeToRefs 方式使用
  count3: number // 方式三：Actions 方式使用
  username: string
}

export const useDevStore = defineStore('dev', {
  /**
   * State - 定义状态数据
   * 相当于组件中的 data，用于存储状态
   */
  state: (): DevState => ({
    count1: 0,
    count2: 0,
    count3: 0,
    username: 'Guest',
  }),

  /**
   * Getters - 定义计算属性
   * 相当于组件中的 computed，用于派生状态
   * 可以访问 state 和其他 getters
   */
  getters: {
    // 方式一相关的 getter
    getCount1Data: (state): string => {
      return `当前计数: ${state.count1}`
    },
    isCount1Even: (state): boolean => {
      return state.count1 % 2 === 0
    },

    // 方式二相关的 getter
    getUserInfo: (state): string => {
      return `用户: ${state.username}, 计数: ${state.count2}`
    },

    // 方式三相关的 getter
    getCount3Status: (state): string => {
      return `当前计数: ${state.count3}, 是否为偶数: ${state.count3 % 2 === 0 ? '是' : '否'}`
    },
  },

  /**
   * Actions - 定义方法
   * 相当于组件中的 methods，用于修改状态
   * 可以是异步的，可以调用其他 actions
   */
  actions: {
    /**
     * 增加计数（方式三使用）
     * @param step 增加的步长，默认为 1
     */
    increment(step: number = 1) {
      this.count3 += step
    },

    /**
     * 减少计数（方式三使用）
     * @param step 减少的步长，默认为 1
     */
    decrement(step: number = 1) {
      this.count3 -= step
    },

    /**
     * 设置用户名
     * @param name 用户名
     */
    setUsername(name: string) {
      this.username = name
    },

    /**
     * 模拟异步操作 - 延迟增加计数
     * @param delay 延迟时间（毫秒）
     */
    async incrementAsync(delay: number = 1000) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      this.increment()
    },

    /**
     * 重置所有状态到初始值
     * 注意：组件中也可以直接调用 store.$reset()
     */
    resetAll() {
      this.count1 = 0
      this.count2 = 0
      this.count3 = 0
      this.username = 'Guest'
    },
  },
})
