/**
 * Created by Rui on 24/11/17.
 */
var io = require('socket.io')();

const Router = require('restify-router').Router

// main object
const routerInstance = new Router()

// constants
const prefix = "socket"

routerInstance.get('/', (req, res, next) => {
  console.log('In Handle'); //doesn't print this
  io.on('connection', (client) => {
    console.log('Connection establiished');
  })
})

module.exports = ({server}) => routerInstance.applyRoutes(server, prefix)