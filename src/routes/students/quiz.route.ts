import { Router } from 'express';
import getQuestion from 'controllers/students/getQuestion.controller';
import postAnswer from 'controllers/students/postAnswer.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';

const router = Router();

router.get('/:quizId/question', verifyStudentToken, getQuestion);
router.post('/:quizId/question', verifyStudentToken, postAnswer);

export default router;