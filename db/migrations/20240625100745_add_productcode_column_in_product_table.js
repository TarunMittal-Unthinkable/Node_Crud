const up = function(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.string('productcode').unique();
    });
  };
  
  const down = function(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.dropColumn('productcode');
    });
  }
  export { up, down };