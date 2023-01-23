import { Injectable } from '@nestjs/common';
import { project } from '@prisma/client';
import { NewProject, UpdateProject } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<project | null> {
    return this.prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<project[]> {
    return this.prisma.project.findMany({});
  }

  async create(input: NewProject): Promise<project> {
    return this.prisma.project.create({
      data: input,
    });
  }

  async update(params: UpdateProject): Promise<any> {
    const { id, ...params_without_id } = params;

    // return this.prisma.project.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     ...params_without_id,
    //   },
    // });
  }

  async delete(id: string): Promise<project> {
    return this.prisma.project.delete({
      where: {
        id,
      },
    });
    
  }
}
