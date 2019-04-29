const Joi = require('joi')
const bcrypt = require('bcrypt')
const generateToken = require('../../services/generate-token')
const db = require('../../services/db')

const schema = Joi.object().keys({
  username: Joi.string().min(1).trim().lowercase(),
  password: Joi.string().min(1),
})
function unauthorized(res) {
  res.status(401)
  throw new Error('unauthorized')
}
module.exports = async function login(req, res, next) {
  let result = Joi.validate(req.body, schema, { stripUnknown: true })
  if(result.error) {
    res.status(500)
    throw new Error(result.error.details[0].message)
  }
  req.joi = result.value
  
  const user = await db('users')
    .where({
      username: req.joi.username,
      client_id: req.client.id,
    })
    .first()
  
  if(!user) {
    unauthorized(res)
  }
  
  const pass = bcrypt.compare(req.joi.password, user.password_hash)
  if(!pass) {
    unauthorized(res)
  }
  delete user.password_hash
  
  const token = generateToken(user, req.client.secret)
  res.json({
    token,
    profile: user.profile,
  })
}