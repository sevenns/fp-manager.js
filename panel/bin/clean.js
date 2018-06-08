const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const exec = require('executive')
const paths = require('../config/paths')

const spinner = ora()

clear()

spinner.start(chalk.cyan.bold('Cleaning \'app\' folder...\n'))

exec.quiet(`rimraf ${paths.app}`).then((res) => {
  if (res.status) {
    spinner.fail(chalk.red.bold('Cleaning \'app\' folder fail!\n'))
    console.log(res.stdout)
  } else {
    spinner.succeed(chalk.green.bold('Cleaning \'app\' folder complete.\n'))
  }
})
