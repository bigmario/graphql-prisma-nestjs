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
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "specId" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speciality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_has_devs" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "devId" TEXT,

    CONSTRAINT "project_has_devs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_has_roles" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "roleId" TEXT,

    CONSTRAINT "project_has_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer_has_roles" (
    "id" TEXT NOT NULL,
    "developerId" TEXT,
    "roleId" TEXT,

    CONSTRAINT "developer_has_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_specId_key" ON "role"("specId");

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_specId_fkey" FOREIGN KEY ("specId") REFERENCES "speciality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_devs" ADD CONSTRAINT "project_has_devs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_devs" ADD CONSTRAINT "project_has_devs_devId_fkey" FOREIGN KEY ("devId") REFERENCES "developer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_roles" ADD CONSTRAINT "project_has_roles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_has_roles" ADD CONSTRAINT "project_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_has_roles" ADD CONSTRAINT "developer_has_roles_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_has_roles" ADD CONSTRAINT "developer_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
