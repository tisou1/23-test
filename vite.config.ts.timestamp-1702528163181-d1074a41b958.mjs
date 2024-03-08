// vite.config.ts
import * as path from 'node:path'
import { defineConfig } from 'file:///Users/v_wangtao34/t/react-l/node_modules/.pnpm/vite@5.0.7_@types+node@20.10.4_sass@1.69.5/node_modules/vite/dist/node/index.js'
import react from 'file:///Users/v_wangtao34/t/react-l/node_modules/.pnpm/@vitejs+plugin-react-swc@3.5.0_vite@5.0.7/node_modules/@vitejs/plugin-react-swc/index.mjs'
import Pages from 'file:///Users/v_wangtao34/t/react-l/node_modules/.pnpm/vite-plugin-pages@0.32.0_@vue+compiler-sfc@3.3.11_vite@5.0.7/node_modules/vite-plugin-pages/dist/index.js'
import Unocss from 'file:///Users/v_wangtao34/t/react-l/node_modules/.pnpm/unocss@0.58.0_postcss@8.4.32_rollup@4.7.0_vite@5.0.7/node_modules/unocss/dist/vite.mjs'
import mdx from 'file:///Users/v_wangtao34/t/react-l/node_modules/.pnpm/@mdx-js+rollup@3.0.0_rollup@4.7.0/node_modules/@mdx-js/rollup/index.js'
import { remarkCodeHike } from 'file:///Users/v_wangtao34/t/react-l/node_modules/.pnpm/@code-hike+mdx@0.9.0_react@18.2.0/node_modules/@code-hike/mdx/dist/index.esm.mjs'
import stylexPlugin from 'file:///Users/v_wangtao34/t/react-l/node_modules/.pnpm/vite-plugin-stylex@0.1.0_@babel+traverse@7.23.5_@babel+types@7.23.5_vite@5.0.7/node_modules/vite-plugin-stylex/dist/index.mjs'

