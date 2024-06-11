const up = function(knex) {
    return knex.schema.alterTable('categories', (table) => {
        table.boolean('is_active').defaultTo(true);
    });
  };
  
  const down = function(knex) {
    return knex.schema.alterTable('categories', (table) => {
        table.dropColumn('is_active');
    });
  }
  export { up, down };