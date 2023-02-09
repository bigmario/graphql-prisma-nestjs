import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { developer, Prisma } from '@prisma/client';
import { DeveloperSearchParams, NewDeveloper, UpdateDeveloper } from 'src/graphql.schema';
import { PrismaService } from '../../core/prisma/prisma.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class DeveloperService {
  constructor(private prisma: PrismaService, private projectService: ProjectService) {}

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

  async findAll(params: DeveloperSearchParams): Promise<developer[]> {
    try {
      const developers = await this.prisma.developer.findMany({
        where: {
          ...(params?.roleId && {
            roles: {
              some: {
                roleId: params.roleId
              }
            }
          }),
          ...(params?.projectId && {
            projects: {
              some: {
                projectId: params.projectId
              }
            }
          })
        },
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
          const developerRoleData: Prisma.developer_has_rolesCreateManyArgs["data"] =[]
          const data: Prisma.developerCreateInput = {
            name: input.name,
            email: input.email,
          }
          const newDev = await this.prisma.developer.create({
            data: data,
          });

          for (const roleId of input.rolesIds) {
            developerRoleData.push({
              developerId: newDev.id,
              roleId: roleId
            })
          }
      
          await this.prisma.developer_has_roles.createMany({
            data: developerRoleData
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
          const rolesIntersection = []
          
          if(!await this.findOne(id)) {
            throw new NotFoundException("Developer not found");      
          }

          const updateDeveloperData: Prisma.developerUpdateInput = {
            name: params_without_id?.name,
            email: params_without_id?.email,
          }

          const updateDev = await this.prisma.developer.update({
            where: {
              id: id
            },
            data: updateDeveloperData,
            include: this.developerIncludeSelect
          });

          if (params_without_id.rolesIds) {
            for (const roleId of params_without_id.rolesIds) {
              await this.prisma.developer_has_roles.upsert({
                where: {
                  developerId_roleId: {
                    developerId: id,
                    roleId
                  }
                },
                create: {
                  roleId,
                  developerId: id,
                },
                update: {
                  roleId,
                  developerId: id,
                }
              });
            }
          }
          
          const dev = updateDev

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
