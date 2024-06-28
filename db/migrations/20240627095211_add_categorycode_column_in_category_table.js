const up = function(knex) {
    return knex.schema.alterTable('categories', (table) => {
        table.string('categorycode').unique();
    });
  };
  
  const down = function(knex) {
    return knex.schema.alterTable('categories', (table) => {
        table.dropColumn('categorycode');
    });
  }
  export { up, down };