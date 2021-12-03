import { Router } from 'express';

import authRoutes from 'routes/students/auth.route';
import groupRoutes from 'routes/students/groups.route';
import questionRoutes from 'routes/students/questions.route';
import quizRouter from 'routes/students/quiz.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/questions', questionRoutes);
router.use('/quiz', quizRouter);

export default router;