import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectModule } from './modules/project/project.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { DeveloperModule } from './modules/developer/developer.module';
import { SpecialityModule } from './modules/speciality/speciality.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    DeveloperModule,
    SpecialityModule,
    ProjectModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class AppModule {}
