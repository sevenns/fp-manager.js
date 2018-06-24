const Router = require('koa-trie-router')
const signin = require('./signin')
const signup = require('./signup')

const router = new Router()

module.exports = () => {
  router.post(signin)
  router.post(signup)

  return router.middleware()
}
