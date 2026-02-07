<template>
  <div class="page-content dev-request-demo">
    <van-notice-bar left-icon="info-o" text="基于 @/packages/request 的请求库使用 demo" wrapable />

    <div class="section">
      <h3 class="section-title">配置 Loading</h3>
      <p class="desc text-secondary">修改文案后点击「应用」，再发请求即可看到效果。</p>
      <p class="desc text-secondary">
        单个请求可通过 <code>enableLoading: false</code> 关闭 loading，仅保留按钮自身的 loading
        效果。
      </p>
      <label class="loading-input-wrap">
        <span class="loading-input-label">文案</span>
        <input v-model="loadingText" type="text" class="loading-input" placeholder="加载中..." />
      </label>
      <div class="loading-demo-actions">
        <van-button type="primary" size="small" @click="applyLoadingConfig">应用</van-button>
        <van-button
          type="primary"
          size="small"
          plain
          :loading="loadingDemo"
          @click="fetchWithLoading"
        >
          发请求看效果（使用全局 loading）
        </van-button>
        <van-button
          type="primary"
          size="small"
          plain
          :loading="loadingDemoNoGlobal"
          @click="fetchWithoutGlobalLoading"
        >
          本次不使用全局 loading
        </van-button>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">请求重试</h3>
      <p class="desc text-secondary">
        请求失败时会按全局配置自动重试（retryCount、retryDelay）。单请求可通过
        <code>shouldRetry: false</code> 关闭重试。
      </p>
      <p class="desc text-secondary">
        使用与上方 Loading 相同的接口地址，带重试 / 关闭重试仅在请求失败时会有区别。
      </p>
      <div class="retry-demo-actions">
        <van-button type="primary" size="small" :loading="loadingRetry" @click="fetchWithRetry">
          带重试（失败会重试）
        </van-button>
        <van-button
          type="primary"
          size="small"
          plain
          :loading="loadingNoRetry"
          @click="fetchWithoutRetry"
        >
          关闭重试（只请求一次）
        </van-button>
      </div>
      <div v-if="resultRetry" class="result-box mt-3">
        <div class="result-label">结果：</div>
        <pre class="result-json">{{ resultRetry }}</pre>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">重复请求取消（方法 + URL + 参数 相同才视为重复）</h3>
      <p class="desc text-secondary">
        连续发两次<strong>完全相同</strong>的请求时，前一个会被取消，只保留最后一次。<br />
        对于 GET 请求，「参数」指的是 <code>params</code>；对于其他方法，则指 <code>data</code>。
      </p>
      <div class="retry-demo-actions">
        <van-button type="primary" size="small" plain :loading="loadingDup" @click="fetchDuplicate">
          取消重复请求（只保留最后一次）
        </van-button>
        <van-button
          type="primary"
          size="small"
          plain
          :loading="loadingDupNoCancel"
          @click="fetchDuplicateWithoutCancel"
        >
          不取消重复请求（全部发送）
        </van-button>
      </div>
      <div v-if="resultDup" class="result-box mt-3">
        <pre class="result-json">{{ resultDup }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { setLoadingOptions } from '@/packages/request'
import { getScaffoldInfo } from '@/config/apis/dev/getScaffoldInfo'

const loadingText = ref('加载中...')
const loadingDemo = ref(false)
const loadingDemoNoGlobal = ref(false)
const loadingRetry = ref(false)
const loadingNoRetry = ref(false)
const loadingDup = ref(false)
const loadingDupNoCancel = ref(false)
const resultRetry = ref<string | null>(null)
const resultDup = ref<string | null>(null)

function applyLoadingConfig() {
  setLoadingOptions({ text: loadingText.value || '加载中...' })
}

async function fetchWithLoading() {
  loadingDemo.value = true
  try {
    await getScaffoldInfo({
      shouldRetry: false,
      cancelDuplicated: false,
    })
  } finally {
    loadingDemo.value = false
  }
}

/** 演示：单个请求关闭全局 loading，只保留按钮 loading 效果 */
async function fetchWithoutGlobalLoading() {
  loadingDemoNoGlobal.value = true
  try {
    await getScaffoldInfo({
      shouldRetry: false,
      cancelDuplicated: false,
      enableLoading: false,
    })
  } finally {
    loadingDemoNoGlobal.value = false
  }
}

/** 演示：带重试的请求（失败时会按全局配置重试） */
async function fetchWithRetry() {
  loadingRetry.value = true
  resultRetry.value = null
  const start = Date.now()
  try {
    const res = await getScaffoldInfo()
    resultRetry.value = `请求成功\n耗时: ${Date.now() - start}ms\n${JSON.stringify(
      res?.data ?? res,
      null,
      2,
    )}`
  } catch (e: unknown) {
    const err = e as { response?: { status?: number }; message?: string }
    const status = err.response?.status
    const msg = err.message ?? String(e)
    resultRetry.value = `请求失败（已按配置重试）\n耗时: ${
      Date.now() - start
    }ms\n状态: ${status ?? '-'}\n${msg}`
  } finally {
    loadingRetry.value = false
  }
}

/** 演示：关闭重试（失败时只请求一次） */
async function fetchWithoutRetry() {
  loadingNoRetry.value = true
  resultRetry.value = null
  const start = Date.now()
  try {
    const res = await getScaffoldInfo({ shouldRetry: false })
    resultRetry.value = `请求成功\n耗时: ${Date.now() - start}ms\n${JSON.stringify(
      res?.data ?? res,
      null,
      2,
    )}`
  } catch (e: unknown) {
    const err = e as { response?: { status?: number }; message?: string }
    const status = err.response?.status
    const msg = err.message ?? String(e)
    resultRetry.value = `请求失败（未重试，只请求一次）\n耗时: ${
      Date.now() - start
    }ms\n状态: ${status ?? '-'}\n${msg}`
  } finally {
    loadingNoRetry.value = false
  }
}

/** 演示：连续两次相同请求，第一次会被取消 */
async function fetchDuplicate() {
  loadingDup.value = true
  resultDup.value = null
  const noRetry = { shouldRetry: false }
  const logs: string[] = []
  getScaffoldInfo({ ...noRetry, headers: { 'X-Demo-Request': '1' } })
    .then((res) => {
      logs.push('请求1 完成: ' + JSON.stringify(res?.data?.title))
      resultDup.value = logs.join('\n')
    })
    .catch((e) => {
      logs.push('请求1 被取消或失败: ' + (axios.isCancel?.(e) ? '已取消' : String(e)))
      resultDup.value = logs.join('\n')
    })
  getScaffoldInfo({ ...noRetry, headers: { 'X-Demo-Request': '2' } })
    .then((res) => {
      logs.push('请求2 完成: ' + JSON.stringify(res?.data?.title))
      resultDup.value = logs.join('\n')
    })
    .catch((e) => {
      logs.push('请求2 被取消或失败: ' + (axios.isCancel?.(e) ? '已取消' : String(e)))
      resultDup.value = logs.join('\n')
    })
  setTimeout(() => {
    loadingDup.value = false
    if (!resultDup.value) resultDup.value = logs.length ? logs.join('\n') : '等待结果...'
  }, 3000)
}

/** 演示：不取消重复请求（全部发送） */
async function fetchDuplicateWithoutCancel() {
  loadingDupNoCancel.value = true
  resultDup.value = null
  const noRetry = { shouldRetry: false, cancelDuplicated: false }
  const logs: string[] = []
  try {
    const [res1, res2] = await Promise.all([
      getScaffoldInfo({ ...noRetry, headers: { 'X-Demo-Request': 'A' } }),
      getScaffoldInfo({ ...noRetry, headers: { 'X-Demo-Request': 'B' } }),
    ])
    logs.push('请求A 完成: ' + JSON.stringify(res1?.data?.title))
    logs.push('请求B 完成: ' + JSON.stringify(res2?.data?.title))
    resultDup.value = logs.join('\n')
  } catch (e) {
    logs.push('请求失败: ' + String(e))
    resultDup.value = logs.join('\n')
  } finally {
    loadingDupNoCancel.value = false
  }
}
</script>

<style scoped lang="scss">
.dev-request-demo.page-content {
  padding: 20px;
  background: #fff;

  .section {
    margin-bottom: 40px;

    .loading-input-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .loading-input-label {
      flex-shrink: 0;
      font-size: 26px;
      color: #646566;
    }
    .loading-input {
      flex: 1;
      padding: 12px 16px;
      font-size: 26px;
      border: 1px solid #dcdee0;
      border-radius: 8px;
    }
    .loading-demo-actions,
    .retry-demo-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 12px;
    }

    .desc code {
      padding: 2px 6px;
      font-size: 24px;
      background: #f0f0f0;
      border-radius: 4px;
    }

    .section-title {
      @apply text-[32px] font-bold text-[#323233] mb-[12px];
    }

    .desc {
      @apply text-[26px] text-[#646566] mb-[16px];

      &.text-secondary {
        color: #969799;
      }
    }

    .result-box {
      padding: 16px;
      background: #f7f8fa;
      border-radius: 8px;

      .result-label {
        @apply text-[24px] text-[#646566] mb-[8px];
      }

      .result-json {
        @apply text-[22px] text-[#323233] overflow-auto whitespace-pre-wrap break-words;
        max-height: 320px;
      }
    }
  }
}
</style>
