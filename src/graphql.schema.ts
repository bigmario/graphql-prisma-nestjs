
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ProjectStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export class NewDeveloper {
    name: string;
    email: string;
    roleId: string;
}

export class UpdateDeveloper {
    id: string;
    name?: Nullable<string>;
    email?: Nullable<string>;
    projectId?: Nullable<string>;
    roleId?: Nullable<string>;
}

export class NewProject {
    name: string;
    description: string;
    roleId: string;
}

export class UpdateProject {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<ProjectStatus>;
    developerId?: Nullable<string>;
    roleId?: Nullable<string>;
}

export class NewSpeciality {
    name: string;
}

export class UpdateSpeciality {
    id: string;
    name?: Nullable<string>;
}

export class Developer {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    projects?: Nullable<Nullable<Project>[]>;
    roles?: Nullable<Nullable<Speciality>[]>;
}

export abstract class IQuery {
    abstract AllDevelopers(): Developer[] | Promise<Developer[]>;

    abstract Developer(id: string): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract AllProjects(): Project[] | Promise<Project[]>;

    abstract Project(id: string): Nullable<Project> | Promise<Nullable<Project>>;

    abstract AllSpecialities(): Speciality[] | Promise<Speciality[]>;

    abstract Speciality(id: string): Nullable<Speciality> | Promise<Nullable<Speciality>>;
}

export abstract class IMutation {
    abstract createDeveloper(input: NewDeveloper): Developer | Promise<Developer>;

    abstract updateDeveloper(input: UpdateDeveloper): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract deleteDeveloper(id: string): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract createProject(input: NewProject): Project | Promise<Project>;

    abstract updateProject(input: UpdateProject): Nullable<Project> | Promise<Nullable<Project>>;

    abstract deleteProject(id: string): Nullable<Project> | Promise<Nullable<Project>>;

    abstract createSpeciality(input: NewSpeciality): Speciality | Promise<Speciality>;

    abstract updateSpeciality(input: UpdateSpeciality): Nullable<Speciality> | Promise<Nullable<Speciality>>;

    abstract deleteSpeciality(id: string): Nullable<Speciality> | Promise<Nullable<Speciality>>;
}

export abstract class ISubscription {
    abstract developerCreated(): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract projectCreated(): Nullable<Project> | Promise<Nullable<Project>>;

    abstract specialityCreated(): Nullable<Speciality> | Promise<Nullable<Speciality>>;
}

export class Project {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<ProjectStatus>;
    developers?: Nullable<Nullable<Developer>[]>;
    roles?: Nullable<Nullable<Speciality>[]>;
}

export class Speciality {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

type Nullable<T> = T | null;
