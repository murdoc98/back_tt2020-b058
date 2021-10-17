import { Router } from 'express';

import postLogin from 'controllers/teachers/postLogin.controller';
import getProfile from 'controllers/students/getProfile.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';

const router = Router();

router.get('/profile', verifyStudentToken, getProfile);
router.post('/login', postLogin);

export default router;