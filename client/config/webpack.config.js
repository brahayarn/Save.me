const path = require('node:path'); // Node.js path module 
//https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v55.0.0/docs/rules/prefer-node-protocol.md
// When importing builtin modules, it's better to use the node: protocol as it makes it perfectly clear 
//that the package is a Node.js builtin module.
//Note that Node.js support for this feature began in: v16.0.0, 
const HtmlWebPackPlugin = require('html-webpack-plugin');

const basicConfig = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebPackPlugin({
    template: path.resolve(__dirname, '../templates/index.html'),
  })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          }
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@hooks': path.resolve(__dirname, '../src/hooks'),
    }
  },
  devServer: {
    port: 9000,
  }
};

module.exports = basicConfig;