import knex from '../db/db';

/**
 * Retrieves the current wallet balance for a user.
 * @param userId - ID of the user.
 * @returns {Promise<number>} - The current balance of the user’s wallet.
 */
export const getWalletBalance = async (userId: string): Promise<number> => {
  const result = await knex('users')
    .select('walletBalance')
    .where({ id: userId })
    .first();
  
  return result ? result.walletBalance : 0;
};

/**
 * Updates the wallet balance for a user by adding or subtracting a specified amount.
 * @param userId - ID of the user.
 * @param amount - Amount to add to or subtract from the balance.
 * @returns {Promise<number>} - Number of rows affected.
 */
export const updateWalletBalance = async (userId: string, amount: number) => {
  return await knex('users')
    .where({ id: userId })
    .update({
      walletBalance: knex.raw('walletBalance + ?', [amount]),
    });
};
