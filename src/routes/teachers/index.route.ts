import { Router } from 'express';

import authRoutes from 'routes/teachers/auth.route';
import groupsRoutes from 'routes/teachers/groups.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/groups/', groupsRoutes);

export default router;