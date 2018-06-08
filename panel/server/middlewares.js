const serve = require('koa-static')
const mongo = require('koa-mongo')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const routes = require('./routes')
const database = require('./database')
const config = require('../config/server')
const mongoConfig = require('../config/mongo')

module.exports = (app) => {
  app.use(async (context, next) => {
    try {
      await next()

      if (context.status === 404 && context.res.headersSent === false) {
        context.throw(404)
      }
    } catch (error) {
      context.status = error.status || 500

      context.type = 'json'
      context.body = error.message

      context.app.emit('error', error, context)
    }
  })

  app.use(mongo(mongoConfig))
  app.use(database)
  app.use(bodyParser())
  app.use(serve(config.static))
  app.use(mount('/api', routes()))
}
