
import { Resume } from "@prisma/client";
import prisma from "../../shared/prisma";

const addResumeIntoDB = async (payload: any) => {
  const { id, createdAt, updatedAt, ...rest } = payload;

  if (rest.isActive) {
    await prisma.resume.updateMany({
      data: { isActive: false },
    });
  }

  const result = await prisma.resume.create({
    data: rest,
  });
  return result;
};

const getAllResumeDataFromDB = async () => {
  const result = await prisma.resume.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return result;
};

const deleteResumeFromDB = async (id: string) => {
  await prisma.resume.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.resume.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateResumeFromDB = async (payload: any) => {
  const { id, createdAt, updatedAt, ...rest } = payload;
  await prisma.resume.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (rest.isActive) {
    await prisma.resume.updateMany({
      where: {
        id: { not: id },
      },
      data: { isActive: false },
    });
  }

  const result = await prisma.resume.update({
    where: {
      id,
    },
    data: rest,
  });
  return result;
};

export const ResumeServices = {
  addResumeIntoDB,
  getAllResumeDataFromDB,
  deleteResumeFromDB,
  updateResumeFromDB,
};

