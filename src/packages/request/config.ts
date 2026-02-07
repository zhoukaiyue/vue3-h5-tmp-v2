/**
 * 请求库全局配置（按功能分组，按需修改）
 *
 * 使用说明：
 * - 建议只在这里调整全局行为（例如 loading 文案、重试次数等），业务代码里按需覆盖单个请求配置即可。
 */
export const requestConfig = {
  /** axios 基础配置 */
  axios: {
    /** 是否在跨域请求中携带凭证（cookie 等） */
    withCredentials: true,
    /** 请求超时时间（毫秒） */
    timeout: 10000,
  },

  /** loading 相关配置 */
  loading: {
    /**
     * 是否启用全局 loading 功能
     *
     * - true：所有请求默认都会显示 loading（除非单个请求显式关闭）
     * - false：所有请求默认不显示 loading（除非单个请求显式开启）
     */
    loadingEnabled: true,
    /** 全局默认 loading 文案 */
    text: '加载中...',
    /** 自定义遮罩层类名 */
    overlayClass: '',
    /** 自定义类名（内容区） */
    className: '',
  },

  /** 请求重试相关配置 */
  retry: {
    /**
     * 是否启用「请求重试」功能（全局开关）
     *
     * - true：开启。请求失败时在满足条件时会自动重试
     * - false：关闭。所有请求都不会自动重试（即使单个请求未显式关闭）
     *
     * 提示：如需全局关闭重试，只需要把这里的 retryEnabled 改为 false。
     */
    retryEnabled: true,

    /**
     * 全局默认重试次数（不包含首次请求）
     *
     * 例如：
     * - retryCount = 2 表示「最多重试 2 次」，总共会发起 1(首次) + 2(重试) = 3 次请求。
     */
    retryCount: 2,

    /**
     * 全局默认两次重试之间的延迟时间（毫秒）
     *
     * 例如：
     * - retryDelay = 1000 表示每次重试前等待 1 秒。
     */
    retryDelay: 1000,
  },

  /** 取消重复请求相关配置 */
  cancel: {
    /**
     * 是否启用「取消重复请求」功能（全局开关）
     *
     * - true：开启。对于相同「方法 + URL + 参数」的并发请求，按策略自动取消多余请求
     * - false：关闭。所有请求都会正常发送，不做重复请求检查
     */
    cancelDuplicated: true,

    /**
     * 取消策略
     *
     * - 'cancel-prev'：取消前一个，保留当前（常用于「永远保留最新一次操作」的场景）
     * - 'cancel-next'：取消当前，保留前一个（常用于「防止用户误触频繁点击」的场景）
     */
    cancelStrategy: 'cancel-prev',

    /**
     * 不做重复请求检查的接口列表
     *
     * 使用说明：
     * - 这里只写「请求时传给 axios 的 url 字符串」，一般为相对路径，如：'/api/user/list'
     * - 精确匹配 URL（即 config.url 与这里的字符串完全相等时才跳过重复检查）
     * - 不支持通配符或前缀匹配，如需更复杂规则建议在 cancel 模块内自行扩展
     */
    ignoreUrls: [] as string[],
  },
}
