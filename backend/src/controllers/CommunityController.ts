import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export class CommunityController {
  async create(req: Request, res: Response) {
    const schema = z.object({
      name: z.string().min(3),
      description: z.string().optional(),
      location: z.string().optional(),
      isPrivate: z.boolean().default(false),
      rules: z.array(z.string()).optional(),
    });

    const data = schema.parse(req.body);
    const userId = req.userId!;

    const community = await prisma.community.create({
      data: {
        ...data,
        creator: { connect: { id: userId } },
        organizers: { connect: [{ id: userId }] },
        rules: {
          create: data.rules?.map(rule => ({ rule })) || [],
        },
      },
      include: {
        creator: true,
        organizers: true,
        rules: true,
      },
    });

    return res.status(201).json(community);
  }

  async list(req: Request, res: Response) {
    const userId = req.userId!;

    const communities = await prisma.community.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { organizers: { some: { id: userId } } },
          { members: { some: { userId } } },
        ],
      },
      include: {
        creator: true,
        organizers: true,
        members: {
          include: {
            user: true,
          },
        },
        rules: true,
      },
    });

    return res.json(communities);
  }

  async addOrganizer(req: Request, res: Response) {
    const schema = z.object({
      userId: z.string(),
    });

    const { id } = req.params;
    const { userId } = schema.parse(req.body);

    const community = await prisma.community.update({
      where: { id },
      data: {
        organizers: {
          connect: { id: userId },
        },
      },
      include: {
        organizers: true,
      },
    });

    return res.json(community);
  }

  async addMember(req: Request, res: Response) {
    const schema = z.object({
      userId: z.string(),
    });

    const { id } = req.params;
    const { userId } = schema.parse(req.body);

    const member = await prisma.communityMember.create({
      data: {
        community: { connect: { id } },
        user: { connect: { id: userId } },
      },
      include: {
        user: true,
        community: true,
      },
    });

    return res.status(201).json(member);
  }
}