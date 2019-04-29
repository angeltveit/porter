const knex = require('knex')
const knexStringcase = require('knex-stringcase')
const config = require('../knexfile.js')

module.exports = knex(knexStringcase(config))