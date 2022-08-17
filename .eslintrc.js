module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    NodeJS: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
    '@typescript-eslint',
    'import',
    'prettier',
    'unused-imports',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'warn',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'default-param-last': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
