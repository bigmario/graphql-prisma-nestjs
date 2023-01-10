
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
}

export class UpdateDeveloper {
    id: string;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export class NewSpeciality {
    name: string;
}

export class UpdateSpeciality {
    id: string;
    name?: Nullable<string>;
}

export class NewProject {
    name: string;
    description: string;
}

export class UpdateProject {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<ProjectStatus>;
}

export class Developer {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export abstract class IQuery {
    abstract AllDevelopers(): Developer[] | Promise<Developer[]>;

    abstract Developer(id: string): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract AllSpecialities(): Speciality[] | Promise<Speciality[]>;

    abstract Speciality(id: string): Nullable<Speciality> | Promise<Nullable<Speciality>>;

    abstract AllProjects(): Project[] | Promise<Project[]>;

    abstract Project(id: string): Nullable<Project> | Promise<Nullable<Project>>;
}

export abstract class IMutation {
    abstract createDeveloper(input: NewDeveloper): Developer | Promise<Developer>;

    abstract updateDeveloper(input: UpdateDeveloper): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract deleteDeveloper(id: string): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract createSpeciality(input: NewSpeciality): Speciality | Promise<Speciality>;

    abstract updateSpeciality(input: UpdateSpeciality): Nullable<Speciality> | Promise<Nullable<Speciality>>;

    abstract deleteSpeciality(id: string): Nullable<Speciality> | Promise<Nullable<Speciality>>;

    abstract createProject(input: NewProject): Project | Promise<Project>;

    abstract updateProject(input: UpdateProject): Nullable<Project> | Promise<Nullable<Project>>;

    abstract deleteProject(id: string): Nullable<Project> | Promise<Nullable<Project>>;
}

export abstract class ISubscription {
    abstract developerCreated(): Nullable<Developer> | Promise<Nullable<Developer>>;

    abstract specialityCreated(): Nullable<Speciality> | Promise<Nullable<Speciality>>;

    abstract projectCreated(): Nullable<Project> | Promise<Nullable<Project>>;
}

export class Speciality {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export class Project {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
}

type Nullable<T> = T | null;
