import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { SpecialityService } from './speciality.service';
import { Speciality, NewSpeciality, UpdateSpeciality } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Speciality')
export class SpecialityResolvers {
  constructor(private readonly specialityService: SpecialityService) {}

  @Query('AllSpecialities')
  async Projects(): Promise<Speciality[]> {
    return this.specialityService.findAll();
  }

  @Query('Speciality')
  async Project(@Args('id') args: string): Promise<Speciality> {
    return this.specialityService.findOne(args);
  }

  @Mutation('createSpeciality')
  async create(@Args('input') args: NewSpeciality): Promise<Speciality> {
    const createdSpeciality = await this.specialityService.create(args);
    pubSub.publish('specialityCreated', { ProjectCreated: createdSpeciality });
    return createdSpeciality;
  }

  @Mutation('updateSpeciality')
  async update(@Args('input') args: UpdateSpeciality): Promise<Speciality> {
    return this.specialityService.update(args);
  }

  @Mutation('deleteSpeciality')
  async delete(@Args('id') args: string): Promise<Speciality> {
    return this.specialityService.delete(args);     
  }

  @Subscription('specialityCreated')
  SpecialityCreated() {
    return pubSub.asyncIterator('specialityCreated');
  }
}
