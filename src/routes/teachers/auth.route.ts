import { Router } from 'express';

import postLogin from 'controllers/teachers/postLogin.controller';
import getProfile from 'controllers/getProfile.controller';
import verifyTeacherToken from 'middlewares/verifyTeacherToken.middleware';
import putLogout from 'controllers/putLogout.controller';
import postTeacher from 'controllers/teachers/postTeacher.controller';
import putResetPassword from 'controllers/teachers/putResetPassword.controller';

const router = Router();

router.get('/profile', verifyTeacherToken, getProfile);
router.put('/logout', verifyTeacherToken, putLogout);
router.post('/signin', postTeacher);
router.post('/login', postLogin);
router.put('/resetPassword', putResetPassword);

export default router;