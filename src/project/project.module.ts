import { Module } from '@nestjs/common';
import { ProjectResolvers } from './project.resolvers';
import { ProjectService } from './project.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DeveloperModule } from 'src/developer/developer.module';

@Module({
  exports: [ProjectService],
  providers: [ProjectResolvers, ProjectService],
  imports: [PrismaModule],
})
export class ProjectModule {}
