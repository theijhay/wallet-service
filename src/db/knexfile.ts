import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 12392,
    ssl: { rejectUnauthorized: true },  // Enable SSL if required by the provider
  },
  migrations: {
    directory: './src/db/migrations',
  },
};

export default config;
