import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { developer, Prisma } from '@prisma/client';
import { NewDeveloper, UpdateDeveloper } from 'src/graphql.schema';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class DeveloperService {
  constructor(private prisma: PrismaService) {}

  private developerIncludeSelect: Prisma.developerSelect = {
    projects: {
      select: {
        project: true
      }
    },
    roles: {
      select: {
        role: true
      }
    }
  }

  async findOne(id: string): Promise<developer | null> {
    const developer = await this.prisma.developer.findUnique({
      where: {
        id,
      },
      include: this.developerIncludeSelect
    });

    if (developer) {
      const proj = []
      const roles = []
      
      for (const project of developer['projects'] ) {
        proj.push(project["project"])
      }
      for (const role of developer['roles'] ) {
        roles.push(role["role"])
      }

      const response = {
        id: developer.id,
        name: developer.name,
        email:  developer.email,
        projects: proj,
        roles: roles
      }
      return response
    } else {
      throw new NotFoundException('Developer Not found')
    }
  }

  async findAll(): Promise<developer[]> {
    try {
      const developers = await this.prisma.developer.findMany({
        include: this.developerIncludeSelect
      });
      
      const response = []
  
      for (const item of developers) {
        const proj = []
        const roles = []
        for (const project of item['projects'] ) {
          proj.push(project["project"])
        }
        for (const role of item['roles'] ) {
          roles.push(role["role"])
        }
        response.push({
          id: item.id,
          name: item.name,
          email:  item.email,
          projects: proj,
          roles: roles
        })      
      }
      return response
    } catch (error) {
      console.log(`[DEV.SRV]: ${error}`);      
      throw new InternalServerErrorException("Unknown error");      
    }
       
  }

  async create(input: NewDeveloper): Promise<developer> {
    return await this.prisma.$transaction(
      async () => {
        try {
          const data: Prisma.developerCreateInput = {
            name: input.name,
            email: input.email,
          }
          const newDev = await this.prisma.developer.create({
            data: data,
          });
      
          await this.prisma.developer_has_roles.create({
            data: {
              developerId: newDev.id,
              roleId: input.roleId
            } 
          })
      
          return newDev
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException({
            message: error,
          });
        }
        
      });
    
  }

  async update(params: UpdateDeveloper): Promise<developer> {
    return await this.prisma.$transaction(
      async () => {
        try {
          const { id, ...params_without_id } = params;

          const updateDeveloperData: Prisma.developerUpdateInput = {
            name: params_without_id?.name,
            email: params_without_id?.email,
            ...(params_without_id?.projectId && {
              projects: {
                connectOrCreate: {
                  create: {
                    projectId: params_without_id?.projectId
                  },
                  where: {
                    projectId_devId: {
                      devId: id,
                      projectId: params_without_id?.projectId
                    }
                  }
                }
              } 
            }),
            ...(params_without_id?.roleId && {
              roles: {
                connectOrCreate: {
                  create: {
                    roleId: params_without_id?.roleId
                  },
                  where: {
                    developerId_roleId: {
                      developerId: id,
                      roleId: params_without_id?.roleId
                    }
                  }
                }
              } 
            }),     
          }

          if(!await this.findOne(id)) {
            throw new NotFoundException("Developer not found");      
          }

          const updateDev = this.prisma.developer.update({
            where: {
            id: id
            },
            data: updateDeveloperData,
            include: this.developerIncludeSelect
          });
          
          const dev = await updateDev

          const proj = []
          const roles = []
          
          for (const project of dev['projects'] ) {
            proj.push(project['project'])
          }
          for (const role of dev['roles'] ) {
            roles.push(role)
          }

          const response = {
            id: dev.id,
            name: dev.name,
            email:  dev.email,
            projects: proj,
            roles: roles
          }
          
          return response
              } catch (error) {
                console.log(error);
                throw new InternalServerErrorException({
                  message: error,
                });
              }
            });
  }

  async delete(id: string): Promise<developer> {
    if(!await this.findOne(id)) {
      throw new NotFoundException("Developer not found");      
    }
    return this.prisma.developer.delete({
      where: {
        id,
      },
    });
    
  }
}
