# 简介

vue3-h5-tmp-v2 基于 Vue3.x setup + TypeScript + Vite + Pinia + Vant4 + sass + tailwindcss + Rem 布局适配 + axios（封装）+ ESLint + Prettier + postcss-pxtorem 等流行技术栈构建移动端模板脚手架，开箱即用。

# 技术规范

## 环境要求

- node ^20.19.0 或 >=22.12.0
- pnpm >=7
- 支持现代浏览器以及 Chrome >= 51、iOS >= 10.0（与 Vue 3 一致）。

## 编辑器以及对应扩展

- Visual Studio Code
- Vue - Official (Volar)
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense

## 快速开发

```bash
# 通过 npm 安装 pnpm（如果本地已安装 pnpm，请忽略）
npm install -g pnpm

# 安装项目依赖
pnpm install

# 开发环境启动
pnpm start
# 或
pnpm dev

# 打包 test 环境代码
pnpm build:test

# 打包生产环境代码
pnpm build
# 或
pnpm build:prod

# 本地预览生产构建
pnpm preview

# 执行 ESLint 并尝试自动修复
pnpm lint:fix

# 执行 Prettier 批量格式化代码（src/ 下所有文件）
pnpm lint:prettier

# 执行 TS 语法错误检查
pnpm lint:type
```

> 注：详细请阅读 `package.json` 以及对应的环境配置文件（`.env.development`、`.env.test`、`.env.production`）。

## API 请求配置

### VITE_APP_AXIOS_BASEURL 配置说明

`VITE_APP_AXIOS_BASEURL` 是 axios 的基础请求地址，**支持绝对路径和相对路径**两种配置方式：

#### 1. 绝对路径（推荐用于跨域API）

```bash
# 直接配置完整的API地址
VITE_APP_AXIOS_BASEURL = "https://api.example.com"
```

适用场景：
- 生产环境的跨域API
- 开发环境直接调用第三方API（需要API支持CORS）

#### 2. 相对路径（推荐用于开发环境代理）

```bash
# 配置相对路径，请求会发送到当前应用域名
VITE_APP_AXIOS_BASEURL = "/api"
```

适用场景：
- 开发环境使用Vite代理转发（避免CORS问题）
- 生产环境前后端同域部署

#### 开发环境使用相对路径配置步骤

1. 修改 `.env.development` 文件：

```bash
VITE_APP_AXIOS_BASEURL = "/api"
```

2. 在 `vite.config.ts` 中启用代理配置（取消注释并修改）：

```ts
server: {
  host: '0.0.0.0',
  port: 23001,
  proxy: {
    '/api': {
      target: 'https://backend.example.com', // 实际后端地址
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''), // 可选：去掉/api前缀
    },
  },
},
```

3. 重启开发服务器

**参考示例**：查看 `.env.development.relative-path.example` 文件获取完整配置示例。

**详细文档**：请参阅 `src/packages/request/README.md` 了解更多请求配置选项。

## 开发基础规范

<font color="red">如果设计稿的尺寸不是 750，而是 375 或其他大小，请在 `postcss.config.js` 的 `postcss-pxtorem` 中及时调整 `rootValue`。</font>

- 🚀 重要、复杂逻辑一定要写注释；
- 🚀 代码规范按照 ESLint 的规则来，做到 no warning 和 no error；
- 🚀 项目业务开发，优先使用 Vue 全家桶技术栈开发项目，预编译使用 sass；
- 🚀 操作成功或失败后要有提示，比如新增成功、新增失败；运行时间长的任务（计算量大、请求后台接口），要有 loading 效果；
- 🚀 Vue 单文件组件代码规范：html、script、style 的顺序为 html > script > style；
- 🚀 公共的状态才放到 store；
- 🚀 代码尽量往纵向发展，一行不要太长；
- 🚀 不要在钩子函数中写大量业务代码；
- 🚀 异步使用 async/await 语法；
- 🚀 不是常用的方法不要全局挂载；
- 🚀 文件命名如果是多单词则采用驼峰命名或烤肉串命名（kebab-case），尽量简洁明了；

### 基础组件名。【注：src/resources/components 目录。】

> 基础组件文件命名应该以 `base` 为前缀命名，以示其唯一性，并且以横线连接。

```
例子：
src
└─ resources
   └─ components
      └─ base-button
         ├─ index.vue      // 源码
         └─ README.md      // 组件使用说明文档
```

### 业务组件名。【注：src/views/.../components 目录。】

