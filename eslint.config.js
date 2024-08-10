import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.strict, ...tseslint.configs.stylistic],

    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    settings: {
      react: { version: 'detect' },
    },

    rules: {
      ...prettier.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      '@typescript-eslint/no-confusing-void-expression': ['off'],

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },

  // Relax rules for test files
  {
    files: ['*.test.ts*', '*.fixtures.ts*'],
    rules: {
      /**
       * Allow the `!` postfix operator
       *
       * @see https://typescript-eslint.io/rules/no-non-null-assertion
       */
      '@typescript-eslint/no-non-null-assertion': 'off',

      /**
       * Allow the `any` type
       *
       * @see https://typescript-eslint.io/rules/no-explicit-any
       */
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
