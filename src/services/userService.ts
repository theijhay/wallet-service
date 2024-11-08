import { v4 as uuidv4 } from 'uuid';
import { createUser, findUserByEmail } from '../models/userModel';
import { hashPassword, verifyPassword, generateToken } from './ authService';
import { checkBlacklist } from './blacklistService';

/**
 * Registers a new user, hashes their password, and generates a JWT token.
 * @param name - User's name.
 * @param phoneNumber - User's phone number.
 * @param address - User's address.
 * @param email - User's email.
 * @param password - User's password.
 * @returns - The created user object and JWT token.
 */
export const registerUser = async (name: string, phoneNumber: string, address: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  const allowed = await checkBlacklist(email);  // Check with email as identifier
  if (!allowed) {
    throw new Error('User is blacklisted and cannot be onboarded.');
  }

  const user = {
    id: uuidv4(),
    name,
    phoneNumber,
    address,
    email,
    password: hashedPassword,
    walletBalance: 0,
  };

  await createUser(user);

  // Generate a JWT for the registered user
  const token = generateToken(user.id);
  return { user, token };
};

/**
 * Authenticates a user, verifies their password, and returns a JWT token.
 * @param email - User's email.
 * @param password - User's password.
 * @returns - The JWT token if authentication is successful.
 * @throws - If authentication fails.
 */
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const token = generateToken(user.id);
  return { user, token };
};
