module.exports = {
  context: 'assets',
  entry: {
    styles: './styles/main.scss',
    scripts: './scripts/main.js',
  },
  devtool: 'inline-source-map',
  outputFolder: '../assets',
  publicFolder: 'assets',
  proxyTarget: 'http://localhost:8888/vt',
  watch: [
    '../**/*.php',
  ]
}
