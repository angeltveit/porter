const db = require('../../services/db')
var jwt = require('jsonwebtoken')

// Load clients into memory so we won't bother the db for each request
let clients = []
async function loadClients() {
  clients = await db('clients').select(['id', 'name', 'token', 'secret'])
}
loadClients()

module.exports = function() {
  return function (req, res, next) {

    const unauthorized = (res) => {
      res.status(401)
      throw new Error('unauthorized')
    }

    const auth = req.headers.authorization
    if(!auth) {
      unauthorized(res)
    }
    const bearer = auth.split(' ')

    // Force keyword bearer
    if(bearer[0] !== 'Bearer') {
      unauthorized(res)
    }
    
    // Check that token is valid
    const client = clients.find(c => c.token === bearer[1])
    if(!client) {
      unauthorized(res)
    }
    req.client = client

    // Convert JWT payload to object
    if(bearer[2]) {
      req.token = bearer[2]
      try {
        req.payload = jwt.verify(bearer[2], client.secret)
      } catch(error) {
        unauthorized(res)
      }
    }

    next()
  }
}
