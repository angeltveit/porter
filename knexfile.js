const {parse} = require('pg-connection-string')

module.exports = {
  client: 'pg',
  connection: parse('postgresql://localhost/porter'),
}
