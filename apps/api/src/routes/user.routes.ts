import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes below this middleware are protected
router.use(protect);

router.get('/me', userController.getUserProfile);
router.patch('/me', userController.updateUserProfile);

export default router;
