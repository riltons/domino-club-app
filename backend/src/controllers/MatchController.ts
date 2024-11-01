import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export class MatchController {
  async create(req: Request, res: Response) {
    const schema = z.object({
      communityId: z.string(),
      player1Id: z.string(),
      player2Id: z.string(),
      player3Id: z.string(),
      player4Id: z.string(),
    });

    const data = schema.parse(req.body);

    const match = await prisma.match.create({
      data: {
        ...data,
        score: 0,
        winningTeam: 'TEAM_1', // Valor inicial, será atualizado ao fim da partida
      },
      include: {
        community: true,
        player1: true,
        player2: true,
        player3: true,
        player4: true,
      },
    });

    return res.status(201).json(match);
  }

  async finish(req: Request, res: Response) {
    const schema = z.object({
      score: z.number(),
      winningTeam: z.enum(['TEAM_1', 'TEAM_2']),
    });

    const { id } = req.params;
    const data = schema.parse(req.body);

    const match = await prisma.match.update({
      where: { id },
      data: {
        ...data,
        status: 'COMPLETED',
        endedAt: new Date(),
      },
      include: {
        community: true,
        player1: true,
        player2: true,
        player3: true,
        player4: true,
      },
    });

    return res.json(match);
  }

  async list(req: Request, res: Response) {
    const { communityId, status } = req.query;

    const matches = await prisma.match.findMany({
      where: {
        ...(communityId && { communityId: communityId as string }),
        ...(status && { status: status as 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' }),
      },
      include: {
        community: true,
        player1: true,
        player2: true,
        player3: true,
        player4: true,
      },
      orderBy: {
        startedAt: 'desc',
      },
    });

    return res.json(matches);
  }
}