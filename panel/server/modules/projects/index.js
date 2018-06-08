const Router = require('koa-trie-router')
const index = require('./routes')
const stop = require('./routes/stop')
const list = require('./routes/list')
const flush = require('./routes/flush')

const router = new Router()

module.exports = () => {
  router.post(index())
  router.post(stop())
  router.get(list())
  router.post(flush())

  return router.middleware()
}
