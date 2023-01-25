import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaServiceType = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export async function createRoles(prismaClient: PrismaServiceType) {
  const data: Prisma.specialityCreateManyInput[] = [
    {
      name: 'UX'
    },
    {
      name: 'UI'
    },
    {
      name: 'FrontEnd'
    },
    {
      name: 'BackEnd'
    },
    {
      name: 'Testing'
    }
  ]
  await prismaClient.speciality.createMany({
    data: data,
    skipDuplicates: true
  });
}
