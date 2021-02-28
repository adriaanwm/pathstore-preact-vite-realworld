import { defineConfig } from 'vite'
import preactRefresh from '@prefresh/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'preact'`
  },
  plugins: [preactRefresh()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    }
  }
})


// module.exports = {
//   alias: {
//     '/@/': path.resolve(__dirname, 'src')
//   }
// };
