
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('clients', table => {
    table.increments('id')
    table.string('name')
    table.string('token')
    table.string('secret')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('clients')
};
