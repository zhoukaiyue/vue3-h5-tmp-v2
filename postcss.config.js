/**
 * PostCSS 配置文件
 * 含 tailwind、autoprefixer、postcss-pxtorem，生产环境启用 cssnano
 */

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
      ],
    },
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file?.includes('vant') ? 37.5 : 75
      },
      propList: ['*'],
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
