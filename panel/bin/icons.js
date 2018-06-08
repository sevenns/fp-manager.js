const ora = require('ora')
const chalk = require('chalk')
const exec = require('executive')
const clear = require('clear')
const paths = require('../config/paths')
const { relative } = require('path')

const srcPath = relative(paths.root, paths.icons.src)
const distPath = relative(paths.root, paths.icons.dist)
const spinner = ora()

clear()

spinner.start(chalk.cyan.bold('Generating icons...\n'))

exec.quiet(`vsvg -s ${srcPath} -t ${distPath}`).then((res) => {
  if (res.status) {
    console.log(res.stderr)
    console.log(res.stdout)
    spinner.fail(chalk.red.bold('Generating icons fail.\n'))
    process.exitCode = 1
    process.exit()
  }

  spinner.succeed(chalk.green.bold('Generating icons complete.\n'))
})
