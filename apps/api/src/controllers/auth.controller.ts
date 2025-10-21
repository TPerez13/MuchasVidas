import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '..';
import { ApiError, catchAsync } from '../middleware/error.middleware';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, name, password } = registerSchema.parse(req.body);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'USER_EXISTS',
      'User with this email already exists'
    );
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      passHash: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  // Generate JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  res.status(StatusCodes.CREATED).json({
    user,
    token,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      passHash: true,
      createdAt: true,
    },
  });

  // Check if user exists and password is correct
  if (!user || !(await bcrypt.compare(password, user.passHash))) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'INVALID_CREDENTIALS',
      'Invalid email or password'
    );
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  // Remove password hash from response
  const { passHash, ...userWithoutPassword } = user;

  res.status(StatusCodes.OK).json({
    user: userWithoutPassword,
    token,
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  // The user is attached to the request by the auth middleware
  const user = req.user;
  res.status(StatusCodes.OK).json(user);
});
