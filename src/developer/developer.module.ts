import { Module } from '@nestjs/common';
import { DeveloperResolvers } from './developer.resolvers';
import { DeveloperService } from './developer.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [DeveloperResolvers, DeveloperService],
  imports: [PrismaModule],
})
export class DeveloperModule {}
