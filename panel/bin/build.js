const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const exec = require('executive')
const { resolve } = require('path')
const paths = require('../config/paths')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack')

const nuxtConfig = resolve(paths.config, 'nuxt')
const env = process.env.NODE_ENV || 'production'
const compiler = webpack(webpackConfig(env))
const spinner = ora()

clear()

spinner.start(chalk.cyan.bold('Building client...\n'))

exec.quiet(`rimraf ${paths.app}`).then((res) => {
  if (res.status) {
    spinner.fail(chalk.red.bold('Building client fail.\n'))
    console.log(res.stderr)
    console.log(res.stdout)
  }

  return res.status
}).then((cleanStatus) => {
  if (!cleanStatus) {
    return exec.quiet(`nuxt build -c ${nuxtConfig}`).then((res) => {
      if (res.status) {
        console.log(res.stderr)
        console.log(res.stdout)
      }

      return res.status
    }).then((status) => {
      if (status) {
        spinner.fail(chalk.red.bold('\nBuilding client fail.\n'))
      } else {
        spinner.succeed(chalk.green.bold('Building client complete.\n'))
        spinner.start(chalk.cyan.bold('Building server...\n'))

        return compiler.run((error, stats) => {
          if (error || stats.hasErrors()) {
            console.log(stats.toString({ colors: true }))

            spinner.fail(chalk.red.bold('\nBuilding server fail.\n'))
            process.exitCode = 1
          } else {
            spinner.succeed(chalk.green.bold('Building server complete.\n'))
          }

          return !(error || stats.hasErrors())
        })
      }

      return status
    })
  }

  return cleanStatus
})
