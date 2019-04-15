const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
            },
          },
        ],
      },
    ],
  },

  devServer: {
    overlay: true,
    contentBase: './src',
  },

  entry: {
    app: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  },

  plugins: [new HtmlWebpackPlugin({
    inject: false,
    hash: true,
    template: './src/index.html',
    filename: 'index.html',
  }),
  new CopyPlugin([
    { from: 'src/img', to: 'img' },

  ]),
  ],

};
