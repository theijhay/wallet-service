import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { registerUser as registerUserService } from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, address, email, password } = req.body;

    // Call the registerUser service
    const { user, token } = await registerUserService(name, phoneNumber, address, email, password);

    // Respond with a formatted success message
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          address: user.address,
          email: user.email,
          walletBalance: user.walletBalance
        },
        token
      }
    });
  } catch (error) {
    // Check if error is an instance of Error to safely access error.message
    const message = error instanceof Error ? error.message : 'An unknown error occurred';

    // Handle errors gracefully and return a formatted error response
    res.status(400).json({
      status: 'error',
      message
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await userService.loginUser(email, password);
    // Respond with a formatted success message
    res.status(200).json({
      status: 'success',
      message: 'User login successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          address: user.address,
          email: user.email,
          walletBalance: user.walletBalance
        },
        token
      }
    });
  } catch (error) {
    // Check if error is an instance of Error to safely access error.message
    const message = error instanceof Error ? error.message : 'An unknown error occurred';

    // Handle errors gracefully and return a formatted error response
    res.status(400).json({
      status: 'error',
      message
    });
  }
};
