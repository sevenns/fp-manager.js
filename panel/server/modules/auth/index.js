const Router = require('koa-trie-router')
const signin = require('./routes/signin')
const signup = require('./routes/signup')

const router = new Router()

module.exports = () => {
  router.post(signin())
  router.post(signup())

  return router.middleware()
}
