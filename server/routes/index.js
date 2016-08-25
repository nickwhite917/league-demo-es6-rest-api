import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import matchRoutes from './match';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

/** GET /echo - Check service health with an echo */
router.all('/echo', (req, res) =>
  res.json(req.body)
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /users
router.use('/match', matchRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
