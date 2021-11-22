import { Router } from 'express';

import verifyTeacherToken from 'middlewares/verifyTeacherToken.middleware';

import postGroup from 'controllers/teachers/postGroup.controller';
import getGroups from 'controllers/teachers/getGroups.controller';

const router = Router();

router.get('/', verifyTeacherToken, getGroups);
router.post('/', verifyTeacherToken, postGroup);

export default router;