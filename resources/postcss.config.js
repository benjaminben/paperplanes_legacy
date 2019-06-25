module.exports = ({ options }) => {
  return {
    plugins: {
      'autoprefixer': { grid: true },
      'postcss-preset-env': {},
      'css-mqpacker': {},
      'cssnano': options.dev ? false : {
        preset: ['default', {
          discardComments: { removeAll: true }
        }]
      }
    }
  }
};
