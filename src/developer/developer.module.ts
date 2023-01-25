import { Module } from '@nestjs/common';
import { DeveloperResolvers } from './developer.resolvers';
import { DeveloperService } from './developer.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  providers: [DeveloperResolvers, DeveloperService],
  imports: [PrismaModule, ProjectModule],
})
export class DeveloperModule {}
