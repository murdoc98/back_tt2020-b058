import { Router } from 'express';

import verifyTeacherToken from 'middlewares/verifyTeacherToken.middleware';

import postGroup from 'controllers/teachers/postGroup.controller';

const router = Router();

router.post('/', verifyTeacherToken, postGroup);

export default router;