import { Request, Response } from 'express';
import * as walletService from '../services/walletService';

export const fundWallet = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;

    // Call the service to fund the wallet and get the new balance
    const { message, newBalance } = await walletService.fundWallet(userId, amount);

    // Respond with the formatted message and updated balance
    res.status(200).json({
      status: 'success',
      message,
      data: {
        userId,
        newBalance,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({
      status: 'error',
      message,
    });
  }
};

export const transferFunds = async (req: Request, res: Response) => {
  try {
    const { userId, recipientUserId, amount } = req.body;

    // Call the service to process the transfer and get the sender's new balance
    const { message, newBalance } = await walletService.transferFunds(userId, recipientUserId, amount);

    // Respond with the formatted message, updated balance, and transfer amount
    res.status(200).json({
      status: 'success',
      message,
      data: {
        userId,
        newBalance,
        recipientUserId,
        amount,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';

    // Send error response
    res.status(400).json({
      status: 'error',
      message,
    });
  }
};

export const withdrawFunds = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;

    // Call the service to withdraw funds and get the new balance
    const { message, newBalance } = await walletService.withdrawFunds(userId, amount);

    // Respond with the formatted message and updated balance
    res.status(200).json({
      status: 'success',
      message,
      data: {
        userId,
        newBalance,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({
      status: 'error',
      message,
    });
  }
};
