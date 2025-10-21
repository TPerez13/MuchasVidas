import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '..';
import { catchAsync } from '../middleware/error.middleware';
import { z } from 'zod';

const createHabitEntrySchema = z.object({
  typeId: z.string().uuid('Invalid habit type ID'),
  value: z.number().positive('Value must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  notes: z.string().optional(),
  dateTime: z.string().datetime().optional(),
});

const getHabitEntriesSchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  typeId: z.string().uuid('Invalid habit type ID').optional(),
});

export const getHabitTypes = catchAsync(async (req: Request, res: Response) => {
  const habitTypes = await prisma.habitType.findMany();
  
  res.status(StatusCodes.OK).json({
    status: 'success',
    results: habitTypes.length,
    data: {
      habitTypes,
    },
  });
});

export const createHabitEntry = catchAsync(async (req: Request, res: Response) => {
  const { typeId, value, unit, notes, dateTime } = createHabitEntrySchema.parse(req.body);
  const userId = req.user.id;

  // Check if habit type exists
  const habitType = await prisma.habitType.findUnique({
    where: { id: typeId },
  });

  if (!habitType) {
    throw new Error('Habit type not found');
  }

  const entry = await prisma.habitEntry.create({
    data: {
      userId,
      typeId,
      value,
      unit,
      notes,
      dateTime: dateTime ? new Date(dateTime) : new Date(),
    },
  });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      entry,
    },
  });
});

export const getHabitEntries = catchAsync(async (req: Request, res: Response) => {
  const { from, to, typeId } = getHabitEntriesSchema.parse(req.query);
  const userId = req.user.id;

  const where: any = { userId };
  
  if (typeId) where.typeId = typeId;
  
  if (from || to) {
    where.dateTime = {};
    if (from) where.dateTime.gte = new Date(from as string);
    if (to) where.dateTime.lte = new Date(to as string);
  }

  const entries = await prisma.habitEntry.findMany({
    where,
    include: {
      type: true,
    },
    orderBy: {
      dateTime: 'desc',
    },
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    results: entries.length,
    data: {
      entries,
    },
  });
});
