import bcrypt from 'bcryptjs';
import config from '../../config';
import prisma from '../../shared/prisma';
import { generateToken } from '../Auth/auth.utils';
import { User } from '@prisma/client';
import { IPaginationOptions } from '../../interface/pagination';
import { paginationHelper } from '../../helpers/paginationHelpers';

const createUser = async (data: any) => {
  const hashPassword = await bcrypt.hash(
    data.password,
    Number(config.BCRYPT_SALt_ROUNDS),
  );

  const userData = {
    ...data,
    password: hashPassword,
  };

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const result = await prisma.user.create({
    data: userData,
  });

  const jwtPayload = {
    email: result.email,
    id: result.id,
    role: result.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.JWT.JWT_ACCESS_SECRET as string,
    config.JWT.JWT_ACCESS_EXPIRES_IN,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.JWT.JWT_REFRESH_SECRET as string,
    config.JWT.JWT_REFRESH_EXPIRES_IN,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getAllUsersFromDB = async (options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const result = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.user.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getUserByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id
    },
  });
  if (!result) {
    throw new Error('User not found');
  }

  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<User>,
): Promise<User> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id
    },
  });

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });

  return result;
};

const deleteFromDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

const softDeleteFromDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // await prisma.user.update({
  //   where: {
  //     id,
  //   },
  //   data: {
  //     status: UserStatus.DELETED,
  //   },
  // });

  return;
};

export const UserService = {
  createUser,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
