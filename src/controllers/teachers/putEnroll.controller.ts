import { Request, Response } from 'express';
import Enrollment from 'models/Enrollment.model';

export default async(req: Request, res: Response) => {
  try {
    const enrollment = new Enrollment();
    await enrollment.getEnrollment(req.params.studetnId, req.params.groupId);
    console.log(req.body);
    res.status(201).json({
      server: 'Ok'
    });
  } catch(err) {
    if(err instanceof Error) {
      if(['No group', 'No student'].includes(err.message)) {
        res.status(404).json({
          server: 'Grupo o estudiante no encontrado'
        });
      } else {
        res.status(500).json({
          server: 'Error interno del servidor'
        });
      }
    }
  }
}