const Router = require('koa-trie-router')
const mount = require('koa-mount')

const auth = require('./modules/auth')
const projects = require('./modules/projects')

const router = new Router()

module.exports = () => {
  router.use(mount('/auth', auth()))
  router.use(mount('/projects', projects()))

  return router.middleware()
}
