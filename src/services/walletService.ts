import { updateWalletBalance, getWalletBalance } from '../models/walletModel';

export const fundWallet = async (userId: string, amount: number) => {
  if (amount <= 0) {
    throw new Error('Amount must be greater than zero');
  }
  await updateWalletBalance(userId, amount);
  return { message: 'Wallet funded successfully' };
};

export const transferFunds = async (senderId: string, recipientId: string, amount: number) => {
  if (amount <= 0) {
    throw new Error('Transfer amount must be greater than zero');
  }

  // Check sender balance
  const senderBalance = await getWalletBalance(senderId);
  if (senderBalance < amount) {
    throw new Error('Insufficient balance');
  }

  // Deduct from sender and add to recipient
  await updateWalletBalance(senderId, -amount);
  await updateWalletBalance(recipientId, amount);

  return { message: 'Transfer completed successfully' };
};

export const withdrawFunds = async (userId: string, amount: number) => {
  if (amount <= 0) {
    throw new Error('Withdrawal amount must be greater than zero');
  }

  // Check user balance
  const balance = await getWalletBalance(userId);
  if (balance < amount) {
    throw new Error('Insufficient balance');
  }

  // Deduct balance
  await updateWalletBalance(userId, -amount);
  return { message: 'Withdrawal completed successfully' };
};
