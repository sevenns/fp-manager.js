const pm2 = require('pm2')

module.exports = async (context) => {
  const { uid } = context.request.body
  const result = await flushLogs(uid)

  return result
}

function flushLogs (uid) {
  return new Promise((resolve, reject) => {
    pm2.flush(uid, (error, result) => {
      if (error) {
        reject(error)
      }

      resolve(result)
    })
  })
}
