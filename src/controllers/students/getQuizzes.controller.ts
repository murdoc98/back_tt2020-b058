import { Request, Response } from 'express';
import logger from 'logger';
import Quiz from 'models/Quiz.model';

export default async(req: Request, res: Response) => {
  try {
    let quizzes = new Quiz();
    const response = await quizzes.getQuizzesByStudent(req.user.id, req.params.groupId);
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err);
      res.status(500).json({
        server: 'Error interno en el servidor'
      });
    }
  }
}