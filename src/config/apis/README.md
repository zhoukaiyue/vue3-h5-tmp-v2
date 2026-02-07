## 接口创建规范

🚀 项目中使用到的接口都应当在该文件夹下，根据**功能模块**创建接口切片文件（如 `dev`、`user` 等）。  
🚀 每个接口都应当在对应切片下创建 **接口函数文件** + **验证器文件**：  
&nbsp;&nbsp;&nbsp;&nbsp;- 接口函数：`xxx.ts`（真正发请求的地方）  
&nbsp;&nbsp;&nbsp;&nbsp;- 接口验证器：放到 `validation` 目录下，每个接口一个独立的 `.d.ts` 文件。  
🚀 每一个接口验证器推荐使用 **命名空间**，命名规则为：`接口名称 + Validator`，例如接口名称为 `getScaffoldInfo`，则命名空间为 `getScaffoldInfoValidator`，这样可以减少变量命名冲突。

> 提示：可以参考 `dev` 模块下的 `getScaffoldInfo` 实现方式。

---

### 1. 验证器类型定义示例（仅定义 data 部分）

```ts
// src/config/apis/dev/validation/getScaffoldInfo.d.ts
/* eslint-disable @typescript-eslint/no-namespace */

export namespace getScaffoldInfoValidator {
  /** 入参类型（当前接口无参数，可留空占位） */
  export interface ParamType {}

  /** 接口返回 data 字段类型 */
  export interface Data {
    title: string
    description: string
    version: string
  }

  /** 接口整体返回类型 */
  export interface ReturnType {
    status: string
    data: Data
    message: string
  }
}
```

### 2. 接口函数创建示例

```ts
// src/config/apis/dev/getScaffoldInfo.ts
import { $get } from '@/packages/request'
import type { RequestConfig } from '@/packages/request'
import type { getScaffoldInfoValidator } from './validation/getScaffoldInfo.d'

/**
 * 获取脚手架项目信息
 * GET https://mock.127516.com/mock/14/demo/vue3-h5-tmp-v2-info
 * 无入参，可传入单请求 config 用于演示重试 / 取消重复请求等
 */
export const getScaffoldInfo = (
  config?: RequestConfig,
): Promise<getScaffoldInfoValidator.ReturnType> => {
  return $get<getScaffoldInfoValidator.ReturnType>(
    '/mock/14/demo/vue3-h5-tmp-v2-info',
    {},
    config ?? {},
  )
}
```

### 3. 在组件中使用示例（`<script setup>`）

```ts
// 示例：在组件中调用接口
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getScaffoldInfo } from '@/config/apis/dev/getScaffoldInfo'
import type { getScaffoldInfoValidator } from '@/config/apis/dev/validation/getScaffoldInfo.d'

const info = ref<getScaffoldInfoValidator.Data | null>(null)

onMounted(async () => {
  const res = await getScaffoldInfo()
  info.value = res.data
})
</script>
```

## 目录说明

```bash
├─ apis
│  ├─ dev                             # dev 模块接口切片
│  │  ├─ getScaffoldInfo.ts          # 接口函数（调用请求库）
│  │  └─ validation                   # 接口验证器相关
│  │     └─ getScaffoldInfo.d.ts     # 接口入参 / 出参类型定义
│  └─ README.md                       # 接口创建说明文档
```
