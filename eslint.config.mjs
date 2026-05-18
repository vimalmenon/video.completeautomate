// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import sort from 'eslint-plugin-sort';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{mjs,ts,tsx}'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  sort.configs['flat/recommended'],
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      import: pluginImport,
    },
  },
  {
    ignores: [
      'node_modules/*',
      '.next/*',
      'next-env.d.ts',
      '/pages/api/**/*.ts',
      'out/*',
      'jest.setup.js',
      'jest.config.js',
      '.eslintrc.js',
      '.prettierrc.js',
    ],
  },
  {
    rules: {
      // I suggest this setting for requiring return types on functions only where useful
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowExpressions: true,
        },
      ],
      // Why would you want unused vars?
      '@typescript-eslint/no-unused-vars': ['error'],
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],

      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before',
            },
            {
              group: 'external',
              pattern: 'react-dom',
              position: 'before',
            },
            {
              group: 'external',
              pattern: 'react/**',
              position: 'before',
            },
            {
              group: 'external',
              pattern: 'next',
              position: 'after',
            },
            {
              group: 'external',
              pattern: 'next/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: '@/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@common/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@component/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@context/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@data/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@page/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@style/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@types/**',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@utility/**',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'],
        },
      ],
      // This rule is not compatible with Next.js's <Link /> components
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/no-onchange': 0,

      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      // We will use TypeScript's types for component props instead
      'react/prop-types': 'off',
      // No need to import React when using Next.js
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      // Disable sort/imports to avoid conflicts with import/order
      'sort/imports': 'off',
    },
  },
];
