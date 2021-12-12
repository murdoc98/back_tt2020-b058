import { Request, Response } from 'express';
import logger from 'logger';
import Quiz from 'models/Quiz.model';
import lr from 'helpers/linearRegression.helper';

export default async(req: Request, res: Response) => {
  try {
    let quizzes = new Quiz();
    const response = await quizzes.getQuizzesByStudent(req.user.id, req.params.groupId);
    const x_values = response.map((quiz) => quiz.created_at!.getTime());
    const y_values = response.map((quiz) => quiz.processGrade!);
    let lrExpect = await lr(x_values, y_values);
    res.status(200).json({ ...response, lrExpect });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err);
      res.status(500).json({
        server: 'Error interno en el servidor'
      });
    }
  }
}