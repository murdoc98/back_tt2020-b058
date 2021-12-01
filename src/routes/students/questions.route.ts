import { Router } from 'express';
import getQuestion from 'controllers/students/getQuestion.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';

const router = Router();

router.get('/', verifyStudentToken, getQuestion);

export default router;