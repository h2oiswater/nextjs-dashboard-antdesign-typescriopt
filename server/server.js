const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

const fetchUser = (() => {
  // This is an example! Use password hashing in your project and avoid storing passwords in your code
  const user = {
    id: 1,
    username: 'test',
    password: 'test'
  }
  return async function () {
    return user
  }
})()

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
      passport.authenticate('local', function (err, user, info, status) {
        if (user === false) {
          ctx.body = {
            success: false
          }
        } else {
          ctx.body = {
            success: true
          }
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

    passport.serializeUser(function (user, done) {
      done(null, user.id)
    })
    
    passport.deserializeUser(async function (id, done) {
      try {
        const user = await fetchUser()
        done(null, user)
      } catch (err) {
        done(err)
      }
    })

    passport.use(new LocalStrategy(function (username, password, done) {
      fetchUser()
        .then(user => {
          if (username === user.username && password === user.password) {
            console.log('LocalStrategy success')
            done(null, user)
          } else {
            console.log('LocalStrategy failed')
            done(null, false)
          }
        })
        .catch(err => done(err))
    }))
    
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