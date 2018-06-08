const { resolve } = require('path')
const paths = require('../paths')
const head = require('./head')
const build = require('./build')
const css = require('./css')
const env = require('./env')
const plugins = require('./plugins')

const preloader = resolve(paths.client, 'components/Preloader.vue')

module.exports = {
  head,
  build,
  css,
  env,
  plugins,

  srcDir: paths.client,
  buildDir: paths.app,
  loading: preloader
}
