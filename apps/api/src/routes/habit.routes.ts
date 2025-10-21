import { Router } from 'express';
import * as habitController from '../controllers/habit.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes below this middleware are protected
router.use(protect);

// Habit Types
router.get('/types', habitController.getHabitTypes);

// Habit Entries
router
  .route('/entries')
  .post(habitController.createHabitEntry)
  .get(habitController.getHabitEntries);

export default router;
