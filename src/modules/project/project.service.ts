import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, project } from '@prisma/client';
import { NewProject, UpdateProject } from 'src/graphql.schema';
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

  async findAll(): Promise<project[]> {
    try {
      const projects = await this.prisma.project.findMany({
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

  async create(input: NewProject): Promise<project> {
    const data: Prisma.projectCreateInput = {
      name: input.name,
      description: input.description,
    }
    const newProject = await this.prisma.project.create({
      data: data,

    });

    await this.prisma.project_has_roles.create({
      data: {
        projectId: newProject.id,
        roleId: input.roleId
      }
    })

    return newProject
  }

  async update(params: UpdateProject): Promise<any> {
    const { id, ...params_without_id } = params;
    const updateProjectData: Prisma.projectUpdateInput = {
      name: params_without_id?.name,
      description: params_without_id?.description,
      ...(params_without_id?.developerId && {
        developers: {
          connectOrCreate: {
            where: {
              projectId_devId: {
                devId: params_without_id?.developerId,
                projectId: id
              }
            },
            create: {
              devId: params_without_id.developerId
            }
          }
        }
      }),
      ...(params_without_id?.roleId && {
        roles: {
          connectOrCreate: {
            where: {
              projectId_roleId: {
                projectId: id,
                roleId: params_without_id?.roleId
              }
            },
            create: {
              roleId: params_without_id?.roleId
            }
          }
        }
      }),
      status: params_without_id.status
    }

    if(!await this.findOne(id)) {
      throw new NotFoundException("Project not found");      
    }

    const rolesIntersection = await this.checkDevRolesForProject(params_without_id.developerId, id)
    
    if (rolesIntersection.length==0){
      throw new NotFoundException('Not matching roles')
    }

    const updateProject = this.prisma.project.update({
      where: {
        id,
      },
      data: updateProjectData,
      include: this.projectIncludeSelect
    });

    const proj = await updateProject
       

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
