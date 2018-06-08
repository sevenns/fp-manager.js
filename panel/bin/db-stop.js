const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const exec = require('executive')

const spinner = ora()
let command = 'mongo --eval "db.adminCommand({shutdown : 1})"'
const serviceName = 'MongoDB'
const messages = {
  platform: 'Your platform:',
  stoping: 'Stoping mongodb...\n',
  stoped: 'Stoping mongodb complete.\n'
}

clear()

console.log(`${messages.platform} ${chalk.cyan.bold(process.platform)}\n`)
spinner.start(chalk.cyan.bold(messages.stoping))

if (process.platform === 'win32') {
  command = `mongod --remove --serviceName ${serviceName}`
}

exec.quiet(command).then(() => {
  spinner.succeed(chalk.green.bold(messages.stoped))
})
