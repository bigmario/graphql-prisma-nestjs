import { Injectable } from '@nestjs/common';
import { Prisma, project } from '@prisma/client';
import { NewProject, UpdateProject } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  private projectIncludeOptions: Prisma.projectInclude = {
    developers: {
      include: {
        dev: true
      }
    },
    roles: {
      include: {
        role: true
      }
    }
  }

  async findOne(id: string): Promise<project | null> {
    return this.prisma.project.findUnique({
      where: {
        id,
      },
      include: this.projectIncludeOptions
    });
  }

  async findAll(): Promise<project[]> {
    return this.prisma.project.findMany({
      include: this.projectIncludeOptions      
    });
  }

  async create(input: NewProject): Promise<project> {
    const newProject = this.prisma.project.create({
      data: input,
    });

    return newProject
  }

  async update(params: UpdateProject): Promise<any> {
    const { id, ...params_without_id } = params;
    const updateProjectData: Prisma.projectUpdateInput = {
      name: params_without_id?.name,
      description: params_without_id?.description,
      developers: {
        connectOrCreate: {
          where: {
            id: params_without_id?.developerId
          },
          create: {
            devId: params_without_id?.developerId
          }
        }
      },
      roles: {
        connectOrCreate: {
          where: {
            id: params_without_id?.roleId
          },
          create: {
            roleId: params_without_id?.roleId
          }
        }
      },
      status: params_without_id.status
    }

    return this.prisma.project.update({
      where: {
        id,
      },
      data: updateProjectData,
    });
  }

  async delete(id: string): Promise<project> {
    return this.prisma.project.delete({
      where: {
        id,
      },
    });
    
  }
}
