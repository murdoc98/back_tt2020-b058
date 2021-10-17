import { Router } from 'express';

import postLogin from 'controllers/teachers/postLogin.controller';
import getProfile from 'controllers/students/getProfile.controller';
import verifyTeacherToken from 'middlewares/verifyTeacherToken.middleware';

const router = Router();

router.get('/profile', verifyTeacherToken, getProfile);
router.post('/login', postLogin);

export default router;