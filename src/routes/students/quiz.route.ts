import { Router } from 'express';
import postQuiz from 'controllers/students/postQuiz.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';

const router = Router();

router.post('/', verifyStudentToken, postQuiz);

export default router;