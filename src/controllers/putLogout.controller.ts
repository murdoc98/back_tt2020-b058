import { Request, Response } from 'express';
import logger from 'logger';


export default async(req:Request, res:Response) => {
  try {
    req.user.iat = undefined;
    await req.user.save()
      .then(() => {
        res.status(200).json({
          server: 'Sesion finalizada'
        });
      })
      .catch(() => {
        res.status(500).json({
          server: 'Error interno en la base de datos'
        });
      });
  } catch(err) {
    logger.error(err);
    res.status(500).json({
      server: 'Error interno en el servidor'
    });
  }
}