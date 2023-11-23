/* eslint-disable no-undef */

/* eslint-disable-next-line no-unused-vars */
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'index.js',
    path: __dirname + '/public'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/html/auth/login.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: './src/html/auth/register.html'
    }),
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),    
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }, 
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js','.scss']
  },
}