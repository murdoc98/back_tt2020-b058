import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Teacher from 'models/Teacher.model';
import logger from 'logger';

dotenv.config();

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.headers.token);
    console.log(req.body);
    if (!req.headers.token) throw Error('Bad token');
    const payload = jwt.verify(
      req.headers.token as string,
      <string>process.env.SERVER_TOKEN
    ) as jwt.JwtPayload;
    const query = await getRepository(Teacher)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: payload.data })
      .getOne();
    req.user = query;
    if (!query) throw Error('Bad token');
    if (process.env.NODE_ENV !== 'test') {
      // if (query.lastLogin !== payload.iat) throw Error('Bad token');
      logger.info(`${req.user.id} -> ${req.originalUrl}`);
    }
    next();
  } catch (e) {
    if (e instanceof Error)
      res.status(405).json({
        server: 'Token corrupto'
      });
  }
};