const config = require('../config/mongo')

module.exports = async (context, next) => {
  context.db = context.mongo.db(config.db)

  await next()
}
