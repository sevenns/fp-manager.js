const serve = require('koa-static')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')
const User = require('./models/user')
const routes = require('./routes')
const config = require('../config/server')
const mongo = require('../config/mongo')

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

  app.use(serve(config.static))
  app.use(bodyParser())
  app.use(passport.initialize())
  app.use(mount('/api/v1', routes()))

  mongoose.Promise = Promise
  mongoose.set('debug', true)
  mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.db}`)

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
  }, (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // console.log(password)
      // console.log(user.checkPassword(password))
      if (err) {
        return done(err)
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false)
      }

      return done(null, user)
    })
  }))

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.jwtsecret
  }

  passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.id, (err, user) => {
      if (err) return done(err)

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
