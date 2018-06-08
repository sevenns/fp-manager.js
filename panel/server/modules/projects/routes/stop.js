const Router = require('koa-trie-router')
const controller = require('../controllers/stop')

const router = new Router()

module.exports = () => {
  router.post('/stop', async (context) => {
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
