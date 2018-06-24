const pm2 = require('pm2')

const router = require('../../helpers/router')

module.exports = router('/stop', 'post', async ({ context }) => {
  const { name } = context.request.body

  const result = await stop(name)

  return result
})

function stop (name) {
  return new Promise((resolve, reject) => {
    pm2.delete(name, (error) => {
      if (error) {
        reject(error)
      }

      resolve(true)
    })
  })
}
