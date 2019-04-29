const Joi = require('joi')
const bcrypt = require('bcrypt')
const db = require('../../services/db')
const generateToken = require('../../services/generate-token')
const saltRounds = 12

const schema = Joi.object().keys({
  username: Joi.string().min(4).max(30).trim().lowercase(),
  password: Joi.string().min(1),
  profile: Joi.object().unknown(),
})

module.exports = async function createUser(req, res, next) {

  let result = Joi.validate(req.body, schema, { stripUnknown: true })
  if(result.error) return res.status(500).json({
    error: result.error.details[0].message,
  })
  req.joi = result.value

  // Check if user exists
  const exists = await db('users')
    .select('id')
    .where({
      username: req.joi.username,
      client_id: req.client.id,
    })
    .first()
  
  if(exists) {
    res.status(409)
    throw new Error('user_exists')
  }

  req.joi.password_hash = bcrypt.hashSync(req.joi.password, saltRounds)
  delete req.joi.password

  const [ id ] = await db('users').insert({
    username: req.joi.username,
    password_hash: req.joi.password_hash,
    client_id: req.client.id,
    profile: req.joi.profile,
  }).returning('id')

  const user = await db('users')
    .select(['id', 'username'])
    .where({ id })
    .first()
  
  const token = generateToken(user, req.client.secret)
  
  res.json({
    error: null,
    token,
  })
}