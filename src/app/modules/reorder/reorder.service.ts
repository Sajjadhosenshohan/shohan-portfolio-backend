import prisma from "../../shared/prisma";

type ReorderableEntity = "resume" | "project" | "blog" | "skill";

const reorderEntities = async (entity: ReorderableEntity, orderedIds: string[]) => {
  const modelMap = {
    resume: prisma.resume,
    project: prisma.project,
    blog: prisma.blog,
    skill: prisma.skill,
  };

  const model = modelMap[entity];
  if (!model) {
    throw new Error(`Invalid entity: ${entity}`);
  }

  // Use a transaction to update all sortOrders atomically
  const updates = orderedIds.map((id, index) =>
    (model as any).update({
      where: { id },
      data: { sortOrder: index },
    })
  );

  await prisma.$transaction(updates);

  return { message: `${entity} order updated successfully` };
};

export const ReorderServices = {
  reorderEntities,
};
