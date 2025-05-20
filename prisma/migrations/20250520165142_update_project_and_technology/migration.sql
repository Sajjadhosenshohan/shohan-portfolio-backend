/*
  Warnings:

  - You are about to drop the column `authorId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_authorId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "authorId",
DROP COLUMN "technologies",
ADD COLUMN     "features" TEXT[],
ALTER COLUMN "project_image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "projectId" TEXT,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "technologies" ADD CONSTRAINT "technologies_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
