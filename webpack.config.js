/* eslint-disable no-undef*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index:  '/src/js/pages/index.js',
    login:  '/src/js/pages/login.js',
    register:  '/src/js/pages/register.js',
    form:  '/src/js/pages/JobsForm.js',
    httpClient:  '/src/js/api/HttpClient.js',
    styles: '/src/assets/index.js'
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/src/html'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false, // Desabilita a resolução de URLs
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: '/src/html/index.html',
      filename: 'index.html',
      files: '/src/assets',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: '/src/html/login.html',
      filename: 'login.html',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      template: '/src/html/register.html',
      filename: 'register.html',
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      template: '/src/html/form.html',
      filename: 'form.html',
      chunks: ['form'],
    }),
  ],
};