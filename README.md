# GraphQL Challenge
CRUD in Typescript with GraphQL and NestJS containing the following models and relationships::

- Project: ID, name, description, status (Enum), has many devs, requires certain Roles.
- Developer: ID, name, email, can work on several projects, has several Roles
- Specialty: ID, Name

**Functioning**:

- The system must validate the data entered: Emails, blank texts, etc.
- The user will be able to register different specialties: Frontend, Backend, Cloud Arquitech, UI, Tester, etc.
- The user will be able to register several projects
- The user will be able to relate several devs to a project, the system should throw an error if the dev does not have any of the roles required by the project. Ex: Interface Design Project, it has the Frontend and UI roles, a dev with the backend role cannot enter the project.
- The user will be able to list projects, being able to filter by Roles within the project and by status. Ex: all projects that require the UI role.
- The user will be able to list Devs, also being able to filter by Role and also by project.

## Installation

1. Install dependencies: `npm install`

## Run PostgreSQL server via docker compose
`docker compose up -d`

## Run App
Run in development (watch) mode:
`npm run start:dev`<br>
or: <br>
Run in development mode: `npm run start:prod`<br>
This will:<br>
1. Generate TypeScript type definitions for the GraphQL schema.
3. Create PostgreSQL database and create tables via migration.
4. Start server

## Graphql Playground

When the application is running, you can go to [http://localhost:3001/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.

### Developer
Mario Castro <mariocastro.pva@gmail.com>