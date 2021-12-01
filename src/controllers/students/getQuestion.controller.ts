import { Request, Response } from 'express';
import logger from 'logger';
import Question from 'models/Question.schema';

export default async(req: Request, res:Response) => {
  try {
    const [ response ] = await Question.aggregate([{$sample: {size: 1}}]);
    res.status(200).json({
      response
    });
  } catch(err) {
    if (err instanceof Error) {
      logger.error(err);
      res.status(500).json({
        server: 'Error interno en el servidor'
      });
    }
  }
}