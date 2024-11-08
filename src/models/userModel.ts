import knex from '../db/db';

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;  // Include password field for authentication
  walletBalance: number;
}

/**
 * Creates a new user in the database.
 * @param user - The user data to insert.
 * @returns {Promise<void>}
 */
export const createUser = async (user: User) => {
  return await knex('users').insert(user);
};

/**
 * Finds a user by their unique ID.
 * @param id - The user ID.
 * @returns {Promise<User | undefined>} - The user object if found, otherwise undefined.
 */
export const findUserById = async (id: string): Promise<User | undefined> => {
  return await knex('users').where({ id }).first();
};

/**
 * Finds a user by their email.
 * @param email - The user's email.
 * @returns {Promise<User | undefined>} - The user object if found, otherwise undefined.
 */
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return await knex('users').where({ email }).first();
};
