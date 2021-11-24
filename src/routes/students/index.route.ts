import { Router } from 'express';

import authRoutes from 'routes/students/auth.route';
import groupRoutes from 'routes/students/groups.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);

export default router;