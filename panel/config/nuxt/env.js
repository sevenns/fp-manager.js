const config = require('../server')

module.exports = {
  HOST_URL: process.env.HOST_URL || `http://${config.host}:${config.port}`
}
