import { Request, Response } from 'express';
import logger from 'logger';
import { getRepository } from 'typeorm';
import Teacher from 'models/Teacher.model';
import getRandomPassword from 'helpers/getRandomPassword.helper';
import recoverAccountEmail from 'helpers/recoverAccountEmail.helper';

export default async(req: Request, res: Response) => {
  try {
    const user = await getRepository(Teacher)
      .createQueryBuilder('teacher')
      .where('teacher.email = :email', { email: req.body.email })
      .getOne();
    if(user) {
      const newPassword = getRandomPassword();
      await recoverAccountEmail(user?.email!, newPassword);
      await user.save();
    }
    res.status(200).json({
      server: 'Llaves enviadas al correo electronico registrado'
    });
  } catch(err) {
    if(err instanceof Error) {
      logger.error(err);
      res.status(500).json({
        server: 'Error interno en el servidor'
      });
    }
  }
}