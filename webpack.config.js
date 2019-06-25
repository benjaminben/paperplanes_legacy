var path = require("path");
var config = {
  entry: "./js/src/index.js",
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
      }
    ]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
    },
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "js")
  },
}

module.exports = function(env, argv) {
  config.mode = argv.mode
  return config
}
