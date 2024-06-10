const up = function(knex) {
    return knex.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('category_id').unsigned().notNullable().references('id').inTable('categories');
      table.string('message');
      table.integer('rating').notNullable().checkBetween([1, 5]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  const down = function(knex) {
    return knex.schema.dropTable('reviews');
  }
  export { up, down };