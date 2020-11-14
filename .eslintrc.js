const path = require('path')

module.exports = {
  env: {
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'prettier',
    'prettier/@typescript-eslint',
    'standard',
  ],
  ignorePatterns: [
    'build', //
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint', //
    'import',
    'jest',
    'simple-import-sort',
  ],
  rules: {},
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.js', '.json'],
        map: [['src', path.resolve(__dirname, 'src')]],
      },
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
