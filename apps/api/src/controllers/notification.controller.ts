import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '..';
import { catchAsync } from '../middleware/error.middleware';
import { z } from 'zod';

const scheduleNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  scheduledFor: z.string().datetime('Invalid date format'),
});

export const scheduleNotification = catchAsync(async (req: Request, res: Response) => {
  const { title, body, scheduledFor } = scheduleNotificationSchema.parse(req.body);
  const userId = req.user.id;

  const notification = await prisma.notification.create({
    data: {
      userId,
      title,
      body,
      scheduledFor: new Date(scheduledFor),
      status: 'SCHEDULED',
    },
  });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      notification,
    },
  });
});

export const getUserNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: {
      scheduledFor: 'desc',
    },
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    results: notifications.length,
    data: {
      notifications,
    },
  });
});
