import axios from 'axios';
import * as dotenv from 'dotenv';
import https from 'https';


dotenv.config();

const ADJUTOR_API_URL = process.env.ADJUTOR_API_URL;
const ADJUTOR_TOKEN = process.env.ADJUTOR_TOKEN;

if (!ADJUTOR_API_URL || !ADJUTOR_TOKEN) {
  throw new Error("Environment variables ADJUTOR_API_URL and ADJUTOR_TOKEN must be defined.");
}

// Disable SSL verification for both real and mock calls
// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false
// });

/**
 * Simulates a mock response for testing the blacklist check functionality.
 * @param identifier - Unique identifier for the user (e.g., email).
 * @returns {Promise<{ status: string, data: { blacklisted: boolean, reason: string } }>}
 */
const mockBlacklistCheck = async (identifier: string) => {
  console.log(`Mocking Adjutor Karma API call for identifier: ${identifier}`);
  
  // Example mock response
  return {
    status: 'success',
    data: {
      blacklisted: identifier === 'blacklisted@example.com', // For testing, assume this email is blacklisted
      reason: identifier === 'blacklisted@example.com' ? 'default on previous loan' : 'clear record'
    }
  };
};

/**
 * Checks if a user is on the Adjutor Karma blacklist, either by real API or mock response.
 * @param identifier - Unique identifier for the user (e.g., email or phone number).
 * @returns {Promise<boolean>} - Returns true if not blacklisted, false if blacklisted.
 */
export const checkBlacklist = async (identifier: string): Promise<boolean> => {
  // Use mock response for testing or assessments
  if (process.env.USE_MOCK === 'true') {
    const mockResponse = await mockBlacklistCheck(identifier);
    return !mockResponse.data.blacklisted;
  }

  try {
    // Real API request if not mocking
    const response = await axios.get(
      `${ADJUTOR_API_URL}/${identifier}`,
      {
        headers: {
          'Authorization': `Bearer ${ADJUTOR_TOKEN}`,
          'Content-Type': 'application/json'
        },
        // httpsAgent   // Disable SSL verification
      }
    );

    // Interpret real API response
    return !response.data.blacklisted;
  } catch (error) {
    console.error('Error checking Adjutor Karma blacklist:', error);
    throw new Error('Unable to verify blacklist status. Please check authorization and try again.');
  }
};
