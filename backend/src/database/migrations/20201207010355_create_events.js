
exports.up = function(knex) {
  return knex.schema.createTable('events', function (table){
    table.increments();
    
    table.string('title').notNullable();
    table.string('date').notNullable();
    table.string('description').notNullable();
    table.string('local').notNullable();
    table.decimal('value').notNullable();

    table.string('events_id').notNullable();

    table.foreign('events_id').references('id').inTable('contractor');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('events');
};
