import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 把本项目挂在 https://prompt-to-harness.github.io/ch02-pages-release-20261101-01/
// 下，属于「项目子路径」部署。Vite 默认按站点根路径生成 /assets/... 的资源引用，
// 直接部署会 404，所以 base 必须带上仓库名对应的前缀。
const PAGES_BASE_PATH = '/ch02-pages-release-20261101-01/'

export default defineConfig(({ mode }) => {
  // CI 里由 actions/configure-pages 把 base_path 通过 BASE_PATH 传进来；
  // 本地没有这个变量时就用同一个默认值，保证本地产物和线上一致。
  const env = loadEnv(mode, '.', 'BASE_')
  const basePath = env.BASE_PATH || PAGES_BASE_PATH

  return {
    plugins: [react()],
    // dev（mode=development）走站点根路径，本地 npm run dev 不用多带一层目录；
    // build / preview（mode=production）用 Pages 子路径，产物才能在线上取到资源。
    base:
      mode === 'development'
        ? '/'
        : basePath.endsWith('/')
          ? basePath
          : `${basePath}/`,
  }
})
