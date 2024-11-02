const path = require('node:path'); // Node.js path module
const HtmlWebPackPlugin = require('html-webpack-plugin');

const basicConfig = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../templates/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.svg'],
        alias: {
            '@hooks': path.resolve(__dirname, '../src/hooks'),
            '@assets': path.resolve(__dirname, '../src/assets/'),
        },
    },
    devServer: {
        port: 9000,
        historyApiFallback: true,
    },
};

module.exports = basicConfig;
