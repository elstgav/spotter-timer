import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

import path from 'node:path'

const srcDir = path.resolve(__dirname, 'src') // => src/

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
  resolve: {
    alias: [{ find: '$src', replacement: srcDir }],
  },
})
