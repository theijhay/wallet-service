import { updateWalletBalance, getWalletBalance } from '../models/walletModel';

export const fundWallet = async (userId: string, amount: number) => {
  if (amount <= 0) {
    throw new Error('Amount must be greater than zero');
  }

  // Update wallet balance by adding the amount
  await updateWalletBalance(userId, amount);

  // Retrieve the updated balance
  const newBalance = await getWalletBalance(userId);

  return {
    message: 'Wallet funded successfully',
    newBalance,
  };
};

export const transferFunds = async (userId: string, recipientId: string, amount: number) => {
  if (amount <= 0) {
    throw new Error('Transfer amount must be greater than zero');
  }

  // Check sender's balance
  const senderBalance = await getWalletBalance(userId);
  if (senderBalance < amount) {
    throw new Error('Insufficient balance');
  }

  // Deduct from sender's balance
  await updateWalletBalance(userId, -amount);

  // Add to recipient's balance
  await updateWalletBalance(recipientId, -amount);

  // Get the sender's new balance after the transfer
  const newBalance = await getWalletBalance(userId);

  return {
    message: 'Transfer completed successfully',
    newBalance,
    amount,
  };
};


export const withdrawFunds = async (userId: string, amount: number) => {
  if (amount <= 0) {
    throw new Error('Withdrawal amount must be greater than zero');
  }

  // Check user's balance
  const balance = await getWalletBalance(userId);
  if (balance < amount) {
    throw new Error('Insufficient balance');
  }

  // Deduct balance
  await updateWalletBalance(userId, -amount);

  // Retrieve the updated balance
  const newBalance = await getWalletBalance(userId);

  return {
    message: 'Withdrawal completed successfully',
    newBalance,
  };
};
