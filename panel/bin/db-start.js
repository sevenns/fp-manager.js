const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const { resolve } = require('path')
const exec = require('executive')
const config = require('../config/mongo')

const spinner = ora()
const date = new Date().toDateString().replace(/ /g, '-')
const db = {
  data: resolve(__dirname, '../db/data'),
  logs: resolve(__dirname, `../db/logs/mongodb-${date}.log`)
}

let command = `mongod --dbpath ${db.data} --logpath ${db.logs} --port ${config.port} --bind_ip ${config.host}`

const serviceName = 'MongoDB'
const messages = {
  platform: 'Your platform:',
  port: 'Port:',
  host: 'Host:',
  starting: 'Starting mongodb...\n',
  started: `Starting mongodb complete. Logging to mongodb-${date}.log.\n`
}

clear()

console.log(`${messages.platform} ${chalk.cyan.bold(process.platform)}`)
console.log(`${messages.port} ${chalk.cyan.bold(config.port)}`)
console.log(`${messages.host} ${chalk.cyan.bold(config.host)}\n`)
spinner.start(chalk.cyan.bold(messages.starting))

if (process.platform === 'win32') {
  command += ` --install --serviceName ${serviceName}`

  exec.quiet(command, (error) => {
    if (error) {
      console.log(error)
      process.exitCode = 1
    }

    exec.quiet(`net start ${serviceName}`, () => {
      spinner.succeed(chalk.green.bold(messages.started))
    })
  })
} else {
  command += ' --fork'

  exec.quiet(command, (error) => {
    if (error) {
      console.log(error)
      process.exitCode = 1
    }

    spinner.succeed(chalk.green.bold(messages.started))
  })
}
