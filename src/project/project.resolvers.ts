import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project, NewProject, UpdateProject } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Project')
export class ProjectResolvers {
  constructor(private readonly ProjectService: ProjectService) {}

  @Query('AllProjects')
  async Projects(): Promise<Project[]> {
    return this.ProjectService.findAll();
  }

  @Query('Project')
  async Project(@Args('id') args: string): Promise<Project> {
    return this.ProjectService.findOne(args);
  }

  @Mutation('createProject')
  async create(@Args('input') args: NewProject): Promise<Project> {
    const createdProject = await this.ProjectService.create(args);
    pubSub.publish('ProjectCreated', { ProjectCreated: createdProject });
    return createdProject;
  }

  @Mutation('updateProject')
  async update(@Args('input') args: UpdateProject): Promise<Project> {
    return this.ProjectService.update(args);
  }

  @Mutation('deleteProject')
  async delete(@Args('id') args: string): Promise<Project> {
    return this.ProjectService.delete(args);
  }

  @Subscription('projectCreated')
  ProjectCreated() {
    return pubSub.asyncIterator('projectCreated');
  }
}
