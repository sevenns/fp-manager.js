const chalk = require('chalk')
const { once } = require('ramda')
const nodemon = require('nodemon')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack')
const nodemonConfig = require('../config/nodemon')

const env = 'development'
const compiler = webpack(webpackConfig(env))

const startServer = once((error) => {
  if (error) {
    return
  }

  nodemon(nodemonConfig)
    .on('quit', process.exit)
    .on('restart', () => {
      console.log(chalk.cyan.bold('Compiling...'))
    })
})

compiler.watch(webpackConfig.watchOptions || {}, startServer)
