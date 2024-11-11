import request from 'supertest';
import app from '../app';
import knex from '../db/db';

beforeAll(async () => {
  await knex.migrate.latest(); // Run migrations to set up tables before tests start
});

afterEach(async () => {
  // Truncate tables to clear data without dropping the tables themselves
  await knex('users').truncate();
});

afterAll(async () => {
  await knex.destroy(); // Close the database connection
});


describe('User API Tests', () => {
  let testEmail: string = 'isaacjohn@gmail.com';
  let testPassword: string = 'password123';

  describe('Register User', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app).post('/api/v1/users/register').send({
        name: 'John Doe',
        phoneNumber: '1234567890',
        address: '123 Main St',
        email: testEmail,
        password: testPassword
      });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user).toHaveProperty('walletBalance', 0);
    });

    it('should return an error if required fields are missing', async () => {
      const response = await request(app).post('/api/v1/users/register').send({
        name: '',
        phoneNumber: '',
        address: '',
        email: '',
        password: ''
      });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('validation');
    });

    it('should treat a 404 from Adjutor as "not blacklisted" and allow user registration', async () => {
      const response = await request(app).post('/api/v1/users/register').send({
        name: 'Blacklisted User',
        phoneNumber: '9876543210',
        address: '456 Blacklist Ave',
        email: 'blacklisteduser@example.com',
        password: 'password123'
      });

      // Expect 201 Created, since a 404 from Adjutor is treated as not blacklisted
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('User registered successfully');
    });
  });

  describe('User Login', () => {
    beforeAll(async () => {
      // Register a test user for login
      await request(app).post('/api/v1/users/register').send({
        name: 'Login User',
        phoneNumber: '1234567890',
        address: '123 Login St',
        email: testEmail,
        password: testPassword,
      });
    });

    it('should log in successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: testEmail,
          password: testPassword,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('token');
    });

    it('should return an error for incorrect password', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: testEmail,
          password: 'wrongpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return an error for non-existent email', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'nonexistentuser@example.com',
          password: testPassword,
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid email or password');
    });
  });
});
