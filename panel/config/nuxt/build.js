const paths = require('../paths')
const { resolve } = require('path')
const server = require('../server')

const styles = resolve(paths.client, 'assets/styles')
const host = process.env.HOST || server.host
const port = process.env.PORT || server.port

module.exports = {
  postcss: {
    plugins: { autoprefixer: {} }
  },

  vendor: [
    '~/plugins/axios',
    'xterm'
  ],

  extend (config, { isDev, isClient }) {
    config.resolve.alias.styles = styles

    if (isDev && isClient) {
      // eslint-disable-next-line
      config.entry.app[0] = `webpack-hot-middleware/client?name=client&reload=true&timeout=30000&path=http://${host}:${port}/__webpack_hmr`
    }

    config.module.rules.push({
      test: /\.(txt|log)$/,
      loader: 'raw-loader'
    })

    config.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      include: [paths.client]
    })
  }
}
