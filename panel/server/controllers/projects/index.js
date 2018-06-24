const Router = require('koa-trie-router')
const get = require('./get')
const start = require('./start')
const stop = require('./stop')
const launched = require('./launched')

const router = new Router()

module.exports = () => {
  router.get(get)
  router.get(launched)
  router.post(start)
  router.post(stop)

  return router.middleware()
}
