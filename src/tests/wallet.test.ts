import request from 'supertest';
import app from '../app';
import knex from '../db/db';

beforeAll(async () => {
    // Ensure migrations are rolled back and reapplied
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });
  
  afterAll(async () => {
    await knex.migrate.rollback(); // Rollback after tests
    await knex.destroy(); // Close DB connection after all tests
  });
  
  describe('Wallet API Tests', () => {
    let userId1: string;
    let userId2: string;
    let token1: string;
  
    beforeAll(async () => {
      // Register two test users and log the responses
      const user1 = await request(app).post('/api/v1/users/register').send({
        name: 'Test User 1',
        phoneNumber: '1234567890',
        address: '123 Test St',
        email: 'user1@test.com',
        password: 'password123'
      });
  
      const user2 = await request(app).post('/api/v1/users/register').send({
        name: 'Test User 2',
        phoneNumber: '0987654321',
        address: '456 Test Ave',
        email: 'user2@test.com',
        password: 'password123'
      });
  
      // Check for correct data structure
      const user1Data = user1.body.data || user1.body;
      const user2Data = user2.body.data || user2.body;
  
      if (user1Data.user && user1Data.token) {
        userId1 = user1Data.user.id;
        token1 = user1Data.token;
      } else {
        throw new Error("User registration failed. Check if migrations were run.");
      }
  
      if (user2Data.user) {
        userId2 = user2Data.user.id;
      }
    });

  describe('Fund Wallet', () => {
    it('should fund the wallet successfully', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/fund')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          userId: userId1,
          amount: 500,
          source: 'bank transfer',
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.newBalance).toBeGreaterThan(0);
    });

    it('should return an error for invalid funding amount', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/fund')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          userId: userId1,
          amount: -100,
          source: 'bank transfer',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Amount must be greater than zero');
    });
  });

  describe('Transfer Funds', () => {
    it('should transfer funds successfully between users', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/transfer')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          senderUserId: userId1,
          recipientUserId: userId2,
          amount: 200,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.newBalance).toBeGreaterThan(0);
    });

    it('should return an error for insufficient balance', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/transfer')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          senderUserId: userId1,
          recipientUserId: userId2,
          amount: 10000,
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Insufficient balance');
    });
  });

  describe('Withdraw Funds', () => {
    it('should withdraw funds successfully', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/withdraw')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          userId: userId1,
          amount: 100,
          destination: 'bank account',
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.newBalance).toBeGreaterThan(0);
    });

    it('should return an error for insufficient balance on withdrawal', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/withdraw')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          userId: userId1,
          amount: 10000, // Assume this amount exceeds balance
          destination: 'bank account',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Insufficient balance');
    });

    it('should return an error for invalid withdrawal amount', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/withdraw')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          userId: userId1,
          amount: -50,
          destination: 'bank account',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Withdrawal amount must be greater than zero');
    });
  });
});
