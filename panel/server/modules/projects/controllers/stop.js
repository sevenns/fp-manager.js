const pm2 = require('pm2')

module.exports = async (context) => {
  const { uid } = context.request.body

  const result = await stop(uid)

  return result
}

function stop (uid) {
  return new Promise((resolve, reject) => {
    pm2.delete(uid, (error) => {
      if (error) {
        reject(error)
      }

      resolve(true)
    })
  })
}
