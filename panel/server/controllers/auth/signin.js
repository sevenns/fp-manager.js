const passport = require('koa-passport')
const jwt = require('jsonwebtoken')
const router = require('../../helpers/router')
const config = require('../../../config/server')

module.exports = router('/signin', 'post', async ({ context, next }) => {
  let result = null

  await passport.authenticate('local', (error, user) => {
    if (error) {
      result = error
      throw new Error(error)
    }

    if (user) {
      const token = jwt.sign({
        username: user.username
      }, config.jwtsecret, { expiresIn: '168h' })

      context.session.token = token
      context.session.username = user.username

      result = {
        token,
        username: user.username
      }

      return
    }

    context.throw(404, 'Username not found or invalid password.')
  })(context, next)

  return result
})
