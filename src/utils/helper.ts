/**
 * 判断字符串是否为 JSON 字符串
 */
export function isJsonStr(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const str = value.trim()
  if (!str) return false
  const first = str[0]
  const last = str[str.length - 1]
  return (first === '[' && last === ']') || (first === '{' && last === '}')
}

/**
 * 判断值是否为纯对象（JSON 可序列化对象）
 */
export function isJson(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 延时函数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
