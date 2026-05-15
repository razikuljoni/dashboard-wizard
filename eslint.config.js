import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default [
    { ignores: ['node_modules/**', 'dist/**', 'build/**', '.vite/**', 'public/**', 'coverage/**', '*.log'] },
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            react: pluginReact,
        },
        rules: {
            'react/prop-types': 'off',
            'no-unused-vars': 'warn',
            'no-console': 'warn',
            'no-undef': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-key': 'warn'
        },
        settings: {
            react: { version: 'detect' }
        }
    },

];
// import pluginJs from '@eslint/js';
// import pluginPrettier from 'eslint-plugin-prettier';
// import pluginReact from 'eslint-plugin-react';
// import pluginReactHooks from 'eslint-plugin-react-hooks';
// import globals from 'globals';

// export default [
//     {
//         files: ['**/*.{js,mjs,cjs,jsx}'],
//         languageOptions: {
//             ecmaVersion: 12,
//             sourceType: 'module',
//             globals: {
//                 ...globals.browser,
//                 ...globals.es2021,
//             },
//             parserOptions: {
//                 ecmaFeatures: {
//                     jsx: true,
//                 },
//             },
//         },
//         plugins: {
//             react: pluginReact,
//             prettier: pluginPrettier,
//             'react-hooks': pluginReactHooks,
//         },
//         rules: {
//             'no-console': ['warn', { allow: ['warn', 'error'] }],
//             'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//             'react/prop-types': 'off',
//             'prettier/prettier': ['error'],
//             eqeqeq: ['error', 'always'],
//             'no-var': 'error',
//             'prefer-const': ['error', { destructuring: 'all' }],
//             'arrow-body-style': ['warn', 'as-needed'],
//             'react/jsx-boolean-value': ['error', 'always'],
//             'react/jsx-curly-brace-presence': ['error', 'never'],
//             'react/jsx-key': 'error',
//             'react-hooks/rules-of-hooks': 'error',
//             'react-hooks/exhaustive-deps': 'warn',
//         },
//         settings: {
//             react: {
//                 version: 'detect',
//             },
//         },
//     },
//     pluginJs.configs.recommended,
//     pluginReact.configs.recommended,
//     pluginPrettier.configs.recommended,
//     pluginReactHooks.configs.recommended,
// ];
