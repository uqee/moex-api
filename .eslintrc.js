module.exports = {
  env: {
    browser: true,
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
    '*.js', //
    'build',
    'scripts',
    'src/index.d.ts',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint', //
    'import',
    'jest',
    'simple-import-sort',
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    camelcase: 'off',
    'comma-dangle': 'off',
    indent: 'off',
    'import/no-internal-modules': [
      'error',
      {
        allow: [],
      },
    ],
    'import/order': 'off',
    'no-undef': 'off',
    'no-useless-constructor': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'space-before-function-paren': 'off',
  },
}
