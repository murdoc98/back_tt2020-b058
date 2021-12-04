import { Request, Response } from 'express';
import logger from 'logger';

import Group from 'models/Group.model';

export default async(req:Request, res:Response) => {
  try {
    const group = new Group();
    const response = await group.getGroupByStudent(req.user.id, req.params.groupId);
    console.log(response);
    res.status(200).json(response);
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