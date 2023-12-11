/// <reference types="vitest" />

import * as path from 'node:path'
import { defineConfig } from 'vite'

// 热更新模块插件
// import react from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react-swc'

// 文件路由
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'

import mdx from '@mdx-js/rollup'
import { remarkCodeHike } from '@code-hike/mdx'

// import stylexPlugin from '@stylexjs/babel-plugin'
// import stylexPlugin from '@stylexjs/rollup-plugin'
import stylexPlugin from 'vite-plugin-stylex'

// click to component
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // { enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */) },
    mdx({
      remarkPlugins: [
        remarkCodeHike,
        {
          lineNumbers: false,
          showCopyButton: false,
          theme: 'dark-plus',
          skipLanguages: ['mermaid'],
          staticMediaQuery: 'not screen, (max-width: 768px)',
          autoImport: true,
          autoLink: false,
          showCopyButton: true,
        }],
    }),
    react(),
    Unocss(),
    Pages({
      // 这里路径会当做普通字符串来进行匹配 全局搜过的文件后缀, 所以只能用字符串
      extensions: ['ts','js', 'tsx', 'jsx', 'mdx'], // js jsx ts tsx mdx     [tj]s{,x} == [tj]s?(x)
      exclude: ['**/components/*.[tj]s{,x}', '**/hooks/*.{t,j}s'],
    }),

    stylexPlugin(
      // {
      //   dev: true,
      //   // Set this to true for snapshot testing
      //   // default: false
      //   test: false,
      //   // Required for CSS variable support
      //   unstable_moduleResolution: {
      //     // type: 'commonJS' | 'haste'
      //     // default: 'commonJS'
      //     type: 'commonJS',
      //     // The absolute path to the root directory of your project
      //     rootDir: __dirname,
      //   },
      // },
    ),
  ],
  test: {
    // environment: 'happy-dom',
    include: ['test/**/*.test.{ts,js}', 'src/**/test/*.test.{t,j}s', '**/*.test.{t,j}s'],
  },
})
