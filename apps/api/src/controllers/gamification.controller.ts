import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '..';
import { catchAsync } from '../middleware/error.middleware';

export const getAvailableAchievements = catchAsync(async (req: Request, res: Response) => {
  const achievements = await prisma.achievement.findMany();
  
  res.status(StatusCodes.OK).json({
    status: 'success',
    results: achievements.length,
    data: {
      achievements,
    },
  });
});

export const getUserAchievements = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: {
      achievement: true,
    },
    orderBy: {
      obtainedAt: 'desc',
    },
  });

  // Calculate total points
  const totalPoints = userAchievements.reduce(
    (sum, achievement) => sum + (achievement.points || 0),
    0
  );

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      achievements: userAchievements,
      totalPoints,
    },
  });
});
