const up = function(knex) {
    return knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('brand_id').unsigned().notNullable().references('id').inTable('brands');
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  const down = function(knex) {
    return knex.schema.dropTable('products');
  };
  export { up, down };



 