import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { NewProject, ProjectSearchParams, UpdateProject } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';
import { project } from '@prisma/client';

const pubSub = new PubSub();

@Resolver('Project')
export class ProjectResolvers {
  constructor(private readonly ProjectService: ProjectService) {}

  @Query('AllProjects')
  async Projects(@Args('params') params: ProjectSearchParams): Promise<project[]> {
    return this.ProjectService.findAll(params);
  }

  @Query('Project')
  async Project(@Args('id') args: string): Promise<project> {
    return this.ProjectService.findOne(args);
  }

  @Mutation('createProject')
  async create(@Args('input') args: NewProject): Promise<project> {
    const createdProject = await this.ProjectService.create(args);
    pubSub.publish('projectCreated', { ProjectCreated: createdProject });
    return createdProject;
  }

  @Mutation('updateProject')
  async update(@Args('input') args: UpdateProject): Promise<project> {
    return this.ProjectService.update(args);
  }

  @Mutation('deleteProject')
  async delete(@Args('id') args: string): Promise<project> {
    return this.ProjectService.delete(args);     
  }

  @Subscription('projectCreated')
  ProjectCreated() {
    return pubSub.asyncIterator('projectCreated');
  }
}
