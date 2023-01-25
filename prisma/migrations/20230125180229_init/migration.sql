-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" DEFAULT 'IN_PROGRESS',

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speciality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_has_devs" (
    "projectId" TEXT NOT NULL,
    "devId" TEXT NOT NULL,

    CONSTRAINT "project_has_devs_pkey" PRIMARY KEY ("projectId","devId")
);

-- CreateTable
CREATE TABLE "project_has_roles" (
    "projectId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "project_has_roles_pkey" PRIMARY KEY ("projectId","roleId")
);

-- CreateTable
CREATE TABLE "developer_has_roles" (
    "developerId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "developer_has_roles_pkey" PRIMARY KEY ("developerId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "speciality_name_key" ON "speciality"("name");

-- AddForeignKey
ALTER TABLE "project_has_devs" ADD CONSTRAINT "project_has_devs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_devs" ADD CONSTRAINT "project_has_devs_devId_fkey" FOREIGN KEY ("devId") REFERENCES "developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_roles" ADD CONSTRAINT "project_has_roles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_roles" ADD CONSTRAINT "project_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_has_roles" ADD CONSTRAINT "developer_has_roles_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_has_roles" ADD CONSTRAINT "developer_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
