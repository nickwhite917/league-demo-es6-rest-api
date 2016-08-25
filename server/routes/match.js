import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import matchCtrl from '../controllers/match';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/:userId')
  /** GET /api/match/:userId - Get user */
  .get(matchCtrl.list);

/** Load user when API with userId route parameter is hit */
router.param('userId', matchCtrl.load);

export default router;
