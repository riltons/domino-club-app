import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/lib/prisma';
import { sign } from 'jsonwebtoken';

describe('Matches', () => {
  let token: string;
  let userId: string;
  let communityId: string;

  beforeAll(async () => {
    await prisma.match.deleteMany();
    await prisma.community.deleteMany();
    await prisma.user.deleteMany();

    // Create test user
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
        role: 'ADMIN'
      }
    });

    userId = user.id;
    token = sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!);

    // Create test community
    const community = await prisma.community.create({
      data: {
        name: 'Test Community',
        creatorId: user.id,
        organizers: {
          connect: { id: user.id }
        }
      }
    });

    communityId = community.id;
  });

  afterAll(async () => {
    await prisma.match.deleteMany();
    await prisma.community.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should be able to create a new match', async () => {
    const response = await request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        communityId,
        player1Id: userId,
        player2Id: userId,
        player3Id: userId,
        player4Id: userId
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to list matches', async () => {
    const response = await request(app)
      .get('/matches')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should be able to finish a match', async () => {
    // Create a match first
    const match = await prisma.match.create({
      data: {
        communityId,
        player1Id: userId,
        player2Id: userId,
        player3Id: userId,
        player4Id: userId,
        score: 0,
        winningTeam: 'TEAM_1'
      }
    });

    const response = await request(app)
      .patch(`/matches/${match.id}/finish`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        score: 150,
        winningTeam: 'TEAM_1'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('COMPLETED');
  });
});