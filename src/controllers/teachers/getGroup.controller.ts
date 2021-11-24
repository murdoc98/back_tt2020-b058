import { Request, Response } from 'express';
import logger from 'logger';

import Group from 'models/Group.model';

export default async(req: Request, res: Response) => {
    try {
        const group = new Group();
        const response = await group.getGroupByTeacher(req.user.id, req.params.groupId);
        res.status(200).json(response);
      } catch(err) {
        if(err instanceof Error) {
          if (err.message == 'No group')
            res.status(404).json({
              server: 'Grupo no encontrado'
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