> 业务组件文件命名应该以 `the` 为前缀命名，以示其唯一性，并且以横线连接。

```
例子：
src
└─ views
   └─ xxx
      └─ components
         └─ the-button
            ├─ index.vue      // 源码
            └─ README.md      // 组件使用说明文档
```

### 路由文件创建与命名。【注：src/config/router 目录。】

为了方便维护与开发，建议路由文件命名与对应的页面文件命名保持一致，尽量简洁明了。

```
例子：
src
└─ config
   └─ router
      ├─ dev.ts
      ├─ errpage.ts
      └─ index.ts
```

### 接口文件创建与命名。【注：src/config/apis 目录。】

为了方便维护与开发，建议接口文件命名与对应的页面或模块命名保持一致，尽量简洁明了。

```
例子：
src
└─ config
   └─ apis
      └─ dev
```

### 状态切片文件创建与命名。【注：src/config/store 与 src/stores 目录。】

为了方便维护与开发，建议以当前对应模块或功能命名文件夹，采用驼峰命名或烤肉串命名，尽量简洁明了。全局/业务状态可放在 `src/config/store` 或 `src/stores`（Pinia）。

```
例子：
src
└─ config
   └─ store
      └─ dev
```

### 图片资源。【注：src/assets/img 目录。】

建议图片文件夹命名与对应的页面文件命名保持一致，公共图片资源放置到 `src/assets/img/base` 目录下即可。

```
例子：
src
└─ assets
   └─ img
      └─ base
```

## Git 版本规范

### 分支管理

一般项目分主分支（main/master）和其他分支。当有团队成员要开发新功能（Feature）或改 BUG（Fix）时，就从主分支开一个新的分支。

### Commit 规范

- feat 新增功能
- fix 修复 bug
- docs 文档变更
- style 代码格式（不影响功能，例如空格、分号等格式修正）
- refactor 代码重构
- perf 改善性能
- test 测试
- build 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）
- ci 更改持续集成软件的配置文件和 package 中的 scripts 命令
- chore 变更构建流程或辅助工具
- revert 代码回退

### Tag 版本号

版本号以 v 开头，根据当前仓库的 tag 编号进行累加，如：v1.10.45。

## 项目目录说明

```
vue3-h5-tmp-v2
├─ .env.development              // 开发环境配置文件
├─ .env.production               // 生产环境配置文件
├─ .env.test                     // 测试环境配置文件
├─ .editorconfig                 // 编辑器统一配置
├─ .gitignore                    // Git 忽略配置
├─ .oxlintrc.json                // Oxlint 配置
├─ .prettierrc.json              // Prettier 配置文件
├─ .vscode                       // VSCode 编辑器配置
│  └─ extensions.json            // 推荐扩展
├─ env.d.ts                      // TypeScript 环境变量类型声明
├─ eslint.config.ts              // ESLint 配置文件
├─ index.html                    // 项目入口 HTML
├─ package.json                  // 项目配置与脚本
├─ pnpm-lock.yaml                // pnpm 锁文件
├─ postcss.config.js             // PostCSS（含 pxtorem、tailwind）配置
├─ public                        // 静态资源目录
│  └─ static                     // 静态文件（css、img 等）
├─ README.md                     // 项目说明文档
├─ tailwind.config.js            // Tailwind CSS 配置
├─ tsconfig.json                 // TypeScript 配置
├─ tsconfig.app.json             // 应用 TS 配置
├─ tsconfig.node.json            // Node 环境 TS 配置
├─ vite.config.ts                // Vite 构建配置
└─ src                           // 源代码目录
   ├─ App.vue                    // 应用根组件
   ├─ main.ts                    // 项目入口
   ├─ assets                     // 资源
   │  ├─ css                     // 全局样式
   │  └─ img                     // 图片（含 base 公共图）
   ├─ config                     // 配置
   │  ├─ apis                    // 接口模块
   │  ├─ router                  // 路由配置
   │  └─ store                   // 业务 store 模块
   ├─ layout                     // 布局组件（frame-view、tabbar 等）
   ├─ packages                   // 内部包
   │  ├─ request                 // 请求封装（axios、loading、重试、取消等）
   │  └─ router                  // 路由封装（守卫、routes）
   ├─ resources                  // 资源与插件
   │  └─ plugin                  // 插件（如 Vant）
   ├─ router                     // 路由实例
   ├─ stores                     // Pinia 状态（如 counter）
   ├─ utils                      // 工具函数
   └─ views                      // 页面视图
```
