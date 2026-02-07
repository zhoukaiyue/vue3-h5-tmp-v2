<template>
  <div class="page-content dev-lodashjs">
    <van-notice-bar
      left-icon="info-o"
      text="Lodash 是一个强大的 JavaScript 工具库，推荐按需引入使用"
      wrapable
    />

    <div class="install-section">
      <h3 class="title">📦 安装</h3>
      <pre class="code">pnpm add lodash-es</pre>
      <p class="tip">lodash-es 是 ES Module 版本，支持 tree-shaking，推荐使用</p>
    </div>

    <div class="section">
      <h3 class="section-title">1. 数组方法示例</h3>

      <div class="example">
        <h4>chunk - 数组分块</h4>
        <p class="desc">将数组拆分成指定大小的小数组</p>
        <pre class="code">chunk([1, 2, 3, 4, 5], 2)</pre>
        <div class="result">
          <span class="label">结果：</span>
          <code>{{ chunkResult }}</code>
        </div>
      </div>

      <div class="example">
        <h4>uniq - 数组去重</h4>
        <p class="desc">移除数组中的重复值</p>
        <pre class="code">uniq([1, 2, 2, 3, 4, 4, 5])</pre>
        <div class="result">
          <span class="label">结果：</span>
          <code>{{ uniqResult }}</code>
        </div>
      </div>

      <div class="example">
        <h4>difference - 数组差集</h4>
        <p class="desc">找出第一个数组中不在其他数组的值</p>
        <pre class="code">difference([1, 2, 3, 4], [2, 4])</pre>
        <div class="result">
          <span class="label">结果：</span>
          <code>{{ differenceResult }}</code>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">2. 对象方法示例</h3>

      <div class="example">
        <h4>omit - 移除对象属性</h4>
        <p class="desc">创建一个省略指定属性的对象副本</p>
        <pre class="code">omit(user, ['password', 'token'])</pre>
        <div class="result">
          <span class="label">结果：</span>
          <pre class="json">{{ omitResult }}</pre>
        </div>
      </div>

      <div class="example">
        <h4>pick - 选择对象属性</h4>
        <p class="desc">创建一个只包含指定属性的对象副本</p>
        <pre class="code">pick(user, ['id', 'name'])</pre>
        <div class="result">
          <span class="label">结果：</span>
          <pre class="json">{{ pickResult }}</pre>
        </div>
      </div>

      <div class="example">
        <h4>merge - 深度合并对象</h4>
        <p class="desc">递归合并多个对象的属性</p>
        <pre class="code">merge(obj1, obj2)</pre>
        <div class="result">
          <span class="label">结果：</span>
          <pre class="json">{{ mergeResult }}</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">3. 字符串方法示例</h3>

      <div class="example">
        <h4>camelCase - 驼峰命名</h4>
        <p class="desc">转换字符串为驼峰格式</p>
        <pre class="code">camelCase('hello world')</pre>
        <div class="result">
          <span class="label">结果：</span>
          <code>{{ camelCaseResult }}</code>
        </div>
      </div>

      <div class="example">
        <h4>kebabCase - 短横线命名</h4>
        <p class="desc">转换字符串为短横线格式</p>
        <pre class="code">kebabCase('helloWorld')</pre>
        <div class="result">
          <span class="label">结果：</span>
          <code>{{ kebabCaseResult }}</code>
        </div>
      </div>

      <div class="example">
        <h4>truncate - 截断字符串</h4>
        <p class="desc">截断字符串并添加省略号</p>
        <pre class="code">truncate(longText, {{ '{ length: 20 }' }})</pre>
        <div class="result">
          <span class="label">结果：</span>
          <code>{{ truncateResult }}</code>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">4. 工具方法示例</h3>

      <div class="example">
        <h4>debounce - 防抖</h4>
        <p class="desc">延迟执行函数，常用于输入框搜索</p>
        <van-field v-model="searchValue" placeholder="输入搜索关键词" @input="handleSearch" />
        <div class="result">
          <span class="label">搜索关键词：</span>
          <code>{{ searchKeyword }}</code>
        </div>
      </div>

      <div class="example">
        <h4>throttle - 节流</h4>
        <p class="desc">限制函数执行频率，常用于滚动事件</p>
        <van-button type="primary" size="small" @click="handleThrottleClick">
          点击测试节流 ({{ clickCount }})
        </van-button>
      </div>

      <div class="example">
        <h4>cloneDeep - 深拷贝</h4>
        <p class="desc">创建一个值的深拷贝</p>
        <pre class="code">cloneDeep(complexObject)</pre>
        <div class="result">
          <span class="label">是否相等：</span>
          <code>{{ isCloneEqual }}</code>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <h3 class="title">📝 使用方式</h3>
      <pre class="code">
// 按需引入（推荐，支持 tree-shaking）
import chunk from 'lodash-es/chunk'
import uniq from 'lodash-es/uniq'

