import { Blog } from "@prisma/client";
import prisma from "../../shared/prisma";

const addBlogDataIndoDB = async (email: string, payload: any) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const { id, author, authorId, createdAt, updatedAt, publishDate, ...rest } = payload;

  const blogData: any = {
    ...rest,
    authorId: userInfo.id,
  };

  if (publishDate) {
    blogData.publishDate = new Date(publishDate);
  }

  const result = await prisma.blog.create({
    data: blogData,
    include: {
      author: {
        select: {
          name: true,
          email: true,
          profile_image: true,
        },
      },
    },
  });
  return result;
};

const getAllBlogDataFromDB = async () => {
  const result = await prisma.blog.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          profile_image: true,
        },
      },
    },
  });
  return result;
};

const deletedBlogIntoDB = async (id: string) => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateBlogIntoDB = async (id: string, blogInfo: any) => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { id: _id, author, authorId, createdAt, updatedAt, publishDate, ...rest } = blogInfo;

  const updateData: any = {
    ...rest,
  };

  if (publishDate) {
    updateData.publishDate = new Date(publishDate);
  }

  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: updateData,
    include: {
      author: {
        select: {
          name: true,
          email: true,
          profile_image: true,
        },
      },
    },
  });
  return result;
};

export const blogServices = {
  addBlogDataIndoDB,
  getAllBlogDataFromDB,
  deletedBlogIntoDB,
  updateBlogIntoDB,
};

