import { Router, Request, Response } from 'express';

import studentRoutes from 'routes/students/index.route';
import teacherRoutes from 'routes/teachers/index.route';

const router = Router();

// Test route
router.get('/', (req: Request, res: Response) => {
  res.status(200).json('Ok');
});

router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);

// Catch non implemented routes
router.all('*', (req: Request, res: Response) => {
  res.status(404).json('Route not found');
});

export default router;
