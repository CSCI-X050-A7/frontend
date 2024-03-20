import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },
      '/swagger': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  },
  plugins: [tsconfigPaths(), react(), eslintPlugin()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})
