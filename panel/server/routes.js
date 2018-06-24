const Router = require('koa-trie-router')
const mount = require('koa-mount')

const auth = require('./controllers/auth')
const projects = require('./controllers/projects')

const router = new Router()

module.exports = () => {
  router.use(mount('/auth', auth()))
  router.use(mount('/projects', projects()))

  return router.middleware()
}
