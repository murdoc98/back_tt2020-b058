import { Router } from 'express';
import getGroups from 'controllers/students/getGroups.controller';
import getGroup from 'controllers/students/getGroup.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';
import postEnroll from 'controllers/students/postEnroll.controller';
import getQuizzes from 'controllers/students/getQuizzes.controller';
import postQuiz from 'controllers/students/postQuiz.controller';

const router = Router();

router.get('/', verifyStudentToken, getGroups);
router.get('/:groupId', verifyStudentToken, getGroup);
router.get('/:groupId/quizzes', verifyStudentToken, getQuizzes);
router.post('/:groupId/quiz', verifyStudentToken, postQuiz);
router.post('/:groupId/enroll', verifyStudentToken, postEnroll);

export default router;