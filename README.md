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

4. Then, run the development server:

```bash
bun dev
```

5. Execute migrations

```sh
bunx prisma migrate dev
bunx prisma generate
```

6. Seed the database executing this script:

```sh
bun run seed
```

### Default credentials

- **email**: luisprg05@gmail.com
- **password**: test1234
