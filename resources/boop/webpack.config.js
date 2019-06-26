const path = require('path');
const webpack = require('webpack');
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { context, entry, outputFolder, publicFolder } = require('./config');
const getPublicPath = require("./publicPath")

module.exports = (options) => {
  const { dev } = options;
  return {
    mode: dev ? 'development' : 'production',
    context: path.resolve(context),
    watch: true,
    entry: {
      'styles/main': entry.styles,
      'scripts/main': entry.scripts
    },
    output: {
      path: path.resolve(outputFolder),
      publicPath: getPublicPath(publicFolder),
      filename: '[name].js'
    },
    resolve: {
      alias: { "vue$": "vue/dist/vue.esm.js", },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            ...(dev ? [{ loader: 'cache-loader' }] : []),
            { loader: 'babel-loader' }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
              MiniCssExtractWebpackPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: dev } },
            { loader: 'postcss-loader', options: {
              ident: 'postcss',
              sourceMap: dev,
              config: { ctx: { dev } }
            } },
            { loader: 'resolve-url-loader', options: { sourceMap: dev } },
            { loader: 'sass-loader', options: { sourceMap: true, sourceMapContents: dev } }
          ]
        },
        {
            test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico|mp4|webm)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                }
              }
            ]
          },
      ]
    },
    plugins: [
      new MiniCssExtractWebpackPlugin({
          filename: '[name].css'
        }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(`${context}/**/*`),
          to: path.resolve(outputFolder),
        }
      ], {
        ignore: [
          '*.js',
          '*.scss',
          'stylesheet.css' // Need this for fonts/*/stylesheet.css structure
        ]
      })
    ],
  }
}
