import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '..';
import { catchAsync } from '../middleware/error.middleware';

export const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  // The user is attached to the request by the auth middleware
  const user = req.user;
  
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
