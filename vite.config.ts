/// <reference types="vitest" />

import * as path from 'node:path'
import { defineConfig } from 'vite'

// 热更新模块插件
import react from '@vitejs/plugin-react'

// 文件路由
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'

import mdx from '@mdx-js/rollup'
import { remarkCodeHike } from '@code-hike/mdx'

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
      extensions: ['[tj]s{,x}', 'mdx'], // js jsx ts tsx mdx     [tj]s{,x} == [tj]s?(x)
      exclude: ['**/components/*.ts{,x}', '**/hooks/*.{t,j}s'],
    }),
  ],
  test: {
    // environment: 'happy-dom',
    include: ['test/**/*.test.{ts,js}', 'src/**/test/*.test.{t,j}s'],
  },
})
