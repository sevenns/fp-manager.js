const pm2 = require('pm2')

module.exports = async (context) => {
  const list = await fetchList()

  return list
}

function fetchList () {
  return new Promise((resolve, reject) => {
    pm2.list((error, list) => {
      if (error) {
        reject(error)
      }

      resolve(list)
    })
  })
}
