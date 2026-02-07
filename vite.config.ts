import { fileURLToPath, URL } from 'node:url'

import { VantResolver } from '@vant/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig, loadEnv } from 'vite'
import Components from 'unplugin-vue-components/vite'

const RegImg = /\.(png|jpe?g|gif|svg)(\?.*)?$/
const RegMedia = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/
const RegFonts = /\.(woff2?|eot|ttf|otf)(\?.*)?$/

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const buildVersion = env.VITE_APP_BUILD_VERSION || 'v1.0.0'
  // 传统浏览器兼容：默认开启；设为 0 可关闭以减小体积、加快构建（仅面向现代浏览器时使用）
  const enableLegacy = env.VITE_APP_LEGACY !== '0'

  return {
    base: env.VITE_APP_PUBLIC_URL,
    plugins: [
      vue(),
      env.VITE_APP_ENABLE_VUE_DEVTOOLS === '1' && vueDevTools(),
      Components({
        dirs: ['src/components', 'src/layout', 'src/resources/components'],
        resolvers: [VantResolver()],
      }),
      enableLegacy &&
        legacy({
          targets: 'defaults, not IE 11, Chrome >= 49', // 兼容旧版 Chrome 等，不含 IE11（Vue3 不支持 IE11）
          renderLegacyChunks: true,
          // 必须包含这个，否则 async/await 无法在旧浏览器运行
          additionalLegacyPolyfills: [
            'regenerator-runtime/runtime',
            'abortcontroller-polyfill', // 低版本浏览器无 AbortController，请求取消等功能依赖
          ],
          // 显式列出 polyfills
          polyfills: [
            // 需要的 polyfills 列表
            'es.symbol',
            'es.array.filter',
            'es.promise',
            'es.promise.finally',
            'es/map',
            'es/set',
            'es.array.for-each',
            'es.object.define-properties',
            'es.object.define-property',
            'es.object.get-own-property-descriptor',
            'es.object.get-own-property-descriptors',
            'es.object.keys',
            'es.object.to-string',
            'web.dom-collections.for-each',
            'esnext.global-this',
            'esnext.string.match-all',
            'es.object.entries',
            'es.object.values',
          ],
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    esbuild: {
      drop: env.VITE_APP_DROP_DEBUGGER === '1' ? ['debugger'] : [],
      pure: env.VITE_APP_PURE_CONSOLE === '1' ? ['console.log'] : [],
      ignoreAnnotations: false,
      legalComments: 'none',
    },
    build: {
      target: 'es2015',
      cssCodeSplit: false,
      emptyOutDir: true,
      assetsDir: 'assets',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        plugins: [],
        output: {
          entryFileNames: `assets/js/[name]-${buildVersion}-[hash].js`,
          chunkFileNames: `assets/js/[name]-${buildVersion}-[hash].js`,
          assetFileNames: (assetInfo: { name?: string }) => {
            if (assetInfo.name && RegImg.test(assetInfo.name)) {
              return `assets/img/[name]-${buildVersion}-[hash][extname]`
            }
            if (assetInfo.name && RegMedia.test(assetInfo.name)) {
              return `assets/media/[name]-${buildVersion}-[hash][extname]`
            }
            if (assetInfo.name && RegFonts.test(assetInfo.name)) {
              return `assets/fonts/[name]-${buildVersion}-[hash][extname]`
            }
            return `assets/[ext]/[name]-${buildVersion}-[hash][extname]`
          },
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            ui: ['vant'],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 23001,
    },
  }
})
