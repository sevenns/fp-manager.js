const Koa = require('koa')
const config = require('../config/server')
const { Nuxt, Builder } = require('nuxt')
const nuxtConfig = require('../config/nuxt')
const middlewares = require('./middlewares')

const app = new Koa()
const host = process.env.HOST || config.host
const port = process.env.PORT || config.port

const message = 'The server is launched at:'
const info = `${config.host}:${config.port}`

nuxtConfig.dev = !(app.env === 'production')

const nuxt = new Nuxt(nuxtConfig)

if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)

  builder.build().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

middlewares(app)

app.use((context) => {
  context.status = 200

  return new Promise((resolve, reject) => {
    context.res.on('close', resolve)
    context.res.on('finish', resolve)

    nuxt.render(context.req, context.res, (promise) => {
      promise.then(resolve).catch(reject)
    })
  })
})

app.listen(port, host, () => {
  if (app.env === 'production') {
    console.log(`${message} ${info}\n`)
  }
})
