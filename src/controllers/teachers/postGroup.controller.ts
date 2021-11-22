import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

import removeUndefined from 'helpers/removeUndefined.helper';
import Group from 'models/Group.model';

import logger from 'logger';

export default async(req:Request, res:Response) => {
  try {
    const group = new Group({
      name: req.body.name,
      teacherId: req.user.id
    });
    await group.save()
      .then(() => {
        res.status(200).json({
          server: 'Grupo creado',
          group
        });
      })
      .catch((err) => {
        if (Array.isArray(err) && err[0] instanceof ValidationError) {
          const valErrors = removeUndefined(err);
          res.status(400).json({
            server: 'Error en el input',
            errores: valErrors
          });
        } else if (['22P02', '23502'].includes(err.code))
          res.status(404).json({
            server: 'Llaves foraneas invalidas o incorrectas'
          });
        else {
          logger.error(err);
          res.status(500).json({
            server: 'Error en la base de datos'
          });
        }
      })
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