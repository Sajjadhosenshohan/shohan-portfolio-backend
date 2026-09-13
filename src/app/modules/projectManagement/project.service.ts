import { Project } from "@prisma/client";
import prisma from "../../shared/prisma";

const addProjectDataIndoDB = async (payload: any) => {
  const { id, authorId, technologies, createdAt, updatedAt, ...rest } = payload;

  const projectData: any = {
    ...rest,
  };

  if (Array.isArray(technologies) && technologies.length > 0) {
    projectData.technologies = {
      create: technologies.map((tech: any) => ({
        name: typeof tech === "string" ? tech : tech.name,
        icon: typeof tech === "object" && tech?.icon ? tech.icon : null,
      })),
    };
  }

  const result = await prisma.project.create({
    data: projectData,
    include: {
      technologies: true,
    },
  });
  return result;
};

const getAllProjectDataFromDB = async () => {
  const result = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    include: { technologies: true },
  });
  return result;
};

const deletedProjectIntoDB = async (id: string) => {
  await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.project.delete({
    where: {
      id,
    },
  });

  return result;
};

const updateProjectIntoDB = async (id: string, projectInfo: any) => {
  await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { id: _id, authorId, technologies, createdAt, updatedAt, ...rest } = projectInfo;

  const updateData: any = {
    ...rest,
  };

  if (Array.isArray(technologies)) {
    // Replace technologies for this project
    await prisma.technology.deleteMany({
      where: {
        projectId: id,
      },
    });

    if (technologies.length > 0) {
      updateData.technologies = {
        create: technologies.map((tech: any) => ({
          name: typeof tech === "string" ? tech : tech.name,
          icon: typeof tech === "object" && tech?.icon ? tech.icon : null,
        })),
      };
    }
  }

  const result = await prisma.project.update({
    where: {
      id,
    },
    data: updateData,
    include: {
      technologies: true,
    },
  });

  return result;
};

export const projectServices = {
  addProjectDataIndoDB,
  getAllProjectDataFromDB,
  deletedProjectIntoDB,
  updateProjectIntoDB,
};

