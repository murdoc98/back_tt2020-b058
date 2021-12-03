import { Request, Response } from 'express';
import logger from 'logger';
import Enrollment from 'models/Enrollment.model';
import Quiz from 'models/Quiz.model';
import removeUndefined from 'helpers/removeUndefined.helper';
import { ValidationError } from 'class-validator';

export default async(req: Request, res: Response) => {
  try {
    const enrollment = new Enrollment();
    enrollment.getEnrollment2(req.user.id, req.body.group);
    const quiz = new Quiz({
      enrollment
    });
    quiz.save()
      .then(() => {
        res.status(200).json({
          server: 'Cuestionario iniciado',
          timeStamp: quiz.created_at
        });  
      })
      .catch((err) => {
        if (Array.isArray(err) && err[0] instanceof ValidationError) {
          const valErrors = removeUndefined(err);
          res.status(400).json({
            server: 'Error en el input',
            errores: valErrors
          });
        } else if (['22P02', '23502'].includes(err.code)) {
          res.status(404).json({
            server: 'Llaves foraneas invalidas o incorrectas'
          });
        } //else if ('23505' === err.code)
          //res.status(405).json({
          //  server:
          //    'Alguno de los siguientes campos (nombre completo, email) ya han sido registrados en el sistema'
          //});
        else {
          logger.error(err.code);
          res.status(500).json({
            server: 'Error en la base de datos'
          });
        }
      });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err);
      res.status(500).json({
        server: 'Error interno en el servidor'
      });
    }
  }
}