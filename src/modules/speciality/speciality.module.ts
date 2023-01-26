import { Module } from '@nestjs/common';
import { SpecialityResolvers } from './speciality.resolvers';
import { SpecialityService } from './speciality.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  providers: [SpecialityResolvers, SpecialityService],
  imports: [PrismaModule],
})
export class SpecialityModule {}
