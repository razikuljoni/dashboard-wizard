module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  plugins: ['react', 'react-hooks', 'import', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  rules: {
    // stylistic (Prettier will handle formatting)
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-debugger': 'warn',

    // import rules
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
      },
    ],

    // react
    'react/prop-types': 'off',

    // a11y
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
