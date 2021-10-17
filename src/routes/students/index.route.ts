import { Router } from 'express';

import authRoutes from 'routes/students/auth.route';

const router = Router();

router.use('/auth', authRoutes);

export default router;