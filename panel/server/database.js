const mongoose = require('mongoose')

const mongo = require('../config/mongo')

module.exports = async () => {
  mongoose.Promise = Promise
  mongoose.set('debug', true)
  mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.db}`)
}
