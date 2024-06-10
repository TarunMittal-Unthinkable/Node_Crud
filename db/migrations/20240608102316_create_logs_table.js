const up = function (knex) {
    return knex.schema.createTable('logs', function (table) {
      table.increments().primary();
      table.text('uuid').unique();
      table.text('details');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  const down = function (knex) {
    return knex.schema.dropTable('logs');
  };
  
  export { up, down };
  