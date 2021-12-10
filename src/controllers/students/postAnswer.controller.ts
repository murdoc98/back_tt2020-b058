import { Request, Response } from 'express';
import logger from 'logger';
import Question from 'models/Question.schema';
import Answer from 'models/Answer.model';
import Quiz from 'models/Quiz.model';

export default async (req: Request, res: Response) => {
  try {
    const quiz = new Quiz();
    await quiz.getQuiz(req.params.quizId);
    if(quiz.status != 'En proceso') throw Error('Quiz done');
    const question = await Question.findById(req.body.question);
    if (!question) res.status(404).json({
      server: 'Pregunta no encontrada'
    });
    else {
      const answer = question.options.find((option: { _id: any; }) => option._id == req.body.option);
      const answerRecord = new Answer({
        quizId: req.params.quizId,
        genComplexity: question.complexity,
        espComplexity: answer.complexity,
        accuracy: evaluateAnswer(req.body.answers as Array<number>, answer.answer),
        questionId: question.id,
        optionId: answer.id
      });
      await answerRecord.save()
        .then(() => {
          res.status(201).json({
            server: 'Respuesta registrada'
          });
        })
        .catch((err) => {
          if(err.message.includes('duplicate key value violates unique constraint')) {
            res.status(304).json();
          }
          else if(err.message.includes('invalid input syntax for type uuid') ||
            err.message.includes('insert or update on table "enrollments" violates foreign key constraint'))
            res.status(404).json({
              server: 'Grupo no encontrado'
            });
          else res.status(500).json({
            server: 'Error interno en la base de datos'
          });
        });
    }
  } catch (err) {
    if (err instanceof Error) {
      if(err.message == 'Quiz done') {
        res.status(400).json({
          server: 'Cuestionario finalizado, ya no se pueden registrar mas respuestas'
        });
      } else {
        logger.error(err);
        res.status(500).json({
            server: 'Error interno en el servidor'
        });
      }
    }
  }
};

const evaluateAnswer = (studentAnswer: Array<any>, correctAnswer: Array<any>) => {
  if(studentAnswer.length != correctAnswer.length) return 0;
  else {
    for(let i = 0; i < correctAnswer.length; i++) {
      if(studentAnswer[i] != correctAnswer[i]) return 0;
    }
  }
  return 1;
}