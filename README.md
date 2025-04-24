# Task manager app

## Setup

1. First of all copy .env.template and set your env variables

```sh
cp .env.template .env
```

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

2. Install dependencies:

```sh
bun install
```

3. Execute migrations

```sh
bunx prisma migrate dev
bunx prisma generate
```

4. Seed the database executing this script:

```sh
bun run seed
```

5. Generate next-auth secret

```sh
bunx auth secret
```

6. Finally, run the development server:

```bash
bun dev
```

## Testing

You can use the following command to run your testing files

```sh
bun run test
```

### Default credentials

- **email**: luisprg05@gmail.com
- **password**: test1234

### Tasks completed

1. [x] Authentication with JWT
2. [x] ORM database
3. [x] Data validation using schemas with Zod
4. [x] Task CRUD
5. [x] Register and login of the users
6. [x] Middleware to protect privates routes
7. [x] Multitenancy: Only users that belongs to an organization can modify their tasks
8. [x] Soft delete: Tasks was marked 'deleted' using a boolean flag.
9. [x] Data recuperation: Only exists a one route to retrieve the deleted tasks
10. [x] Changes history: Describes the modifications when you update a tasks.
11. [x] React + TypeScript
12. [x] Login and register Page
13. [x] Form to create/edit tasks
14. [x] Show tasks completed, deleted and pending
