import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, project } from '@prisma/client';
import { NewProject, ProjectSearchParams, UpdateProject } from 'src/graphql.schema';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  private projectIncludeSelect: Prisma.projectSelect = {
    developers: {
      select: {
        dev: true,
      }
    },
    roles: {
      select: {
        role: true
      }
    }
  }

  async findOne(id: string): Promise<project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: this.projectIncludeSelect
    });

    if (project) {
      const dev = []
      const roles = []
      
      for (const developer of project['developers'] ) {
        dev.push(developer["dev"])
      }
      
      for (const role of project['roles'] ) {
        roles.push(role['role'])
      }
      
      const response = {
        id: project.id,
        name: project.name,
        description:  project.description,
        status: project.status,
        developers: dev,
        roles: roles
      };
      return response
    } else {
      throw new NotFoundException('Project Not found')
    }

    
  }

  async findAll(params: ProjectSearchParams): Promise<project[]> {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          ...(params?.roleId && {
            roles: {
              some: {
                roleId: params.roleId
              }
            }
          }),
          ...(params?.status && {
            status: params.status
          })
        },
        include: this.projectIncludeSelect      
      });

      const response = []
      for (const item of projects) {
        const dev = []
        const roles = []
        for (const developer of item['developers'] ) {
          dev.push(developer["dev"])
        }
        for (const role of item['roles'] ) {
          roles.push(role['role'])
        }
        response.push({
          id: item.id,
          name: item.name,
          description:  item.description,
          developers: dev,
          roles: roles
        });
      }
      
      return response
    } catch (error) {
      console.log(`[PROJ.SRV]: ${error}`);      
      throw new InternalServerErrorException("Unknown error");
    }
    
  }

  async create (input: NewProject): Promise<project> {
    return await this.prisma.$transaction(
      async () => {
        const projectRoleData: Prisma.project_has_rolesCreateManyArgs["data"] =[]
        
        try {
          const data: Prisma.projectCreateInput = {
            name: input.name,
            description: input.description,
          }
          const newProject = await this.prisma.project.create({
            data: data,
          });

          for (const roleId of input.rolesIds) {
            projectRoleData.push({
              projectId: newProject.id,
              roleId: roleId
            })
          }
      
          await this.prisma.project_has_roles.createMany({
            data: projectRoleData,
          })
          return newProject
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException({
            message: error,
          });
        }
      }
    );
  }

  async update(params: UpdateProject): Promise<any> {
    return await this.prisma.$transaction(
      async () => {
        try {
          const { id, ...params_without_id } = params;
          const rolesIntersection = []

          const updateProjectData: Prisma.projectUpdateInput = {
            name: params_without_id?.name,
            description: params_without_id?.description,
            status: params_without_id.status
          }

          if(!await this.findOne(id)) {
            throw new NotFoundException();      
          }

          for (const devId of params_without_id.developersIds) {
            rolesIntersection.push(await this.checkDevRolesForProject(devId, id)) 
          }          
          
          if (rolesIntersection.flat().length==0){
            throw new ConflictException()
          }

          const updateProject = await this.prisma.project.update({
            where: {
              id,
            },
            data: updateProjectData,
            include: this.projectIncludeSelect
          });

          if (params_without_id.developersIds) {
            for (const devId of params_without_id.developersIds) {
              await this.prisma.project_has_devs.upsert({
                where: {
                  projectId_devId: {
                    devId,
                    projectId: id
                  }  
                },
                create: {
                  devId,
                  projectId: id
                },
                update: {
                  devId,
                  projectId: id
                }
              });              
            }
          }

          if (params_without_id.rolesIds) {
            for (const roleId of params_without_id.rolesIds) {
              await this.prisma.project_has_roles.upsert({
                where: {
                  projectId_roleId: {
                    projectId: id,
                    roleId
                  }
                },
                create: {
                  roleId,
                  projectId: updateProject.id
                },
                update: {
                  roleId,
                  projectId: updateProject.id
                }
              });
            }
          }

          const proj = updateProject
          const dev = []
          const roles = []
          
          for (const developer of proj['developers'] ) {
            dev.push(developer['dev'])
          }
          for (const role of proj['roles'] ) {
            roles.push(role['role'])
          }

          const response = {
            id: proj.id,
            name: proj.name,
            desription:  proj.description,
            developers: dev,
            roles: roles
          }    
          
          return response
        } catch (error) {
          console.log(`[PROJ.SRV]:${error}`);
          if (error.status===404 ) {
            throw new NotFoundException("Project not found");
          } else if (error.status===409 ) {
            throw new ConflictException('Not matching roles between Project and one or more Devs')
          } else {
            throw new InternalServerErrorException({
              message: error,
            });
          }
        }
      }
    );
  }

  async delete(id: string): Promise<project> {
    if(!await this.findOne(id)) {
      throw new NotFoundException("Project not found");      
    }
    return this.prisma.project.delete({
      where: {
        id,
      },
    });
    
  }

  async checkDevRolesForProject(devId: string, projectId: string) {
    const responseDev = []
    const responseProject = []
    
    const devRoles =  await this.prisma.developer.findMany({
      where: {
        roles: {
          some: {
            developerId: devId
          }
        }
      },
      select: {
        roles: {
          select: {
            roleId: true
          }
        }
      }
    })

    for (const rolesObj of devRoles) {
      for (const roleId of rolesObj["roles"]) {
        responseDev.push(roleId.roleId)        
      }
    }

    const projectsRoles =  await this.prisma.project.findMany({
      where: {
        roles: {
          some: {
            projectId: projectId
          }
        }
      },
      select: {
        roles: {
          select: {
            roleId: true
          }
        }
      }
    })
    for (const rolesObj of projectsRoles) {
      for (const roleId of rolesObj["roles"]) {
        responseProject.push(roleId.roleId)        
      }
    }

    const intersection = responseProject.filter(element => responseDev.includes(element));
    
    return intersection
    
  }
}
