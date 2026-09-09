# Skills API contract

## Endpoint

`GET /api/skills` returns a JSON array containing the current public, repository-level Skill records.

Cloudflare Pages serves the route through `functions/api/skills.js`. The function reads the generated static snapshot at `/api/skills.json`. Static-only hosts such as GitHub Pages can expose the same snapshot directly at `/api/skills.json`.

Other HTTP methods return `405 Method Not Allowed`.

## Fields

| Field | Current value | Future database mapping |
|---|---|---|
| `id` | Existing stable Skill id | `text primary key` |
| `name` | Public Skill name | `text not null` |
| `category` | Public category label | `text not null` |
| `tags` | Search tags | `text[]` |
| `prompt` | Prompt text extracted from `prompt.md` | `text not null` |
| `workflow` | Ordered workflow steps | `jsonb` or `text[]` |
| `embedding` | `null` until an embedding pipeline is connected | `vector(n)` via pgvector |
| `downloads` | Starts at `0` | `bigint not null default 0` |
| `stars` | `null` until GitHub synchronization is connected | `integer` |
| `version` | Declared repository version | `text not null` |
| `created_time` | Existing creation date normalized to UTC | `timestamptz not null` |

The full response contract is defined in `skills.schema.json`. Supabase can use the PostgreSQL mapping directly; vector search can use its pgvector support. No database connection or credential is required for the current static snapshot.
