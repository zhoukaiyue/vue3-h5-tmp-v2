<template>
  <div class="page-content dev-layout">
    <van-notice-bar left-icon="bulb-o" text="页面布局组件使用指南" />

    <!-- 简介 -->
    <div class="section">
      <h3>📋 组件说明</h3>
      <blockquote>
        基础布局组件用于页面布局，可集成 tabbar（底部导航栏）在不同页面间切换。<br />
        提供了统一的页面容器，方便管理页面结构和样式。
      </blockquote>
    </div>

    <!-- 何时使用 -->
    <div class="section">
      <h3>🎯 何时使用</h3>
      <ul>
        <li>作为路由组件的根标签使用</li>
        <li>需要统一的页面容器和内边距</li>
        <li>需要集成 tabbar 底部导航</li>
        <li>需要统一的页面滚动行为</li>
      </ul>
    </div>

    <!-- 基础用法 -->
    <div class="section">
      <h3>💻 基础用法</h3>
      <p class="desc">最简单的布局容器使用方式</p>
      <pre class="code"><code>&lt;template&gt;
  &lt;frame-view class="my-page"&gt;
    &lt;!-- 页面内容 --&gt;
    &lt;h1&gt;页面标题&lt;/h1&gt;
    &lt;p&gt;页面内容...&lt;/p&gt;
  &lt;/frame-view&gt;
&lt;/template&gt;</code></pre>
    </div>

    <!-- 带 Tabbar 的布局 -->
    <div class="section">
      <h3>🔖 带 Tabbar 的布局</h3>
      <p class="desc">通过 showTabbar 属性显示底部导航栏</p>
      <pre class="code"><code>&lt;template&gt;
  &lt;!-- 设置 showTabbar 为 true 显示底部导航 --&gt;
  &lt;frame-view class="home-page" :showTabbar="true"&gt;
    &lt;!-- 主要内容区域 --&gt;
    &lt;div class="content"&gt;
      &lt;h1&gt;首页&lt;/h1&gt;
      &lt;p&gt;内容区域&lt;/p&gt;
    &lt;/div&gt;
  &lt;/frame-view&gt;
&lt;/template&gt;</code></pre>
    </div>

    <!-- 自定义样式 -->
    <div class="section">
      <h3>🎨 自定义样式</h3>
      <p class="desc">可以通过 class 自定义页面样式</p>
      <pre class="code"><code>&lt;template&gt;
  &lt;frame-view class="custom-page"&gt;
    &lt;div class="hero-section"&gt;
      &lt;h1&gt;欢迎使用&lt;/h1&gt;
    &lt;/div&gt;
  &lt;/frame-view&gt;
&lt;/template&gt;

&lt;style scoped lang="scss"&gt;
.custom-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .hero-section {
    padding: 100px 40px;
    text-align: center;
    color: white;
  }
}
&lt;/style&gt;</code></pre>
    </div>

    <!-- API 说明 -->
    <div class="section">
      <h3>📖 API 说明</h3>
      <h4>Props</h4>
      <div class="api-table">
        <div class="api-row header">
          <div class="api-col">属性</div>
          <div class="api-col">说明</div>
          <div class="api-col">类型</div>
          <div class="api-col">默认值</div>
        </div>
        <div class="api-row">
          <div class="api-col">class</div>
          <div class="api-col">自定义类名</div>
          <div class="api-col">string</div>
          <div class="api-col">-</div>
        </div>
        <div class="api-row">
          <div class="api-col">showTabbar</div>
          <div class="api-col">是否显示底部导航栏</div>
          <div class="api-col">boolean</div>
          <div class="api-col">false</div>
        </div>
      </div>

      <h4 style="margin-top: 40px">Slots</h4>
      <div class="api-table">
        <div class="api-row header">
          <div class="api-col">名称</div>
          <div class="api-col">说明</div>
        </div>
        <div class="api-row">
          <div class="api-col">default</div>
          <div class="api-col">页面主要内容</div>
        </div>
      </div>
    </div>

    <!-- 提示 -->
    <div class="section tips">
      <h3>💡 使用提示</h3>
      <ul>
        <li><strong>Tabbar 显示：</strong>通过 showTabbar 属性控制是否显示底部导航，默认不显示</li>
        <li>
          <strong>样式隔离：</strong>使用 scoped 样式避免全局污染，通过 class 定制每个页面的样式
        </li>
        <li><strong>Tabbar 位置：</strong>需要底部导航的页面，使用 #tabbar 插槽插入 tabbar 组件</li>
        <li><strong>响应式设计：</strong>注意不同设备的适配，合理使用 padding 和 margin</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dev-layout.page-content {
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

    &.tips {
      background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);

      h3 {
        color: #d84315;
      }

      ul li {
        color: #5d4037;

        strong {
          color: #d84315;
        }
      }
    }

    h3 {
      margin: 0 0 20px 0;
      font-size: 32px;
      font-weight: bold;
      color: #323233;
    }

    h4 {
      margin: 0 0 16px 0;
      font-size: 28px;
      font-weight: bold;
      color: #646566;
    }

    .desc {
      margin: 0 0 16px 0;
      padding: 16px;
      font-size: 26px;
      color: #1989fa;
      background: #e8f4ff;
      border-left: 4px solid #1989fa;
      border-radius: 4px;
    }

    blockquote {
      margin: 0;
      padding: 20px;
      font-size: 28px;
      line-height: 1.8;
      color: #646566;
      background: #f7f8fa;
      border-left: 4px solid #07c160;
      border-radius: 4px;
    }

    ul {
      margin: 0;
      padding-left: 40px;
      font-size: 28px;
      line-height: 2;
      color: #646566;

      li {
        margin-bottom: 12px;

        strong {
          color: #323233;
        }
      }
    }
  }

  // 代码块样式
  .code {
    margin: 0;
    padding: 24px;
    background: #282c34;
    border-radius: 12px;
    overflow-x: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    code {
      display: block;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 24px;
      line-height: 1.8;
      color: #abb2bf;
      white-space: pre;

      // 语法高亮（简单模拟）
      :deep(.tag) {
        color: #e06c75;
      }

      :deep(.attr) {
        color: #d19a66;
      }

      :deep(.string) {
        color: #98c379;
      }

      :deep(.comment) {
        color: #5c6370;
        font-style: italic;
      }
    }
  }

  // API 表格样式
  .api-table {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ebedf0;

    .api-row {
      display: flex;
      border-bottom: 1px solid #ebedf0;

      &:last-child {
        border-bottom: none;
      }

      &.header {
        background: #fafafa;

        .api-col {
          font-weight: bold;
          color: #323233;
        }
      }

      .api-col {
        flex: 1;
        padding: 20px;
        font-size: 26px;
        color: #646566;
        border-right: 1px solid #ebedf0;

        &:last-child {
          border-right: none;
        }

        &:first-child {
          flex: 0 0 180px;
          background: #f7f8fa;
          font-weight: 500;
          color: #323233;
        }
      }
    }
  }
}
</style>
