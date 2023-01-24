/*
  Warnings:

  - The primary key for the `developer_has_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `developer_has_roles` table. All the data in the column will be lost.
  - The primary key for the `project_has_devs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `project_has_devs` table. All the data in the column will be lost.
  - The primary key for the `project_has_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `project_has_roles` table. All the data in the column will be lost.
  - Made the column `developerId` on table `developer_has_roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roleId` on table `developer_has_roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `project_has_devs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `devId` on table `project_has_devs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `project_has_roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roleId` on table `project_has_roles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "developer_has_roles" DROP CONSTRAINT "developer_has_roles_developerId_fkey";

-- DropForeignKey
ALTER TABLE "developer_has_roles" DROP CONSTRAINT "developer_has_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "project_has_devs" DROP CONSTRAINT "project_has_devs_devId_fkey";

-- DropForeignKey
ALTER TABLE "project_has_devs" DROP CONSTRAINT "project_has_devs_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_has_roles" DROP CONSTRAINT "project_has_roles_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_has_roles" DROP CONSTRAINT "project_has_roles_roleId_fkey";

-- AlterTable
ALTER TABLE "developer_has_roles" DROP CONSTRAINT "developer_has_roles_pkey",
DROP COLUMN "id",
ALTER COLUMN "developerId" SET NOT NULL,
ALTER COLUMN "roleId" SET NOT NULL,
ADD CONSTRAINT "developer_has_roles_pkey" PRIMARY KEY ("developerId", "roleId");

-- AlterTable
ALTER TABLE "project_has_devs" DROP CONSTRAINT "project_has_devs_pkey",
DROP COLUMN "id",
ALTER COLUMN "projectId" SET NOT NULL,
ALTER COLUMN "devId" SET NOT NULL,
ADD CONSTRAINT "project_has_devs_pkey" PRIMARY KEY ("projectId", "devId");

-- AlterTable
ALTER TABLE "project_has_roles" DROP CONSTRAINT "project_has_roles_pkey",
DROP COLUMN "id",
ALTER COLUMN "projectId" SET NOT NULL,
ALTER COLUMN "roleId" SET NOT NULL,
ADD CONSTRAINT "project_has_roles_pkey" PRIMARY KEY ("projectId", "roleId");

-- AddForeignKey
ALTER TABLE "project_has_devs" ADD CONSTRAINT "project_has_devs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_devs" ADD CONSTRAINT "project_has_devs_devId_fkey" FOREIGN KEY ("devId") REFERENCES "developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_roles" ADD CONSTRAINT "project_has_roles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_roles" ADD CONSTRAINT "project_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_has_roles" ADD CONSTRAINT "developer_has_roles_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_has_roles" ADD CONSTRAINT "developer_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
