import { Request, Response } from 'express';
import logger from 'logger';
import Enrollment from 'models/Enrollment.model';

export default async(req: Request, res: Response) => {
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
        logger.error(err);
        res.status(500).json({
          server: 'error interno en la base de datos'
        });
      });
  } catch(err) {
    if(err instanceof Error) {
      if(err.message == 'No enrollment') {
        res.status(404).json({
          server: 'Inscripcion no encontrada'
        });
      } else {
        res.status(500).json({
          server: 'Error interno del servidor'
        });
      }
    }
  }
}