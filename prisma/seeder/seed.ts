import { PrismaServiceType } from './roles.seeder';
import { PrismaClient } from '@prisma/client';
import { createRoles } from './roles.seeder';

const prismaClient = new PrismaClient();

async function main(prismaClient: PrismaServiceType) {
  await createRoles(prismaClient);

  console.log('Database seeded');
}

main(prismaClient);