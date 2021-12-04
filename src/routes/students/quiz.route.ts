import { Router } from 'express';
import postQuiz from 'controllers/students/postQuiz.controller';
import getQuestion from 'controllers/students/getQuestion.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';

const router = Router();

router.get('/:quizId/question', verifyStudentToken, getQuestion);
router.post('/', verifyStudentToken, postQuiz);

export default router;