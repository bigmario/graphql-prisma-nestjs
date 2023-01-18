import { Injectable } from '@nestjs/common';
import { speciality } from '@prisma/client';
import { NewSpeciality, UpdateSpeciality } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpecialityService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<speciality | null> {
    return this.prisma.speciality.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<speciality[]> {
    return this.prisma.speciality.findMany({});
  }

  async create(input: NewSpeciality): Promise<speciality> {
    return this.prisma.speciality.create({
      data: input,
    });
  }

  async update(params: UpdateSpeciality): Promise<speciality> {
    const { id, ...params_without_id } = params;

    return this.prisma.speciality.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<speciality> {
    return this.prisma.speciality.delete({
      where: {
        id,
      },
    });
    
  }
}
