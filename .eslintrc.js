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
  overrides: [
    {
      files: ['src/**/*'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },

      plugins: ['simple-import-sort', 'sort-keys-fix'],
      rules: {
        'no-alert': 'off',
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-void': 'error',
        'no-unused-vars': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'react/display-name': 'off',
        'no-empty-function': 'warn',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': 'allow-with-description',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { ignoreRestSiblings: true },
        ],

        'jsx-a11y/anchor-is-valid': 'off',

        'sort-keys-fix/sort-keys-fix': [
          2,
          'asc',
          { caseSensitive: true, natural: true },
        ],

        'react/jsx-sort-default-props': [
          2,
          {
            ignoreCase: false,
          },
        ],
        'react/jsx-sort-props': [
          2,
          {
            callbacksLast: true,
            shorthandLast: true,
            ignoreCase: false,
            noSortAlphabetically: false,
            reservedFirst: true,
          },
        ],
        'react/prop-types': 'off',
        'react/sort-prop-types': [
          2,
          {
            callbacksLast: true,
            ignoreCase: false,
            requiredFirst: true,
            sortShapeProp: true,
            noSortAlphabetically: false,
          },
        ],
        'react/no-unused-prop-types': 'warn',
        'react/no-unused-state': 'warn',
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        parser: 'typescript',
      },
    ],
  },
};
