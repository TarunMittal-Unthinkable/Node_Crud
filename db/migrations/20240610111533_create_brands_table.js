const up = function(knex) {
    return knex.schema.createTable('brands', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  const down = function(knex) {
    return knex.schema.dropTable('brands');
  };
  export { up, down };