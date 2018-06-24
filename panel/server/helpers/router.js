const Router = require('koa-trie-router')

const router = new Router()

module.exports = (path, method, fn) => {
  router[method](path, async (context, next) => {
    let result

    try {
      result = await fn({ context, next })
    } catch (error) {
      context.throw(500, error)
    }

    context.type = 'json'
    context.body = result
  })

  return router.middleware()
}
