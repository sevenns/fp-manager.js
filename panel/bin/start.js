const exec = require('executive')
const clear = require('clear')
const paths = require('../config/paths')
const { resolve } = require('path')

const mainScript = resolve(paths.app, 'main.js')
process.env.NODE_ENV = 'production'

clear()

exec(`node ${mainScript}`, (res) => {
  if (res.status) {
    console.log(res.stderr)
    console.log(res.stdout)
    process.exitCode = 1
    process.exit()
  }
})
