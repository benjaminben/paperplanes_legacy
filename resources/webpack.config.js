const path = require("path");
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const context = "assets"
const outputFolder = "../assets"
const config = {
  context: path.resolve(context),
  entry: {
    "styles/main": "./styles/main.scss",
    "scripts/main": "./scripts/main.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractWebpackPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
          } },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader' }
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
    ...[
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
          // 'stylesheet.css' // Need this for fonts/*/stylesheet.css structure
        ]
      })
    ]
  ],
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
    },
  },
  output: {
    path: path.resolve(outputFolder),
    filename: "[name].js",
  },
}

module.exports = function(env, argv) {
  config.mode = argv.mode
  return config
}
