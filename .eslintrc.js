/*
 * @Author: h-huan
 * @Date: 2023-03-24 11:55:51
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-19 17:17:54
 * @Description: 
 */
const { defineConfig } = require('eslint-define-config')

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
    'no-console': 0,
    'vue/html-self-closing': 0,
    'vue/no-v-html': 0,
    'vue/valid-v-slot': 0,
    'vue/valid-template-root': 0,
    'vue/multi-word-component-names': 0,
    'vue/attributes-order': 0,
    'vue/script-indent': 0,
    'vue/require-default-prop': 0
  }
})