import { Router } from 'express';
import * as notificationController from '../controllers/notification.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes below this middleware are protected
router.use(protect);

// Schedule a new notification
router.post('/schedule', notificationController.scheduleNotification);

// Get user's notifications
router.get('/', notificationController.getUserNotifications);

export default router;
