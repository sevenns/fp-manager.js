const paths = require('./paths')
const { resolve } = require('path')

module.exports = {
  script: resolve(paths.server, 'index.js'),
  watch: [paths.server, paths.config],
  ext: 'js'
}
