import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export class PlayerController {
  async create(req: Request, res: Response) {
    const schema = z.object({
      name: z.string().min(3),
      phone: z.string(),
      indicatedBy: z.string().optional(),
    });

    const data = schema.parse(req.body);
    const organizerId = req.userId!;

    const player = await prisma.user.create({
      data: {
        ...data,
        role: 'PLAYER',
        password: Math.random().toString(36).slice(-8), // Senha aleatória inicial
      },
    });

    return res.status(201).json(player);
  }

  async list(req: Request, res: Response) {
    const { communityId } = req.query;

    const players = await prisma.user.findMany({
      where: {
        role: 'PLAYER',
        ...(communityId && {
          communities: {
            some: { communityId: communityId as string },
          },
        }),
      },
      include: {
        communities: {
          include: {
            community: true,
          },
        },
      },
    });

    return res.json(players);
  }

  async getStats(req: Request, res: Response) {
    const { id } = req.params;

    const player = await prisma.user.findUnique({
      where: { id },
      include: {
        matchesAsPlayer1: true,
        matchesAsPlayer2: true,
        matchesAsPlayer3: true,
        matchesAsPlayer4: true,
      },
    });

    if (!player) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }

    const matches = [
      ...player.matchesAsPlayer1,
      ...player.matchesAsPlayer2,
      ...player.matchesAsPlayer3,
      ...player.matchesAsPlayer4,
    ];

    const stats = {
      totalMatches: matches.length,
      wins: matches.filter(m => {
        const isTeam1 = [m.player1Id, m.player2Id].includes(id);
        return (isTeam1 && m.winningTeam === 'TEAM_1') || 
               (!isTeam1 && m.winningTeam === 'TEAM_2');
      }).length,
    };

    return res.json(stats);
  }
}