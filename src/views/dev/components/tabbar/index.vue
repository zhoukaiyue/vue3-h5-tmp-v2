<template>
  <frame-view class="dev-tabbar" :showTabbar="true">
    <van-notice-bar left-icon="bars" text="Tabbar 底部导航栏" />

    <!-- 使用说明 -->
    <div class="section">
      <h3>💡 如何显示底部导航</h3>
      <p class="desc">只需在 frame-view 上设置 :showTabbar="true" 即可显示底部导航栏</p>
      <pre class="code"><code>&lt;template&gt;
  &lt;frame-view :showTabbar="true"&gt;
    &lt;!-- 你的页面内容 --&gt;
  &lt;/frame-view&gt;
&lt;/template&gt;</code></pre>
    </div>

    <!-- 配置导航项 -->
    <div class="section">
      <h3>⚙️ 配置导航项</h3>
      <p class="desc">在 src/layout/tabbar/index.vue 中配置导航项</p>
      <pre class="code"><code>&lt;script setup lang="ts"&gt;
const tabs = [
  {
    label: '首页',
    icon: 'wap-home-o',
    router: { path: '/index' }
  },
  {
    label: '开发者中心',
    icon: 'question-o',
    router: { path: '/dev' }
  },
]
&lt;/script&gt;</code></pre>
    </div>

    <!-- 当前页面效果 -->
    <div class="section tips">
      <h3>👀 当前页面</h3>
      <p>本页面已设置 <code>:showTabbar="true"</code>，可以看到底部导航栏的实际效果。</p>
      <p style="margin-top: 16px">
        <strong>showTabbar</strong> 默认值为
        <code>false</code>，不需要底部导航的页面无需设置该属性。
      </p>
    </div>
  </frame-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dev-tabbar {
  padding: 40px 20px 20px;
  background: #f7f8fa;
  min-height: 100vh;

  .section {
    margin-bottom: 40px;
    padding: 30px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    &.tips {
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);

      h3 {
        color: #00796b;
      }

      p {
        margin: 0;
        font-size: 28px;
        line-height: 1.8;
        color: #004d40;

        code {
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 4px;
          color: #d84315;
          font-size: 26px;
        }

        strong {
          color: #00796b;
        }
      }
    }

    h3 {
      margin: 0 0 20px 0;
      font-size: 32px;
      font-weight: bold;
      color: #323233;
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
  }

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
    }
  }
}
</style>
