import { type NextFunction, type Request, type Response } from 'express';
import * as jwt from 'jsonwebtoken';
import db from '@/lib/prisma';
import environment from '@/lib/environment';

export const verifyAuthToken = async (
  // Remove underscore of params once you start using them
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(404).json({ message: 'Token not found' });
    }

    const token = authHeader.split(' ')[1];
    const { jwtSecret } = environment;
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === 'string') {
      return res.status(404).json({ message: 'Invalid token' });
    }

    const payload = decoded as jwt.JwtPayload & { userId: string };
    const user = await db.user.findFirst({
      where: { id: payload.userId, disabled: { not: true } },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch {
    // console.log({ middleware: err });
    return res.status(404).json({ message: 'Validate Token' });
  }
};
