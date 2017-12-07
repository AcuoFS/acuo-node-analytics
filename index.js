/**
 * Created by Rui on 10/11/17.
 */
// import external libraries
//require('dotenv').config()

// app name
const name = 'ACUO Analytics'

const host = process.env.DOCKER_HOST || ''
const port = process.env.DOCKER_PORT || 8082
const env = process.env.DOCKER_ENV || 'dev'

// create server
const restify = require('restify')

const server = restify.createServer({name})

// register pluginsnpm
server.use(restify.queryParser())
// server.use(restify.CORS({
//   //credentials: true,                 // defaults to false
//   origins: ['http://localhost:8080'],
//   methods: ['GET','POST','OPTIONS']
// }))

server.use(restify.bodyParser({mapParams: false, defer: true}))
server.use(restify.authorizationParser())
// add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
// enable preflight (for chrome)
const preflightEnabler = require('se7ensky-restify-preflight')
preflightEnabler(server, {'headers': 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'})

// ===============================
// register routers
require('./app/routes').forEach(router => router({server}))

// server.server.setTimeout(60000*5)

// ===============================
// start server
const app = server.listen(port, host, () => {
  console.log(`${server.name} is listening at ${server.url}`)
})

console.log('new instance')

const io = require("socket.io").listen(app)

io.of('/uploadStream')
  .on('connection', socket => {

    console.log('new connection');
    console.log(Object.keys(io.sockets.sockets))

    setInterval(() => socket.emit('test', {data: "Hi from the server"}), 2000)
    socket.on('disconnect', () => {
      console.log('dc')
      setTimeout(() => {
        console.log(Object.keys(io.sockets.sockets))
      }, 500)
    })
  })