
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

export class Project {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export abstract class IQuery {
    abstract AllProjects(): Project[] | Promise<Project[]>;

    abstract Project(id: string): Nullable<Project> | Promise<Nullable<Project>>;
}

export abstract class IMutation {
    abstract createProject(input: NewProject): Project | Promise<Project>;

    abstract updateProject(input: UpdateProject): Nullable<Project> | Promise<Nullable<Project>>;

    abstract deleteProject(id: string): Nullable<Project> | Promise<Nullable<Project>>;
}

export abstract class ISubscription {
    abstract projectCreated(): Nullable<Project> | Promise<Nullable<Project>>;
}

type Nullable<T> = T | null;
