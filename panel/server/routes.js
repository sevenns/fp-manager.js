const Router = require('koa-trie-router')
const mount = require('koa-mount')

const projects = require('./modules/projects')

const router = new Router()

module.exports = () => {
  router.use(mount('/projects', projects()))

  return router.middleware()
}
