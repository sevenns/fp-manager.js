const localAuth = require('passport-local')
const jwtAuth = require('passport-jwt')

const User = require('./models/user')
const { jwtsecret } = require('../config/server')

const LocalStrategy = localAuth.Strategy
const JwtStrategy = jwtAuth.Strategy
const { ExtractJwt } = jwtAuth
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('User'),
  secretOrKey: jwtsecret
}


module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
  }, (username, password, done) => {
    User.findOne({ username }, (error, user) => {
      if (error) {
        return done(error)
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false)
      }

      return done(null, user)
    })
  }))

  passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.id, (error, user) => {
      if (error) return done(error)

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
