import { Request, Response } from 'express';

import logger from 'logger';

export default async(req:Request, res:Response) => {
  try {
    delete req.user.password;
    delete req.user.id;
    res.status(200).json(req.user);
  } catch(err) {
    if(err instanceof Error) {
      if (err.message == 'Bad entry')
        res.status(501).json({
          server: err.message
        });
      else {
        logger.error(err);
        res.status(500).json({
          server: 'Error interno en el servidor'
        });
      }
    }
  }
}