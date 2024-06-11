const up = function(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.boolean('is_active').defaultTo(true);
    });
  };
  
  const down = function(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.dropColumn('is_active');
    });
  }
  export { up, down };