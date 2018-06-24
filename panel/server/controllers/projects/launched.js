const pm2 = require('pm2')
const router = require('../../helpers/router')

module.exports = router('/launched', 'get', async ({ context }) => {
  const launched = await fetchLaunched()

  return launched
})

function fetchLaunched () {
  return new Promise((resolve, reject) => {
    pm2.list((error, list) => {
      if (error) {
        reject(error)
      }

      resolve(list)
    })
  })
}
