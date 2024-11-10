import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('phoneNumber').notNullable();
    table.string('address').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.decimal('walletBalance', 15, 2).defaultTo(0); // Adjust precision as needed
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
