# URL Shortener

Create a short alias for a URL and redirect to the original.

Yarn workspaces: `server/` (Koa) and `client/` (Astro).

## Prerequisites

- Node `>=22.12.0`
- Yarn
- Docker

```bash
yarn install
```

## Server

The server is a TypeScript [Koa](https://koajs.com/) API. It stores aliases in Postgres with TypeORM and serves short-link redirects.

### Installation

Create `server/.env` (`.env` files are gitignored). Env is loaded from the server working directory:

```
API_PORT=4000
API_PUBLIC_URL=http://localhost:4000
CLIENT_URL=http://localhost:3001
DATABASE_URL=postgres://urlshortner:urlshortner@localhost:5455/urlshortner
```

Start Postgres. It runs in Docker on host port **5455** so it does not clash with a local Postgres on 5432.

```bash
yarn db:up
```

### Running the dev server

```bash
yarn dev:server
```

The API is at [http://localhost:4000](http://localhost:4000).

### Testing

Create a short link:

```bash
curl -X POST http://localhost:4000/aliases \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

Inspect the database. The `aliases` table is created when the server starts (TypeORM `synchronize`).

```bash
docker compose exec postgres psql -U urlshortner -d urlshortner
```

In `psql`, run these as **separate** commands:

```
\dt
```

```
SELECT * FROM aliases;
```

### Troubleshooting

- **`DATABASE_URL is not configured`** — values are missing from `server/.env`. Dotenv loads from the server cwd, not the repo root.
- **`role "urlshortner" does not exist`** — the app is talking to local Postgres on 5432 instead of Docker on 5455. Check `DATABASE_URL` uses port `5455`.

## Client

The client is a TypeScript [Astro](https://astro.build/) app with React. It talks to the Koa API to create short links.

### Installation

Create `client/.env`:

```
PUBLIC_API_URL=http://127.0.0.1:4000
```

### Running the dev server

```bash
yarn dev:client
```

The UI is at [http://localhost:3001](http://localhost:3001).

### Testing

With the server running, open [http://localhost:3001](http://localhost:3001) and shorten a URL.

### Troubleshooting

- If requests fail, confirm the API is up on port 4000 and `PUBLIC_API_URL` matches.
- CORS errors usually mean `CLIENT_URL` in `server/.env` is not `http://localhost:3001`.
