import { Router } from 'express';

import authRoutes from 'routes/teachers/auth.route';

const router = Router();

router.use('/auth', authRoutes);

export default router;