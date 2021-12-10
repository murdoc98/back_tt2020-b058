import { Request, Response } from 'express';
import logger from 'logger';
import Quizz from 'models/Quiz.model';
import Question from 'models/Question.schema';

export default async (req: Request, res: Response) => {
  try {
    const quiz = new Quizz();
    await quiz.getQuiz(req.params.quizId);
    if (quiz.status == 'En proceso') {
      const [question] = await Question.aggregate([{ $sample: { size: 1 } }]);
      const answer = question.options[Math.floor(Math.random() * question.options.length)];
      const response = {
        id: question._id,
        statement: question.statement,
        general: question.general_topic,
        specific: question.topic,
        image: question.image,
        options: {
          id: answer._id,
          variables: answer.variables
        }
      }
      res.status(200).json({
        response
      });
    } else {
      res.status(400).json({
        server: 'Este cuestionario ha sido cerrado'
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      if (err.message == 'No quiz') {
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