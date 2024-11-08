import { Request, Response } from 'express';
import * as walletService from '../services/walletService';

export const fundWallet = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;
    const result = await walletService.fundWallet(userId, amount);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const transferFunds = async (req: Request, res: Response) => {
  try {
    const { senderUserId, recipientUserId, amount } = req.body;
    const result = await walletService.transferFunds(senderUserId, recipientUserId, amount);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const withdrawFunds = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;
    const result = await walletService.withdrawFunds(userId, amount);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
