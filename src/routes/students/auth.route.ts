import { Router } from 'express';

import postLogin from 'controllers/students/postLogin.controller';
import getProfile from 'controllers/getProfile.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';

const router = Router();

router.get('/profile', verifyStudentToken, getProfile);
router.post('/login', postLogin);

export default router;