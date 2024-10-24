const config = {
    '*.{js,jsx}': ['eslint --ignore-path .gitignore --fix --ext .js,.jsx ./src'],
    '*.{js,jsx,css}': ['prettier --write'],
};

module.exports = config;