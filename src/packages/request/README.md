## 简介

基于 `axios` 二次封装的简约请求库，默认支持：

- **请求重试**：请求失败时按配置自动重试（带重试次数与间隔）
- **取消重复请求**：同一时间相同「方法 + URL + 参数」的请求只保留一个（基于 `AbortController` 实现）
- **全局 Loading 遮罩**：统一的页面级 loading 组件，可全局配置、单次请求开关
- **HTTP 错误状态码处理**：统一错误提示（基于 Vant `showNotify`）

入口文件为 `@/packages/request`，对外暴露：

- `$get<T>(url, params?, config?)`
- `$post<T>(url, params?, config?)`（`form-urlencoded`）
- `$http<T>(url, params?, config?)`（JSON body）
- `setLoadingOptions(options)`：运行时调整 loading 文案、类名等
- `RequestConfig`：扩展的请求配置类型

---

## 快速上手

### 1. 环境变量与基础配置

请求库会自动读取环境变量作为基础地址：

- `VITE_APP_AXIOS_BASEURL`：赋值给 `axios.defaults.baseURL`

**配置说明：**

1. **前后端不同域名**：使用完整的 URL 地址
   ```env
   VITE_APP_AXIOS_BASEURL = "https://api.example.com"
   ```
   适用场景：前端部署在 `https://www.example.com`，后端 API 在 `https://api.example.com`

2. **前后端同域名**（推荐）：使用相对路径
   ```env
   VITE_APP_AXIOS_BASEURL = "/api"
   ```
   适用场景：前后端部署在同一域名下，如 `https://example.com`
   - 优势：无需处理跨域问题
   - 实际请求地址会自动拼接当前域名：`https://example.com/api/xxx`
   - 部署简单，域名变更无需修改配置

3. **开发环境使用代理**：使用代理路径（解决开发时跨域问题）
   ```env
   VITE_APP_AXIOS_BASEURL = "/proxy_url"
   VITE_APP_PROXY_URL = "https://api.example.com"
   ```
   需要在 `vite.config.ts` 中配置 proxy 代理规则

其他默认配置在 `src/packages/request/config.ts` 中维护。

### 2. 创建一个请求（以 POST 为例）

新建一个 `ts` 文件，并从请求库引入方法：

```ts
import { $post } from '@/packages/request'
import type { RequestConfig } from '@/packages/request'

// 普通用法
export const getList = (params: any): Promise<any> => {
  return $post('/mock/14/demo/getList', params)
}

// 自定义配置
export const getListWithConfig = (params: any): Promise<any> => {
  const config: RequestConfig = {
    cancelDuplicated: false, // 针对该接口关闭「取消重复请求」
    retryDelay: 4000, // 当前请求重试间隔设置为 4 秒
    retryCount: 2, // 当前请求重试次数（不含首次）为 2 次
    shouldRetry: true, // 是否对该请求启用重试（默认 true，可省略）
    enableLoading: false, // 本次请求不展示全局 loading
  }

  return $post('/mock/14/demo/getList', params, config)
}
```

---

## 全局配置（`src/packages/request/config.ts`）

全局配置通过导出的 `requestConfig` 管理，建议**仅在此文件调整全局行为**，业务代码中只按需覆写单次请求配置。

### 1. `axios` 基础配置

```ts
axios: {
  withCredentials: true,
  timeout: 10000,
}
```

| 字段            | 说明                           | 类型    | 默认值  |
| --------------- | ------------------------------ | ------- | ------- |
| withCredentials | 跨域请求是否携带 cookie 等凭证 | boolean | `true`  |
| timeout         | 请求超时时间（毫秒）           | number  | `10000` |

### 2. Loading 相关配置

```ts
loading: {
  loadingEnabled: true,
  text: '加载中...',
  overlayClass: '',
  className: '',
}
```

| 字段           | 说明                                                               | 类型    | 默认值        |
| -------------- | ------------------------------------------------------------------ | ------- | ------------- |
| loadingEnabled | 是否启用**全局 loading 功能**。可被单个请求的 `enableLoading` 覆盖 | boolean | `true`        |
| text           | 全局默认 loading 文案                                              | string  | `'加载中...'` |
| overlayClass   | 自定义遮罩层类名                                                   | string  | `''`          |
| className      | 自定义内容区类名                                                   | string  | `''`          |

> 若想在运行时修改 loading 文案或样式，可在任意地方调用：
>
> ```ts
> import { setLoadingOptions } from '@/packages/request'
>
> setLoadingOptions({
>   text: '提交中...',
>   overlayClass: 'my-overlay',
>   className: 'my-loading',
> })
> ```

### 3. 请求重试配置

```ts
retry: {
  retryEnabled: true,
  retryCount: 2,
  retryDelay: 1000,
}
```

