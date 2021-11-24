import { Router } from 'express';

import postLogin from 'controllers/teachers/postLogin.controller';
import getProfile from 'controllers/getProfile.controller';
import verifyTeacherToken from 'middlewares/verifyTeacherToken.middleware';
import putLogout from 'controllers/putLogout.controller';

const router = Router();

router.get('/profile', verifyTeacherToken, getProfile);
router.put('/logout', verifyTeacherToken, putLogout);
router.post('/login', postLogin);

export default router;