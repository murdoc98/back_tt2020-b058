import { Request, Response } from 'express';
import logger from 'logger';
import Quizz from 'models/Quiz.model';
import Question from 'models/Question.schema';

export default async(req: Request, res:Response) => {
  try {
    const quiz = new Quizz();
    await quiz.getQuiz(req.params.quizId);
    if(quiz.status == 'En proceso') {
      const [ response ] = await Question.aggregate([{$sample: {size: 1}}]);
      res.status(200).json({
        response
      });
    } else {
      res.status(500).json({
        server: 'Este cuestionario ha sido cerrado'
      });
    }
  } catch(err) {
    if (err instanceof Error) {
      if(err.message == 'No quiz') {
        res.status(404).json({
          server: 'Cuestionario no encontrado'
        });
      } else {
        logger.error(err);
        res.status(500).json({
          server: 'Error interno en el servidor'
        }); 
      }
    }
  }
}