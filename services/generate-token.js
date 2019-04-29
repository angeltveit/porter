var jwt = require('jsonwebtoken')

module.exports = function generateToken(payload, secret) {
  return jwt.sign({
    id: payload.id,
    username: payload.username,
  }, secret, { expiresIn: '1 day' })
}