const serve = require('koa-static')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const session = require('koa-session')
const routes = require('./routes')
const config = require('../config/server')
const database = require('./database')
const auth = require('./auth')

module.exports = (app) => {
  app.keys = config.session.secrets

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

  app.use(serve(config.static))
  app.use(session(config.session.options, app))
  app.use(bodyParser())
  app.use(passport.initialize())
  app.use(mount('/api/v1', routes()))

  database()
  auth(passport)
}
