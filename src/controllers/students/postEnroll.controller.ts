import { Request, Response } from 'express';
import logger from 'logger';

import Enrollment from 'models/Enrollment.model';

export default async(req:Request, res:Response) => {
  try {
    const enroll = new Enrollment({
      student: req.user.id,
      group: req.params.groupId
    });
    enroll.save()
      .then(() => {
        res.status(200).json({
          server: 'Solicitud de inscripcion enviada al grupo'
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
        else 
          res.status(500).json({
            server: 'Error interno en la base de datos'
          });
      });
  } catch(err) {
    if(err instanceof Error) {
      if (err.message == 'Bad entry')
        res.status(501).json({
          server: err.message
        });
      else {
        logger.error(err);
        res.status(500).json({
          server: 'Error interno en el servidor'
        });
      }
    }
  }
}