| 字段         | 说明                                   | 类型    | 默认值 |
| ------------ | -------------------------------------- | ------- | ------ |
| retryEnabled | 是否启用「请求重试」功能（全局开关）   | boolean | `true` |
| retryCount   | 全局默认重试次数（不含首次）           | number  | `2`    |
| retryDelay   | 全局默认两次重试之间的等待时间（毫秒） | number  | `1000` |

> **提示**：如需全局关闭重试，只需要把 `retryEnabled` 改为 `false`。  
> 单个请求仍可通过 `shouldRetry` / `retryCount` / `retryDelay` 自定义重试行为。

### 4. 取消重复请求配置

```ts
cancel: {
  cancelDuplicated: true,
  cancelStrategy: 'cancel-prev',
  ignoreUrls: [] as string[],
}
```

| 字段             | 说明                                                                             | 类型                             | 默认值          |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------- | --------------- |
| cancelDuplicated | 是否启用「取消重复请求」功能（全局开关）                                         | boolean                          | `true`          |
| cancelStrategy   | 全局取消策略：`cancel-prev` 取消前一个保留当前；`cancel-next` 取消当前保留前一个 | `'cancel-prev' \| 'cancel-next'` | `'cancel-prev'` |
| ignoreUrls       | 不做重复请求检查的 URL 列表（与 `config.url` 精确匹配）                          | `string[]`                       | `[]`            |

> 内部使用「方法 + URL + 参数（GET 用 params，其他方法用 data）」作为判断重复请求的 key。

---

## 单个请求配置（`RequestConfig` 扩展项）

在 `src/packages/request/types.ts` 中，对 `AxiosRequestConfig` 做了扩展，常用字段如下：

| 字段               | 说明                                                                                           | 类型                             | 默认值   |
| ------------------ | ---------------------------------------------------------------------------------------------- | -------------------------------- | -------- |
| enableLoading      | 是否对当前请求启用 loading。不设置时走全局 `requestConfig.loading.loadingEnabled`              | boolean                          | 继承全局 |
| cancelDuplicated   | 是否对当前请求启用「取消重复请求」功能。不设置时走全局 `requestConfig.cancel.cancelDuplicated` | boolean                          | 继承全局 |
| cancelStrategy     | 当前请求的取消策略。不设置时走全局 `requestConfig.cancel.cancelStrategy`                       | `'cancel-prev' \| 'cancel-next'` | 继承全局 |
| retryCount         | 当前请求的重试次数（不含首次），优先级高于全局 `retry.retryCount`                              | number                           | 继承全局 |
| retryDelay         | 当前请求的重试延迟时间（毫秒），优先级高于全局 `retry.retryDelay`                              | number                           | 继承全局 |
| shouldRetry        | 是否对当前请求启用重试。设置为 `false` 时，即使全局开启也不会重试                              | boolean                          | `true`   |
| enableErrorMessage | 是否展示错误信息。设置为 `false` 时，即使全局处理逻辑也不会弹出错误 Notify                     | boolean                          | `true`   |

> 其余字段与 `AxiosRequestConfig` 一致（如 `headers`、`params`、`data` 等），可以照常使用。

### 示例：单次关闭 loading

```ts
import { $get } from '@/packages/request'

$get('/api/user/detail', { id: 1 }, { enableLoading: false })
```

### 示例：单次关闭重试

```ts
import { $get } from '@/packages/request'

$get('/api/user/detail', { id: 1 }, { shouldRetry: false })
```

### 示例：单次关闭「取消重复请求」

```ts
import { $get } from '@/packages/request'

$get('/api/user/detail', { id: 1 }, { cancelDuplicated: false })
```

### 示例：单次关闭错误提示

```ts
import { $get } from '@/packages/request'

$get('/api/user/detail', { id: 1 }, { enableErrorMessage: false }).catch((err) => {
  // 自己处理错误
})
```

---

## 错误处理与提示

所有请求最终会走统一的错误处理函数 `httpErrorStatusHandle`：

- 基于 `axios` 的错误对象判断 HTTP 状态码
- 按状态码映射为友好的中文错误信息
- 通过 Vant 的 `showNotify({ type: 'danger', message })` 弹出提示
- 若请求被取消（`axios.isCancel` / `AbortError`），仅在控制台输出日志，不弹窗

如果你希望某些请求**静默失败**，可以将单个请求的 `enableErrorMessage` 设为 `false`。

---

## 调试与 Demo

项目内提供了一个可视化 Demo 页，路径为：

- `src/views/dev/components/request/index.vue`

在此页面中可以直观看到：

- 修改 loading 文案 & 查看效果
- 带重试 / 关闭重试 的对比
- 取消重复请求 / 不取消重复请求 的对比
- 单个请求关闭全局 loading 的示例

推荐在开发时多用这个页面验证请求配置是否符合预期。
