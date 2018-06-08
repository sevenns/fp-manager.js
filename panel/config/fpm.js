const paths = require('./paths')
const { resolve } = require('path')

module.exports = {
  paths: {
    projects: resolve(paths.root, '../projects'),
    logs: resolve(paths.root, '../logs')
  }
}