// 使用
const result = chunk([1, 2, 3, 4], 2)
console.log(result) // [[1, 2], [3, 4]]</pre
      >
    </div>

    <div class="tips">
      <h4>💡 使用建议：</h4>
      <ul>
        <li>优先使用 lodash-es 而不是 lodash，支持更好的 tree-shaking</li>
        <li>按需引入，避免引入整个库增加打包体积</li>
        <li>查看更多方法：<a href="https://lodash.com/docs" target="_blank">官方文档</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import chunk from 'lodash-es/chunk'
import uniq from 'lodash-es/uniq'
import difference from 'lodash-es/difference'
import omit from 'lodash-es/omit'
import pick from 'lodash-es/pick'
import merge from 'lodash-es/merge'
import camelCase from 'lodash-es/camelCase'
import kebabCase from 'lodash-es/kebabCase'
import truncate from 'lodash-es/truncate'
import debounce from 'lodash-es/debounce'
import throttle from 'lodash-es/throttle'
import cloneDeep from 'lodash-es/cloneDeep'

// 1. 数组方法示例
const chunkResult = chunk([1, 2, 3, 4, 5], 2)
const uniqResult = uniq([1, 2, 2, 3, 4, 4, 5])
const differenceResult = difference([1, 2, 3, 4], [2, 4])

// 2. 对象方法示例
const user = {
  id: 1,
  name: 'John Doe',
  password: '123456',
  token: 'abc123',
  email: 'john@example.com',
}

const omitResult = JSON.stringify(omit(user, ['password', 'token']), null, 2)
const pickResult = JSON.stringify(pick(user, ['id', 'name']), null, 2)

const obj1 = { a: 1, b: { x: 1, y: 2 } }
const obj2 = { b: { y: 3, z: 4 }, c: 3 }
const mergeResult = JSON.stringify(merge({}, obj1, obj2), null, 2)

// 3. 字符串方法示例
const camelCaseResult = camelCase('hello world')
const kebabCaseResult = kebabCase('helloWorld')
const longText = '这是一段很长的文本内容，用于测试截断功能'
const truncateResult = truncate(longText, { length: 20 })

// 4. 工具方法示例
const searchValue = ref('')
const searchKeyword = ref('')

const handleSearch = debounce((value: string) => {
  searchKeyword.value = value
}, 500)

const clickCount = ref(0)
const handleThrottleClick = throttle(() => {
  clickCount.value++
}, 1000)

const complexObject = { a: 1, b: { c: 2 } }
const clonedObject = cloneDeep(complexObject)
const isCloneEqual = complexObject === clonedObject ? '相等（浅拷贝）' : '不相等（深拷贝）'
</script>

<style scoped lang="scss">
.dev-lodashjs.page-content {
  padding: 20px;
  font-size: 28px;
  background: #f7f8fa;
  min-height: 100vh;

  .install-section,
  .usage-section {
    margin-top: 20px;
    padding: 24px;
    background: #fff;
    border-radius: 12px;

    .title {
      font-size: 32px;
      font-weight: bold;
      color: #323233;
      margin-bottom: 16px;
    }

    .code {
      padding: 16px;
      background: #282c34;
      color: #abb2bf;
      border-radius: 8px;
      font-size: 24px;
      overflow-x: auto;
      line-height: 1.6;
      font-family: 'Courier New', monospace;
    }

    .tip {
      margin-top: 12px;
      font-size: 24px;
      color: #969799;
    }
  }

  .section {
    margin-top: 20px;
    padding: 24px;
    background: #fff;
    border-radius: 12px;

    .section-title {
      font-size: 32px;
      font-weight: bold;
      color: #323233;
      margin-bottom: 20px;
    }

    .example {
      margin-bottom: 32px;

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        font-size: 30px;
        font-weight: bold;
        color: #1989fa;
        margin-bottom: 8px;
      }

      .desc {
        font-size: 26px;
        color: #969799;
        margin-bottom: 12px;
      }

      .code {
        padding: 12px 16px;
        background: #f5f5f5;
        border-radius: 6px;
        font-size: 24px;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        color: #333;
        line-height: 1.6;
      }

      .result {
        margin-top: 12px;
        padding: 16px;
        background: #e8f4ff;
        border-left: 4px solid #1989fa;
        border-radius: 6px;

        .label {
          font-weight: bold;
          color: #1989fa;
          font-size: 26px;
        }

        code {
          color: #333;
          font-size: 24px;
          word-break: break-all;
        }

        .json {
          margin-top: 8px;
          color: #333;
          font-size: 22px;
          line-height: 1.6;
          font-family: 'Courier New', monospace;
        }
      }
    }
  }

  .tips {
    margin-top: 20px;
    padding: 24px;
    background: #e7f7ff;
    border-radius: 12px;
    border-left: 4px solid #1989fa;

    h4 {
      font-size: 30px;
      font-weight: bold;
      color: #0c5c9c;
      margin-bottom: 12px;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        font-size: 26px;
        color: #0c5c9c;
        line-height: 1.8;
        list-style-type: disc;

        a {
          color: #1989fa;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
