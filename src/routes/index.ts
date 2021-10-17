import { Router, Request, Response } from 'express';

const router = Router();

// Test route
router.get('/', (req: Request, res: Response) => {
  res.status(200).json('Ok');
});

// Catch non implemented routes
router.all('*', (req: Request, res: Response) => {
  res.status(404).json('Route not found');
});

export default router;
