const moment = require('moment')
const pm2 = require('pm2')
const exec = require('executive')
const config = require('../../../../config/fpm')
const { resolve } = require('path')

const { paths } = config

module.exports = async (context) => {
  const env = Object.create(process.env)
  const { uid } = context.request.body
  // const date = moment().format('HH-mm-ss_DD-MM-YYYY')
  const project = {
    uid,
    path: resolve(paths.projects, uid),
    script: resolve(paths.projects, `${uid}/bin/dev.js`),
    logs: resolve(paths.logs, `${uid}.log`)
  }

  const result = await start(project.script, {
    name: uid,
    cwd: project.path,
    env: {
      NODE_ENV: 'development',
      PORT: 8081
    },
    mergeLogs: true,
    output: project.logs,
    logDateFormat: 'HH:mm:ss DD.MM.YYYY'
  }, project.logs)

  return result
}

function start (script, options, logPath) {
  return new Promise((resolve, reject) => {
    pm2.connect((connectError) => {
      if (connectError) {
        console.error(connectError)
        pm2.disconnect()
        reject(connectError)
      }

      pm2.start(script, options, (startError, proc) => {
        if (startError) {
          console.error(startError)
          pm2.disconnect()
          reject(startError)
        }
  
        pm2.disconnect()
        resolve(proc)
      })
    })
  })
}
