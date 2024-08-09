import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Support JSX syntax
    tsconfigPaths(), // Support tsConfig `baseURL` and `paths`
    sassDts(), // Generates .d.ts files for Sass/CSS
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
