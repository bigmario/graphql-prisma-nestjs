import { Injectable } from '@nestjs/common';
import { developer } from '@prisma/client';
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
    });
  }

  async findAll(): Promise<developer[]> {
    return this.prisma.developer.findMany({});
  }

  async create(input: NewDeveloper): Promise<developer> {
    return this.prisma.developer.create({
      data: input,
    });
  }

  async update(params: UpdateDeveloper): Promise<developer> {
    const { id, ...params_without_id } = params;

    return this.prisma.developer.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
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
