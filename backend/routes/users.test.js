const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersRoute = require('./users'); 

const app = express();
app.use(express.json());
app.use('/api/users', usersRoute);

// Mock the bcrypt and jwt modules
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('fake_salt'),
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true)
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('fake_token')
}));

// Mock the database module
jest.mock('../db', () => ({
  query: jest.fn()
    .mockResolvedValueOnce({ rows: [{ user_id: 1, username: 'testuser', email: 'test@example.com' }] }) // For register
    .mockResolvedValueOnce({ rows: [{ user_id: 1, username: 'testuser', email: 'test@example.com', password_hash: 'hashed_password' }] }) // For login
}));

describe('Users Route', () => {
  test('POST /api/users/register should create a new user', async () => {
    const response = await request(app).post('/api/users/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user_id');
    expect(response.body).toHaveProperty('username', 'testuser');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('POST /api/users/login should authenticate user and return token', async () => {
    const response = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token', 'fake_token');
  });
});
