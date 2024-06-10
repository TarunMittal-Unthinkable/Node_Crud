const up  = function(knex) {
    return knex.schema.createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.enu('sizes', ["S","M","L","XL","XXL"]).notNullable();
      table.string('colors').notNullable();
      table.decimal('priceperquantity', 10, 2).notNullable();
      table.integer('totalQty').notNullable();
      table.integer('totalSold').notNullable().defaultTo(0);
      table.integer('product_id').references('id').inTable('products');
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  const down = function(knex) {
    return knex.schema.dropTable('categories');
  };
  
  export { up, down };