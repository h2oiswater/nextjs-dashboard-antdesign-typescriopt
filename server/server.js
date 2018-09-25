const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
  dir: './src'
})
const handle = app.getRequestHandler()

const noAuthUrls = ['/login']

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()
    const apiRouter = new Router({
      prefix: '/api'
    })

    apiRouter.post('/login', async (ctx) => {
      passport.authenticate('local', function(err, user, info, status){
        if (user === false) {
          ctx.body = { success: false }
        } else {
          ctx.body = { success: true }
          return ctx.login(user)
        }
      })(ctx)
    })

    // // POST /login
    // server.use(apiRouter.post('/login',
    //   passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/login'
    //   })
    // ))


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

    // sessions
    server.keys = ['happy-tree-friends']
    server.use(session({}, server))

    // body parser
    server.use(bodyParser())
    require('./auth')

    // authentication
    server.use(passport.initialize())
    server.use(passport.session())

    // Require authentication for now
    server.use(function (ctx, next) {
      if (ctx.isAuthenticated()) {
        return next()
      } else {
        // static resource not redirect
        // api not redirect
        let needAuth = (ctx.url.indexOf('/_next') === -1 && ctx.url.indexOf('/api') === -1)

        console.log('url = ' + ctx.url + ' need auth = ' + needAuth)

        if (needAuth) {
          for (let p in noAuthUrls) {
            if (noAuthUrls[p] === ctx.url) {
              needAuth = false
              break
            }
          }
        }

        if (needAuth) {
          console.log('redirect')
          ctx.redirect('/login')
        } else {
          console.log('next')
          return next()
        }
      }
    })

    server.use(router.routes())
    server.use(apiRouter.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })