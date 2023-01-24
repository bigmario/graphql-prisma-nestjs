/*
  Warnings:

  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "developer_has_roles" DROP CONSTRAINT "developer_has_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "project_has_roles" DROP CONSTRAINT "project_has_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_specId_fkey";

-- DropTable
DROP TABLE "role";

-- AddForeignKey
ALTER TABLE "project_has_roles" ADD CONSTRAINT "project_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_has_roles" ADD CONSTRAINT "developer_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
