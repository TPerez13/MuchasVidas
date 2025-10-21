import { Router } from 'express';
import * as gamificationController from '../controllers/gamification.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes below this middleware are protected
router.use(protect);

// Get all available achievements
router.get('/achievements', gamificationController.getAvailableAchievements);

// Get user's achievements and points
router.get('/me', gamificationController.getUserAchievements);

export default router;
