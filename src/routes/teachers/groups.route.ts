import { Router } from 'express';

import verifyTeacherToken from 'middlewares/verifyTeacherToken.middleware';

import getGroups from 'controllers/teachers/getGroups.controller';
import getGroup from 'controllers/teachers/getGroup.controller';
import postGroup from 'controllers/teachers/postGroup.controller';
import putEnroll from 'controllers/teachers/putEnroll.controller';

const router = Router();

router.get('/', verifyTeacherToken, getGroups);
router.get('/:groupId', verifyTeacherToken, getGroup);
router.post('/', verifyTeacherToken, postGroup);
router.put('/:groupId/:studentId', verifyTeacherToken, putEnroll);

export default router;