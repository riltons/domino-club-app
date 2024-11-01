import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

interface TokenPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    req.userId = decoded.id;
    req.userRole = decoded.role;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

export function checkRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    return next();
  };
}