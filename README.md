# Turborepo

## pnpm


### Install deps 

```sh
# All
pnpm i

# Api
pnpm i zod --filter=api

# Web
pnpm i zod --filter=web

# Packages
pnpm i zode --filter=@repo/logger
```


# Database

## Docker


### Only one time!

```sh
docker-compose -f ./docker/docker-compose.dev.yml up -d
```