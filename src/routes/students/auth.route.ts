import { Router } from 'express';

import postLogin from 'controllers/students/postLogin.controller';

const router = Router();

router.post('/login', postLogin);

export default router;