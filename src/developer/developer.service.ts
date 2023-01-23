import { Injectable } from '@nestjs/common';
import { developer, Prisma } from '@prisma/client';
import { NewDeveloper, UpdateDeveloper } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeveloperService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<developer | null> {
    return this.prisma.developer.findUnique({
      where: {
        id,
      },
      include: {
        projects: {
          include: {
            project: true
          }
        },
        roles: {
          include: {
            role: true
          }
        }
      }
    });
  }

  async findAll(): Promise<developer[]> {
    return this.prisma.developer.findMany({
      include: {
        projects: {
          include: {
            project: true            
          }
        },
        roles: {
          include: {
            role: true
          }
        }
      }
    });
  }

  async create(input: NewDeveloper): Promise<developer> {
    const newDev = await this.prisma.developer.create({
      data: input,
    });

    return newDev
  }

  async update(params: UpdateDeveloper): Promise<developer> {
    const { id, ...params_without_id } = params;

    const updateDeveloperData: Prisma.developerUpdateInput = {
      name: params_without_id?.name,
      email: params_without_id?.email,
      ...(params_without_id?.projectId && {
        projects: {
          connectOrCreate: {
            create: {
              projectId: params_without_id.projectId
            },
            where: {
              id: params_without_id?.projectId
            }
          }
        } 
      }),
      ...(params_without_id?.roleId && {
        roles: {
          connectOrCreate: {
            create: {
              roleId: params_without_id.roleId
            },
            where: {
              id: params_without_id?.roleId
            }
          }
        } 
      })      
    }

    return this.prisma.developer.update({
      where: {
       id: id,
      },
      data: updateDeveloperData,
      include: {
        projects: true,
        roles: true
      }
    });
  }

  async delete(id: string): Promise<developer> {
    return this.prisma.developer.delete({
      where: {
        id,
      },
    });
    
  }
}
