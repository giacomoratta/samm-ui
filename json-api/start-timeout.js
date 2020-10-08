const jsonServer = require('json-server')
const app = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '../../test/api/dev.json'))
const middlewares = jsonServer.defaults()

app.use(function(req, res, next){
  setTimeout(next, 10000)
})
app.use(middlewares)
app.use(router)

app.listen(3000, function () {
  console.log('JSON Server is running on localhost:3000')
  done()
})