import { Module } from '@nestjs/common';
import { DeveloperResolvers } from './developer.resolvers';
import { DeveloperService } from './developer.service';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { ProjectModule } from 'src/modules/project/project.module';
import { EmailAddressScalar } from 'src/core/scalars/email.scalar';

@Module({
  providers: [DeveloperResolvers, DeveloperService, EmailAddressScalar],
  imports: [PrismaModule, ProjectModule],
})
export class DeveloperModule {}
