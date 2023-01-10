import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { SpecialityService } from './speciality.service';
import { Speciality, NewSpeciality, UpdateSpeciality } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Project')
export class SpecialityResolvers {
  constructor(private readonly specialityService: SpecialityService) {}

  @Query('AllProjects')
  async Projects(): Promise<Speciality[]> {
    return this.specialityService.findAll();
  }

  @Query('Project')
  async Project(@Args('id') args: string): Promise<Speciality> {
    return this.specialityService.findOne(args);
  }

  @Mutation('createProject')
  async create(@Args('input') args: NewSpeciality): Promise<Speciality> {
    const createdSpeciality = await this.specialityService.create(args);
    pubSub.publish('specialityCreated', { ProjectCreated: createdSpeciality });
    return createdSpeciality;
  }

  @Mutation('updateProject')
  async update(@Args('input') args: UpdateSpeciality): Promise<Speciality> {
    return this.specialityService.update(args);
  }

  @Mutation('deleteProject')
  async delete(@Args('id') args: string): Promise<Speciality> {
    return this.specialityService.delete(args);     
  }

  @Subscription('specialityCreated')
  SpecialityCreated() {
    return pubSub.asyncIterator('specialityCreated');
  }
}
