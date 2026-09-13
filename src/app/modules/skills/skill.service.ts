import { Message, Skill } from "@prisma/client";
import prisma from "../../shared/prisma";

const addSkillsIntoDB = async (payload: Skill) => {
  const result = await prisma.skill.create({
    data: payload,
  });
  return result;
};

const getAllSkillDataFromDB = async () => {
  const result = await prisma.skill.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return result;
};

const deleteSkillFromDB = async (id: string) => {
  console.log(id)
  await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.skill.delete({
    where: {
      id,
    }
  });
  return result;
};
const updateSkillFromDB = async (id: string, payload: Partial<Skill>) => {
  await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.skill.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const SkillServices = {
  addSkillsIntoDB,
  getAllSkillDataFromDB,
  deleteSkillFromDB,
  updateSkillFromDB
};
