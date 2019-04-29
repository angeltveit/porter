
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', table => {
    table.increments('id')
    table.string('uid')
    table.string('client_id')
    table.string('username')
    table.string('password_hash')
    table.jsonb('profile')
    table.timestamp('deleted_at')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
