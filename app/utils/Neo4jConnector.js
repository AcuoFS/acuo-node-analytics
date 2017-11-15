/**
 * Created by Rui on 10/11/17.
 */
const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase({
  url: 'http://dev.acuo.com:7474',
  auth: {username: 'neo4j', password: 'neo4j123'},
});

module.exports = db

