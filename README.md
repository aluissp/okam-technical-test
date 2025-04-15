# Task manager app

## Setup

1. First, run the database:

```sh
docker compose up -d
```

2. Copy .env.template and set your env variables

```sh
cp .env.template .env
```

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

3. Install dependencies:

```sh
bun install
```

4. Execute migrations

```sh
bunx prisma migrate dev
bunx prisma generate
```

5. Seed the database executing this script:

```sh
bun run seed
```

6. Generate next-auth secret

```sh
bunx auth secret
```

7. Finally, run the development server:

```bash
bun dev
```

### Default credentials

- **email**: luisprg05@gmail.com
- **password**: test1234
