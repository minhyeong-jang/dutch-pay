module.exports = {
  extends: [
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['eslint-plugin-prettier', 'prettier'],
  env: {
    es2020: true,
    browser: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
      },
    ],
  },
};
