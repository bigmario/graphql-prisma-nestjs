# GraphQL Challenge

## Installation

1. Install dependencies: `npm install`

## Run PostgreSQL server via docker compose
`docker-compose up -d`

## Run App
Run in development (watch) mode:
`npm run start:dev`<br>
or: <br>
Run in development mode: `npm run start:prod`<br>
This will:<br>
1. Generate TypeScript type definitions for the GraphQL schema.
3. Create sqlite database and create tables via migration.
4. Start server

## Graphql Playground

When the application is running, you can go to [http://localhost:3000/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.

### Developer
Mario Castro <mariocastro.pva@gmail.com>