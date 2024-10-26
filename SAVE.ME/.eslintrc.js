module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:unicorn/recommended',
        'plugin:cypress/recommended',
    ],
    settings: {
        react: {
            version: '18.3.1',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.svg'],
            },
            webpack: {
                config: './config/webpack.development.config.js',
            },
        },
        'import/ignore': ['node_modules'],
    },
    plugins: ['simple-import-sort', 'react'],
    ignorePatterns: ['node_modules'],
    rules: {
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'import/namespace': [2, { allowComputed: true }],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'no-const-assign': 'error',
        'prefer-const': 'error',
    },
    overrides: [
        {
            files: ['*rc.js', '*.config.js'],
            rules: {
                'unicorn/prefer-module': 'off',
                'unicorn/filename-case': 'off',
            },
        },
    ],
    globals: {
        Cypress: true,
    },
};
