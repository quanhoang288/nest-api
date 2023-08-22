module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['dist/**', '**/node_modules/', '.eslintrc.*', 'test/**'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'jest'],
  root: true,
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'linebreak-style': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-restricted-syntax': 'off',
    'object-curly-newline': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    indent: ['error', 2],
    'jest/prefer-strict-equal': 'warn',
    'jest/no-restricted-matchers': [
      'error',
      {
        toBeFalsy: 'Use `toBe(false)` instead.',
        toBeTruthy: 'Use `toBe(true)` instead.',
      },
    ],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/array-type': ['error'],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/method-signature-style': ['error'],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        ignoreTypeReferences: false,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
