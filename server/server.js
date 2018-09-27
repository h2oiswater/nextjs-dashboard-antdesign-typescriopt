const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
// const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
  dir: './src'
})
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()
    const apiRouter = new Router({
      prefix: '/api'
    })

    router.get('/login', async ctx => {
      await app.render(ctx.req, ctx.res, '/user/Login', ctx.query)
      ctx.respond = false
    })

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    // trust proxy
    server.proxy = true

    // body parser
    server.use(bodyParser())

    // Require authentication for now
    server.use(function (ctx, next) {
      // if (ctx.isAuthenticated()) {
        return next()
      // } else {
      //   // static resource not redirect
      //   // api not redirect
      //   let needAuth = (ctx.url.indexOf('/_next') === -1 && ctx.url.indexOf('/api') === -1)

      //   if (needAuth) {
      //     for (let p in noAuthUrls) {
      //       if (noAuthUrls[p] === ctx.url) {
      //         needAuth = false
      //         break
      //       }
      //     }
      //   }

      //   if (needAuth) {
      //     ctx.redirect('/login')
      //   } else {
      //     return next()
      //   }
      // }
    })

    server.use(router.routes())
    server.use(apiRouter.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })