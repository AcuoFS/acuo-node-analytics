/**
 * Created by Rui on 10/11/17.
 */

const { db } = require('./../utils')
const Router = require('restify-router').Router

// main object
const routerInstance = new Router()

// constants
const prefix = "analytics"

routerInstance.get('/', (req, res, next) => {
  const results = db.cypher({
    query: "MATCH (n:MarginStatement {date:'2017/11/13'})-[r:PART_OF]-(n1:MarginCall) Where not n1.marginAmount is NULL AND n1.side='Client' RETURN n.id, n1.id, n1.marginAmount",
  }, (err, results) => results.length ? res.send({"client": results}) : 'didnt work derp')

  // console.log(results)
})

routerInstance.get('/cpty', (req, res, next) => {
  const results = db.cypher({
    query: "MATCH (n:MarginStatement {date:'2017/11/13'})-[r:PART_OF]-(n1:MarginCall) Where not n1.marginAmount is NULL AND n1.side='Cpty' RETURN n.id, n1.id, n1.marginAmount",
  }, (err, results) => results.length ? res.send({"cpty": results}) : 'didnt work derp')
})

module.exports = ({server}) => routerInstance.applyRoutes(server, prefix)
