const passport = require('koa-passport')
const jwt = require('jsonwebtoken')
const config = require('../../../../config/server')

module.exports = async (context, next) => {
  let result = null

  await passport.authenticate('local', (error, user) => {
    if (error) {
      result = error
    }

    // console.log(user)

    if (user) {
      const token = jwt.sign({
        username: user.username
      }, config.jwtsecret, { expiresIn: '168h' })

      result = {
        username: user.username,
        token: `JWT ${token}`
      }
    }
  })(context, next)

  return result
}
