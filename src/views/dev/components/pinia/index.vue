<template>
  <div class="page-content dev-pinia">
    <van-notice-bar left-icon="info-o" text="Pinia 状态管理使用示例" />

    <!-- ========== 方式一：计算属性方式 ========== -->
    <div class="section">
      <h3>方式一：计算属性方式</h3>
      <p class="desc">通过 computed 包装 store 的值，适合需要自定义 getter/setter 的场景</p>

      <div class="demo-box">
        <div class="info-row">
          <span class="label">当前计数:</span>
          <span class="value">{{ count1 }}</span>
        </div>
        <div class="info-row">
          <span class="label">状态信息:</span>
          <span class="value">{{ store.getCount1Data }}</span>
        </div>
        <div class="info-row">
          <span class="label">是否偶数:</span>
          <span class="value">{{ store.isCount1Even ? '是' : '否' }}</span>
        </div>
      </div>

      <div class="button-group">
        <van-button type="primary" @click="add1">+1</van-button>
        <van-button type="success" @click="reduce1">-1</van-button>
        <van-button type="warning" @click="increase1">+10</van-button>
        <van-button type="danger" @click="resetCount1">重置</van-button>
      </div>

      <div class="code-tip">
        <p>💡 使用方法：</p>
        <pre>
const count1 = computed({
  get: () => store.count1,
  set: (val) => { store.count1 = val }
})

// 直接修改
count1.value++</pre
        >
      </div>
    </div>

    <!-- ========== 方式二：storeToRefs 解构方式 ========== -->
    <div class="section">
      <h3>方式二：storeToRefs 解构方式（推荐）</h3>
      <p class="desc">使用 storeToRefs 解构响应式数据，代码更简洁，<strong>推荐使用</strong></p>

      <div class="demo-box">
        <div class="info-row">
          <span class="label">当前计数:</span>
          <span class="value">{{ count2 }}</span>
        </div>
        <div class="info-row">
          <span class="label">用户名:</span>
          <span class="value">{{ username }}</span>
        </div>
        <div class="info-row">
          <span class="label">用户信息:</span>
          <span class="value">{{ getUserInfo }}</span>
        </div>
      </div>

      <div class="button-group">
        <van-button type="primary" @click="add2">+1</van-button>
        <van-button type="success" @click="reduce2">-1</van-button>
        <van-button type="warning" @click="increase2">+10</van-button>
        <van-button type="danger" @click="resetCount2">重置</van-button>
      </div>

      <div class="code-tip">
        <p>💡 使用方法：</p>
        <pre>
// 解构 state 和 getters（保持响应式）
const { count2, username } = storeToRefs(store)
// 解构 actions（不需要 storeToRefs）
const { increment, decrement } = store

// 直接使用
count2.value++</pre
        >
      </div>
    </div>

    <!-- ========== 方式三：直接调用 Actions ========== -->
    <div class="section">
      <h3>方式三：使用 Store 的 Actions</h3>
      <p class="desc">调用 store 中定义的 actions 方法，适合复杂业务逻辑和异步操作</p>

      <div class="demo-box">
        <div class="info-row">
          <span class="label">当前计数:</span>
          <span class="value">{{ store.count3 }}</span>
        </div>
        <div class="info-row">
          <span class="label">完整状态:</span>
          <span class="value">{{ store.getCount3Status }}</span>
        </div>
      </div>

      <div class="button-group">
        <van-button type="primary" @click="handleIncrement">调用 increment</van-button>
        <van-button type="success" @click="handleDecrement">调用 decrement</van-button>
        <van-button type="warning" @click="handleIncrementAsync" :loading="loading">
          异步更新
        </van-button>
        <van-button type="danger" @click="handleResetAll">调用 resetAll</van-button>
      </div>

      <div class="code-tip">
        <p>💡 使用方法：</p>
        <pre>
// 直接调用 store 的 actions
store.increment(5)
store.setUsername('新用户')

// 异步 action
await store.incrementAsync(1000)</pre
        >
      </div>
    </div>

    <!-- ========== 方式四：直接修改 State ========== -->
    <div class="section">
      <h3>方式四：$patch 批量更新</h3>
      <p class="desc">使用 $patch 可以同时修改多个状态，性能更好</p>

      <div class="demo-box">
        <van-field v-model="inputName" label="输入用户名" placeholder="请输入用户名" />
        <van-field
          v-model.number="inputCount1"
          label="输入 count1"
          type="number"
          placeholder="方式一的计数"
        />
        <van-field
          v-model.number="inputCount2"
          label="输入 count2"
          type="number"
          placeholder="方式二的计数"
        />
        <van-field
          v-model.number="inputCount3"
          label="输入 count3"
          type="number"
          placeholder="方式三的计数"
        />
      </div>

      <div class="button-group">
        <van-button type="primary" @click="handlePatch">批量更新</van-button>
        <van-button type="default" @click="handleReset">$reset 重置</van-button>
      </div>

      <div class="code-tip">
        <p>💡 使用方法：</p>
        <pre>
