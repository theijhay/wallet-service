// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['js', 'ts'],
    transform: {
      '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    testTimeout: 50000, // Increase to 20 seconds
  };
  