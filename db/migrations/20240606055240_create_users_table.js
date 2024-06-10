exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("email").unique().notNullable();
    table.text("password");
    table.text("first_name");
    table.text("last_name");
    table.date("dob");
    table.text("phone_no").unique();
    table.enu("gender", ["male", "female"]);
    table.timestamp("last_login_at");
    table.timestamp("password_reset_at");
    table.integer("created_by");
    table.integer("updated_by").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
