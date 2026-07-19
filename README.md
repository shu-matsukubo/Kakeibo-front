# matsu Front

React + TypeScript + Vite frontend for the matsu workspace.

The frontend talks to `matsu-bff` instead of calling the Laravel API or auth server directly. Browser authentication is handled through an HttpOnly session cookie owned by the BFF.

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- Axios
- Zod
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

API requests use the BFF `/api/*` proxy. The frontend must not store access or refresh tokens in localStorage.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server. |
| `npm run build` | Run TypeScript build checks and create the production Vite build. |
| `npm run lint` | Run ESLint with zero warnings allowed. |
| `npm run lint:fix` | Auto-fix ESLint issues where possible. |
| `npm run format` | Format source files with Prettier. |
| `npm run format:check` | Check Prettier formatting. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run check` | Run lint and formatting checks. |
| `npm run preview` | Preview the production build locally. |

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

## Main Directories

- `src/api`: Axios client and API request modules.
- `src/auth`: Session helpers for BFF-backed authentication.
- `src/components`: Reusable UI components.
- `src/hooks`: React hooks.
- `src/pages`: Page-level components.
- `src/schemas`: Zod schemas.
- `src/styles`: CSS, tokens, and utilities.
- `src/types`: Shared TypeScript types.
- `src/utils`: Utility functions.

## Related Services

- BFF: `http://localhost:18082`
- API through BFF: `http://localhost:18082/api`
- Laravel API directly: `http://localhost:18080/api`
- Auth server directly: `http://localhost:18081`
