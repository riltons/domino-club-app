import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/lib/prisma';

describe('Authentication', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  it('should be able to register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe('john@example.com');
  });

  it('should be able to authenticate with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'john@example.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to authenticate with invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'john@example.com',
        password: 'wrong-password'
      });

    expect(response.status).toBe(401);
  });
});