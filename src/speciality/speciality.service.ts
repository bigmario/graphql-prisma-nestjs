import { Injectable } from '@nestjs/common';
import { Speciality } from '@prisma/client';
import { NewSpeciality, UpdateSpeciality } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpecialityService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Speciality | null> {
    return this.prisma.speciality.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Speciality[]> {
    return this.prisma.speciality.findMany({});
  }

  async create(input: NewSpeciality): Promise<Speciality> {
    return this.prisma.speciality.create({
      data: input,
    });
  }

  async update(params: UpdateSpeciality): Promise<Speciality> {
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

  async delete(id: string): Promise<Speciality> {
    return this.prisma.speciality.delete({
      where: {
        id,
      },
    });
    
  }
}
