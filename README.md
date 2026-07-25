# matsu Front

React + TypeScript + Vite frontend for the matsu workspace.

The frontend talks to `matsu-bff` instead of calling the Laravel API or auth server directly. Login redirects through the auth server's authorization page, while the resulting tokens remain in the BFF and the browser receives only an HttpOnly session cookie.

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- openapi-fetch
- OpenAPI-generated TypeScript types
- lucide-react

## Local Development

```bash
npm install
npm run dev
```

The Vite dev server is usually available at:

```text
http://localhost:5173
```

## Environment

The BFF base URL defaults to:

```text
http://localhost:18082
```

Set `VITE_BFF_BASE_URL` if a different BFF origin is needed.

API requests use the typed BFF contract. The frontend must not store access or refresh tokens in localStorage.

## BFF Contract Workflow

The generated BFF OpenAPI artifact is the source of frontend API types. After changing a BFF
route or schema, regenerate both artifacts:

```bash
cd ../matsu-bff
npm run openapi:generate

cd ../matsu-front
npm run openapi:generate
```

`openapi-fetch` uses the generated `paths` type, so URLs, query parameters, request bodies,
success responses, and error responses are checked without handwritten API response types.

## Scripts

| Script                     | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| `npm run dev`              | Start the Vite dev server.                                        |
| `npm run build`            | Run TypeScript build checks and create the production Vite build. |
| `npm run lint`             | Run ESLint with zero warnings allowed.                            |
| `npm run lint:fix`         | Auto-fix ESLint issues where possible.                            |
| `npm run format`           | Format source files with Prettier.                                |
| `npm run format:check`     | Check Prettier formatting.                                        |
| `npm run typecheck`        | Run TypeScript without emitting files.                            |
| `npm run check`            | Run ESLint, TypeScript, and Prettier checks.                      |
| `npm run fix`              | Auto-fix ESLint issues and format the project.                    |
| `npm run openapi:generate` | Generate frontend types from the BFF OpenAPI artifact.            |
| `npm run openapi:check`    | Verify that generated frontend API types are current.             |
| `npm run preview`          | Preview the production build locally.                             |

On Windows PowerShell, use `npm.cmd run ...` if `npm.ps1` is blocked by execution policy.

## Docker

Start the Vite development server in Docker with hot reload:

```bash
docker compose up
```

The app is available at:

```text
http://localhost:5173
```

The Docker environment is intended for local development only. It uses
`VITE_BFF_BASE_URL=http://localhost:18082` so the browser calls the local BFF.

Run all quality checks in a one-off container:

```bash
docker compose run --rm front npm run check
```

Auto-fix ESLint issues and format the project through Docker:

```bash
docker compose run --rm front npm run fix
```

## CI

GitHub Actions runs on pull requests targeting `develop` or `main`. The workflow installs
dependencies with `npm ci`, runs ESLint, TypeScript, and Prettier checks, and verifies the
production build.

```text
.github/workflows/ci.yml
```

## Main Directories

- `src/api`: OpenAPI-typed client and API request modules.
- `src/api/generated/schema.d.ts`: Generated BFF request and response types.
- `src/auth`: Session helpers for BFF-backed authentication.
- `src/components`: Reusable UI components.
- `src/hooks`: React hooks.
- `src/pages`: Page-level components.
- `src/styles`: CSS, tokens, and utilities.
- `src/types`: Shared TypeScript types.
- `src/utils`: Utility functions.

## Related Services

- BFF: `http://localhost:18082`
- API through BFF: `http://localhost:18082/api`
- Laravel API directly: `http://localhost:18080/api`
- Auth server directly: `http://localhost:18081`
