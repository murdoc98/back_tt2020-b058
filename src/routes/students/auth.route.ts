import { Router } from 'express';

import postLogin from 'controllers/students/postLogin.controller';
import getProfile from 'controllers/getProfile.controller';
import verifyStudentToken from 'middlewares/verifyStudentToken.middleware';
import putLogout from 'controllers/putLogout.controller';
import postStudent from 'controllers/students/postStudent.controller';
import putResetPassword from 'controllers/students/putResetPassword.controller';

const router = Router();

router.get('/profile', verifyStudentToken, getProfile);
router.put('/logout', verifyStudentToken, putLogout);
router.post('/signin', postStudent);
router.post('/login', postLogin);
router.put('/resetPassword', putResetPassword);

export default router;