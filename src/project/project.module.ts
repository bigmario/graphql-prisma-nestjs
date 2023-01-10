import { Module } from '@nestjs/common';
import { ProjectResolvers } from './project.resolvers';
import { ProjectService } from './project.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ProjectResolvers, ProjectService],
  imports: [PrismaModule],
})
export class ProjectModule {}