const __vite_injected_original_dirname = '/Users/v_wangtao34/t/react-l'
const vite_config_default = defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__vite_injected_original_dirname, 'src')}/`,
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
        },
      ],
    }),
    react(),
    Unocss(),
    Pages({
      // 这里路径会当做普通字符串来进行匹配 全局搜过的文件后缀, 所以只能用字符串
      extensions: ['ts', 'js', 'tsx', 'jsx', 'mdx'],
      // js jsx ts tsx mdx     [tj]s{,x} == [tj]s?(x)
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
export {
  vite_config_default as default,
}
// # sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdl93YW5ndGFvMzQvdC9yZWFjdC1sXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdl93YW5ndGFvMzQvdC9yZWFjdC1sL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy92X3dhbmd0YW8zNC90L3JlYWN0LWwvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuLy8gXHU3MEVEXHU2NkY0XHU2NUIwXHU2QTIxXHU1NzU3XHU2M0QyXHU0RUY2XG4vLyBpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuXG4vLyBcdTY1ODdcdTRFRjZcdThERUZcdTc1MzFcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5cbmltcG9ydCBtZHggZnJvbSAnQG1keC1qcy9yb2xsdXAnXG5pbXBvcnQgeyByZW1hcmtDb2RlSGlrZSB9IGZyb20gJ0Bjb2RlLWhpa2UvbWR4J1xuXG4vLyBpbXBvcnQgc3R5bGV4UGx1Z2luIGZyb20gJ0BzdHlsZXhqcy9iYWJlbC1wbHVnaW4nXG4vLyBpbXBvcnQgc3R5bGV4UGx1Z2luIGZyb20gJ0BzdHlsZXhqcy9yb2xsdXAtcGx1Z2luJ1xuaW1wb3J0IHN0eWxleFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZXgnXG5cbi8vIGNsaWNrIHRvIGNvbXBvbmVudFxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnfi8nOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIC8vIHsgZW5mb3JjZTogJ3ByZScsIC4uLm1keCgvKiBqc3hJbXBvcnRTb3VyY2U6IFx1MjAyNiwgb3RoZXJPcHRpb25zXHUyMDI2ICovKSB9LFxuICAgIG1keCh7XG4gICAgICByZW1hcmtQbHVnaW5zOiBbXG4gICAgICAgIHJlbWFya0NvZGVIaWtlLFxuICAgICAgICB7XG4gICAgICAgICAgbGluZU51bWJlcnM6IGZhbHNlLFxuICAgICAgICAgIHNob3dDb3B5QnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICB0aGVtZTogJ2RhcmstcGx1cycsXG4gICAgICAgICAgc2tpcExhbmd1YWdlczogWydtZXJtYWlkJ10sXG4gICAgICAgICAgc3RhdGljTWVkaWFRdWVyeTogJ25vdCBzY3JlZW4sIChtYXgtd2lkdGg6IDc2OHB4KScsXG4gICAgICAgICAgYXV0b0ltcG9ydDogdHJ1ZSxcbiAgICAgICAgICBhdXRvTGluazogZmFsc2UsXG4gICAgICAgICAgc2hvd0NvcHlCdXR0b246IHRydWUsXG4gICAgICAgIH1dLFxuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gICAgVW5vY3NzKCksXG4gICAgUGFnZXMoe1xuICAgICAgLy8gXHU4RkQ5XHU5MUNDXHU4REVGXHU1Rjg0XHU0RjFBXHU1RjUzXHU1MDVBXHU2NjZFXHU5MDFBXHU1QjU3XHU3QjI2XHU0RTMyXHU2NzY1XHU4RkRCXHU4ODRDXHU1MzM5XHU5MTREIFx1NTE2OFx1NUM0MFx1NjQxQ1x1OEZDN1x1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRVx1N0YwMCwgXHU2MjQwXHU0RUU1XHU1M0VBXHU4MEZEXHU3NTI4XHU1QjU3XHU3QjI2XHU0RTMyXG4gICAgICBleHRlbnNpb25zOiBbJ3RzJywnanMnLCAndHN4JywgJ2pzeCcsICdtZHgnXSwgLy8ganMganN4IHRzIHRzeCBtZHggICAgIFt0al1zeyx4fSA9PSBbdGpdcz8oeClcbiAgICAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qLlt0al1zeyx4fScsICcqKi9ob29rcy8qLnt0LGp9cyddLFxuICAgIH0pLFxuXG4gICAgc3R5bGV4UGx1Z2luKFxuICAgICAgLy8ge1xuICAgICAgLy8gICBkZXY6IHRydWUsXG4gICAgICAvLyAgIC8vIFNldCB0aGlzIHRvIHRydWUgZm9yIHNuYXBzaG90IHRlc3RpbmdcbiAgICAgIC8vICAgLy8gZGVmYXVsdDogZmFsc2VcbiAgICAgIC8vICAgdGVzdDogZmFsc2UsXG4gICAgICAvLyAgIC8vIFJlcXVpcmVkIGZvciBDU1MgdmFyaWFibGUgc3VwcG9ydFxuICAgICAgLy8gICB1bnN0YWJsZV9tb2R1bGVSZXNvbHV0aW9uOiB7XG4gICAgICAvLyAgICAgLy8gdHlwZTogJ2NvbW1vbkpTJyB8ICdoYXN0ZSdcbiAgICAgIC8vICAgICAvLyBkZWZhdWx0OiAnY29tbW9uSlMnXG4gICAgICAvLyAgICAgdHlwZTogJ2NvbW1vbkpTJyxcbiAgICAgIC8vICAgICAvLyBUaGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgeW91ciBwcm9qZWN0XG4gICAgICAvLyAgICAgcm9vdERpcjogX19kaXJuYW1lLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICApLFxuICBdLFxuICB0ZXN0OiB7XG4gICAgLy8gZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxuICAgIGluY2x1ZGU6IFsndGVzdC8qKi8qLnRlc3Que3RzLGpzfScsICdzcmMvKiovdGVzdC8qLnRlc3Que3Qsan1zJywgJyoqLyoudGVzdC57dCxqfXMnXSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsWUFBWSxVQUFVO0FBQ3RCLFNBQVMsb0JBQW9CO0FBSTdCLE9BQU8sV0FBVztBQUdsQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBRW5CLE9BQU8sU0FBUztBQUNoQixTQUFTLHNCQUFzQjtBQUkvQixPQUFPLGtCQUFrQjtBQWxCekIsSUFBTSxtQ0FBbUM7QUFxQnpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBUSxhQUFRLGtDQUFXLEtBQUssQ0FBQztBQUFBLElBQ3pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxJQUFJO0FBQUEsTUFDRixlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLGdCQUFnQjtBQUFBLFVBQ2hCLE9BQU87QUFBQSxVQUNQLGVBQWUsQ0FBQyxTQUFTO0FBQUEsVUFDekIsa0JBQWtCO0FBQUEsVUFDbEIsWUFBWTtBQUFBLFVBQ1osVUFBVTtBQUFBLFVBQ1YsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUFDO0FBQUEsSUFDTCxDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQSxNQUVKLFlBQVksQ0FBQyxNQUFLLE1BQU0sT0FBTyxPQUFPLEtBQUs7QUFBQTtBQUFBLE1BQzNDLFNBQVMsQ0FBQyw2QkFBNkIsbUJBQW1CO0FBQUEsSUFDNUQsQ0FBQztBQUFBLElBRUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFlQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQTtBQUFBLElBRUosU0FBUyxDQUFDLDBCQUEwQiw2QkFBNkIsa0JBQWtCO0FBQUEsRUFDckY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
