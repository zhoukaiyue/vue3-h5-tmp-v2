<template>
  <div class="page-content dev-tool-copy">
    <van-notice-bar left-icon="info-o" text="使用浏览器 Clipboard API 实现文本复制功能" wrapable />

    <div class="section">
      <h3 class="section-title">1. 基础文本复制</h3>
      <p class="desc">点击按钮复制预设的文本内容</p>
      <van-button
        class="mt-3"
        size="small"
        plain
        type="primary"
        @click="copyText('Hello, 这是一段测试文本！')"
      >
        复制文本
      </van-button>
    </div>

    <div class="section">
      <h3 class="section-title">2. 复制输入框内容</h3>
      <p class="desc">输入内容后点击复制</p>
      <van-field v-model="inputValue" placeholder="请输入要复制的内容" />
      <van-button class="mt-3" size="small" plain type="primary" @click="copyText(inputValue)">
        复制输入内容
      </van-button>
    </div>

    <div class="section">
      <h3 class="section-title">3. 复制链接</h3>
      <p class="desc">快速复制页面链接</p>
      <div class="url-box">{{ currentUrl }}</div>
      <van-button class="mt-3" size="small" plain type="primary" @click="copyText(currentUrl)">
        复制当前页面链接
      </van-button>
    </div>

    <div class="section">
      <h3 class="section-title">4. 复制JSON数据</h3>
      <p class="desc">复制格式化的JSON对象</p>
      <pre class="json-box">{{ jsonData }}</pre>
      <van-button class="mt-3" size="small" plain type="primary" @click="copyText(jsonData)">
        复制JSON数据
      </van-button>
    </div>

    <div class="section">
      <h3 class="section-title">5. 复制多行文本</h3>
      <p class="desc">复制包含换行符的多行内容</p>
      <pre class="text-box">{{ multiLineText }}</pre>
      <van-button class="mt-3" size="small" plain type="primary" @click="copyText(multiLineText)">
        复制多行文本
      </van-button>
    </div>

    <div class="section">
      <h3 class="section-title">6. 检测浏览器支持</h3>
      <p class="desc">当前浏览器{{ isSupported ? '支持' : '不支持' }} Clipboard API</p>
      <van-tag :type="isSupported ? 'success' : 'danger'">
        {{ isSupported ? '✓ 支持' : '✗ 不支持' }}
      </van-tag>
    </div>

    <div class="tips">
      <h4>💡 使用提示：</h4>
      <ul>
        <li>需要在 HTTPS 或 localhost 环境下使用</li>
        <li>部分浏览器可能需要用户授权</li>
        <li>如果复制失败，可以使用传统的 document.execCommand 方法</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showSuccessToast, showFailToast } from 'vant'

const inputValue = ref('')
const currentUrl = computed(() => window.location.href)

const jsonData = JSON.stringify(
  {
    name: 'Vue3 H5 脚手架',
    version: '2.0.0',
    features: ['Vite', 'TypeScript', 'Pinia', 'Vant'],
  },
  null,
  2,
)

const multiLineText = `第一行内容
第二行内容
第三行内容
这是一段多行文本示例`

const isSupported = computed(() => {
  return !!navigator.clipboard
})

async function copyText(text: string) {
  if (!text) {
    showFailToast('复制内容不能为空')
    return
  }

  try {
    if (navigator.clipboard) {
      // 使用现代 Clipboard API
      await navigator.clipboard.writeText(text)
      showSuccessToast('已复制到剪贴板')
    } else {
      // 降级方案：使用传统方法
      fallbackCopy(text)
    }
  } catch (error) {
    console.error('复制失败:', error)
    showFailToast('复制失败，请重试')
  }
}

// 降级复制方法（兼容不支持 Clipboard API 的浏览器）
function fallbackCopy(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    const successful = document.execCommand('copy')
    if (successful) {
      showSuccessToast('已复制到剪贴板')
    } else {
      showFailToast('复制失败')
    }
  } catch (error) {
    showFailToast('复制失败' + error)
  } finally {
    document.body.removeChild(textarea)
  }
}
</script>

<style scoped lang="scss">
.dev-tool-copy.page-content {
  padding: 20px;
  font-size: 28px;
  background: #f7f8fa;
  min-height: 100vh;

  .section {
    margin-top: 20px;
    padding: 24px;
    background: #fff;
    border-radius: 12px;

    .section-title {
      font-size: 32px;
      font-weight: bold;
      color: #323233;
      margin-bottom: 12px;
    }

    .desc {
      font-size: 26px;
      color: #969799;
      margin-bottom: 12px;
    }

    .url-box,
    .json-box,
    .text-box {
      margin-top: 12px;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      font-size: 24px;
      overflow-x: auto;
      word-break: break-all;
      line-height: 1.6;
    }

    .json-box,
    .text-box {
      white-space: pre-wrap;
      font-family: 'Courier New', monospace;
    }
  }

  .tips {
    margin-top: 20px;
    padding: 24px;
    background: #fff3cd;
    border-radius: 12px;
    border-left: 4px solid #ffc107;

    h4 {
      font-size: 30px;
      font-weight: bold;
      color: #856404;
      margin-bottom: 12px;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        font-size: 26px;
        color: #856404;
        line-height: 1.8;
        list-style-type: disc;
      }
    }
  }
}
</style>
