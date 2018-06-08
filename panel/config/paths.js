const { resolve } = require('path')

module.exports = {
  root: resolve(__dirname, '..'),
  client: resolve(__dirname, '../client'),
  server: resolve(__dirname, '../server'),
  app: resolve(__dirname, '../app'),
  static: resolve(__dirname, '../client/static'),
  icons: {
    src: resolve(__dirname, '../client/assets/icons/src'),
    dist: resolve(__dirname, '../client/assets/icons/dist')
  },
  config: resolve(__dirname)
}
