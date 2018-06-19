const Router = require('koa-trie-router')
const controller = require('../controllers/signin')

const router = new Router()

module.exports = () => {
  router.post('/signin', async (context, next) => {
    let result

    try {
      result = await controller(context, next)
    } catch (error) {
      context.throw(500, error)
    }

    context.type = 'json'
    context.body = result
  })

  return router.middleware()
}
