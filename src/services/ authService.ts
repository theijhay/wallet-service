import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '12h';

/**
 * Hash a user's password before storing it in the database.
 * @param password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Verify a user's password with the hashed password stored in the database.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} - Returns true if the passwords match.
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate a JWT for authenticated users.
 * @param userId - The user ID to embed in the token.
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

/**
 * Middleware to verify JWT for protected routes.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]; // Expected format: "Bearer <token>"
  
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return; // End response here to prevent TypeScript errors
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      req.body.userId = decoded.userId; // Attach userId to request body for use in controllers
      next(); // Pass control to the next middleware/route handler
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };