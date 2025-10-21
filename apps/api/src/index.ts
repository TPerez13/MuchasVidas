import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import habitRoutes from './routes/habit.routes';
import gamificationRoutes from './routes/gamification.routes';
import notificationRoutes from './routes/notification.routes';
import { errorHandler } from './middleware/error.middleware';

export const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/habits', habitRoutes);
app.use('/gamification', gamificationRoutes);
app.use('/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    code: 'NOT_FOUND',
    message: 'The requested resource was not found',
  });
});

// Error handler
app.use(errorHandler);

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

export default app;
