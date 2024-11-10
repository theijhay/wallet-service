import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const ADJUTOR_API_URL = process.env.ADJUTOR_API_URL;
const ADJUTOR_TOKEN = process.env.ADJUTOR_TOKEN;

if (!ADJUTOR_API_URL || !ADJUTOR_TOKEN) {
  throw new Error("Environment variables ADJUTOR_API_URL and ADJUTOR_TOKEN must be defined.");
}

export const checkBlacklist = async (identifier: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${ADJUTOR_API_URL}/${identifier}`,
      {
        headers: {
          'Authorization': `Bearer ${ADJUTOR_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // If we receive a valid response, check if user is blacklisted
    return !response.data.blacklisted;

  } catch (error) {
    // If error status is 404, treat as "not blacklisted"
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log(`User ${identifier} not found in Adjutor system. Treating as "not blacklisted".`);
      return true;
    }
    
    console.error('Error checking Adjutor Karma blacklist:', error);
    throw new Error('Unable to verify blacklist status. Please check authorization and try again.');
  }
};
