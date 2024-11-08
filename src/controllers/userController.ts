import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, address, email, password } = req.body;

    if (!name || !phoneNumber || !address || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { user, token } = await userService.registerUser(name, phoneNumber, address, email, password);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
