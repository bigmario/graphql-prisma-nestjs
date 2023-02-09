import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { DeveloperService } from './developer.service';
import { DeveloperSearchParams, NewDeveloper, UpdateDeveloper } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';
import { developer } from '@prisma/client';

const pubSub = new PubSub();

@Resolver('Developer')
export class DeveloperResolvers {
  constructor(
    private readonly developerService: DeveloperService
  ) {}

  @Query('AllDevelopers')
  async Developers(@Args('params') params: DeveloperSearchParams): Promise<developer[]> {
    return this.developerService.findAll(params);
  }

  @Query('Developer')
  async Developer(@Args('id') args: string): Promise<developer> {
    return this.developerService.findOne(args);
  }

  @Mutation('createDeveloper')
  async create(@Args('input') args: NewDeveloper): Promise<developer> {
    const createdDeveloper = await this.developerService.create(args);
    pubSub.publish('developerCreated', { DeveloperCreated: createdDeveloper });
    return createdDeveloper;
  }

  @Mutation('updateDeveloper')
  async update(@Args('input') args: UpdateDeveloper): Promise<developer> {
    return this.developerService.update(args);
  }

  @Mutation('deleteDeveloper')
  async delete(@Args('id') args: string): Promise<developer> {
    return this.developerService.delete(args);     
  }

  @Subscription('developerCreated')
  DeveloperCreated() {
    return pubSub.asyncIterator('developerCreated');
  }
}
