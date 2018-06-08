const Router = require('koa-trie-router')
const controller = require('../controllers/index')

const router = new Router()

module.exports = () => {
  router.post('/', async (context) => {
    let result

    try {
      result = await controller(context)
    } catch (error) {
      context.throw(500, error)
    }

    context.type = 'json'
    context.body = result
  })

  return router.middleware()
}
