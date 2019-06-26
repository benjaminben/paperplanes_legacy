const webpack = require('webpack');
const webpackConfig = require('./webpack.config')({ dev: true });
const compiler = webpack(webpackConfig);