// 对象方式
store.$patch({
  count1: 100,
  count2: 200,
  count3: 300,
  username: 'Admin'
})

// 函数方式（可访问当前 state）
store.$patch((state) => {
  state.count1 += 10
  state.username = 'User'
})</pre
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Pinia 使用示例组件
 *
 * 演示了 Pinia 的四种常见使用方式：
 * 1. 计算属性方式 - 适合需要自定义逻辑的场景
 * 2. storeToRefs 解构方式 - 推荐，代码简洁且响应式
 * 3. 调用 Actions - 适合业务逻辑和异步操作
 * 4. $patch 批量更新 - 性能优化，批量修改多个状态
 */

import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDevStore } from '@/config/store/dev'

// 初始化 store
const store = useDevStore()

// ==================== 方式一：计算属性 ====================
/**
 * 使用 computed 包装 store 的值
 * 优点：可以自定义 getter 和 setter 逻辑
 * 缺点：代码相对繁琐
 */
const count1 = computed({
  get: () => store.count1,
  set: (val) => {
    store.count1 = val
  },
})

const add1 = () => {
  count1.value++
}

const reduce1 = () => {
  count1.value--
}

const increase1 = () => {
  count1.value += 10
}

const resetCount1 = () => {
  store.count1 = 0
}

// ==================== 方式二：storeToRefs（推荐） ====================
/**
 * 使用 storeToRefs 解构 store
 * 优点：代码简洁，保持响应式
 * 注意：只用于解构 state 和 getters，actions 直接从 store 解构
 */
const { count2, username, getUserInfo } = storeToRefs(store)

const add2 = () => {
  count2.value++
}

const reduce2 = () => {
  count2.value--
}

const increase2 = () => {
  count2.value += 10
}

const resetCount2 = () => {
  store.count2 = 0
}

// ==================== 方式三：调用 Actions ====================
/**
 * 直接调用 store 中定义的 actions
 * 优点：业务逻辑封装在 store 中，组件更简洁
 * 适用于：复杂逻辑、异步操作、多个状态联动
 */
const loading = ref(false)

const handleIncrement = () => {
  // 调用 store 的 increment action，默认 +1
  store.increment()
}

const handleDecrement = () => {
  // 调用 store 的 decrement action，传参 -5
  store.decrement(5)
}

const handleIncrementAsync = async () => {
  loading.value = true
  try {
    // 调用异步 action，延迟 1 秒后 +1
    await store.incrementAsync(1000)
  } finally {
    loading.value = false
  }
}

const handleResetAll = () => {
  // 调用自定义的 resetAll action
  store.resetAll()
}

// ==================== 方式四：$patch 批量更新 ====================
/**
 * 使用 $patch 批量更新多个状态
 * 优点：性能更好，只触发一次响应式更新
 * 适用于：需要同时更新多个状态的场景
 */
const inputName = ref('')
const inputCount1 = ref(0)
const inputCount2 = ref(0)
const inputCount3 = ref(0)

const handlePatch = () => {
  // 对象方式：直接传入要更新的字段
  store.$patch({
    count1: inputCount1.value,
    count2: inputCount2.value,
    count3: inputCount3.value,
    username: inputName.value || 'Guest',
  })

  // 函数方式（可以访问当前 state）
  // store.$patch((state) => {
  //   state.count1 = inputCount1.value
  //   state.count2 = inputCount2.value
  //   state.count3 = inputCount3.value
  //   state.username = inputName.value
  // })
}

const handleReset = () => {
  // 重置到初始状态
  store.$reset()
  inputName.value = ''
  inputCount1.value = 0
  inputCount2.value = 0
  inputCount3.value = 0
}
</script>

<style scoped lang="scss">
.dev-pinia.page-content {
  padding: 40px 20px 20px;
  background: #f7f8fa;
  min-height: 100vh;

  // 区块样式
  .section {
    margin-bottom: 40px;
    padding: 30px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    h3 {
      margin: 0 0 16px 0;
      font-size: 32px;
      font-weight: bold;
      color: #323233;
    }

    .desc {
      margin: 0 0 20px 0;
      font-size: 26px;
      color: #646566;
      line-height: 1.6;

      strong {
        color: #1989fa;
      }
    }
  }

  // 演示盒子
  .demo-box {
    margin-bottom: 20px;
    padding: 24px;
    background: #f7f8fa;
    border-radius: 12px;

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-size: 28px;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        color: #646566;
        font-weight: 500;
      }

      .value {
        color: #323233;
        font-weight: bold;
      }
    }
  }

  // 按钮组
  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;

    .van-button {
      flex: 1;
      min-width: 140px;
    }
  }

  // 代码提示
  .code-tip {
    padding: 20px;
    background: #263238;
    border-radius: 12px;
    color: #aed581;

    p {
      margin: 0 0 12px 0;
      font-size: 26px;
      color: #82aaff;
    }

    pre {
      margin: 0;
      font-size: 22px;
      line-height: 1.8;
      color: #c3e88d;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: 'Courier New', Consolas, monospace;
    }
  }
}
</style>
