const up = function(knex) {
    return knex.schema.alterTable('brands', (table) => {
        table.string('brandcode').unique();
    });
  };
  
  const down = function(knex) {
    return knex.schema.alterTable('brands', (table) => {
        table.dropColumn('brandcode');
    });
  }
  export { up, down };