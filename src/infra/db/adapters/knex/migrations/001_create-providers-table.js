exports.up = function (knex) {
  return knex.schema
    .createTable('provider', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').notNullable();
      table.float('reliability_percentage', 2).default(100);
      table.timestamps(true, true);
    })
    .alterTable('provider', (table) => {
      table.unique('name');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('provider')
};
