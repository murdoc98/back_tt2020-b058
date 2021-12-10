import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import logger from 'logger';
import Enrollment from 'models/Enrollment.model';
import removeUndefined from 'helpers/removeUndefined.helper';

export default async (req: Request, res: Response) => {
  try {
    const enrollment = new Enrollment();
    await enrollment.getEnrollment(req.params.studentId, req.params.groupId);
    enrollment.status = req.body.status;
    await enrollment.save()
      .then(() => {
        res.status(201).json({
          server: 'Acceso del estudiante modificado'
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
      if (err.message == 'No enrollment') {
        res.status(404).json({
          server: 'Inscripcion no encontrada'
        });
      } else {
        console.trace(err);
        logger.error(err);
        res.status(500).json({
          server: 'Error interno del servidor'
        });
      }
    }
  }
}