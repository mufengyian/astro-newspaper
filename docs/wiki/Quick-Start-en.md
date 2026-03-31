# Quick Start

[简体中文](Quick-Start-zh-cn) · [Back to Wiki Home](Home-en)

## Requirements

- Node.js `>= 22.12.0`
- npm `>= 10`

## Installation

### 1. Get the project

Clone the repository or use GitHub’s “Use this template”.

### 2. Install dependencies

```bash
npm install
```

### 3. Copy environment variables

Copy [`.env.example`](../../../.env.example) to `.env`, then fill in the values you need:

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

Notes:

- `PUBLIC_SITE_URL` is important for production SEO and feeds
- `PUBLIC_WALINE_SERVER_URL` is optional, and comments stay hidden without it

### 4. Start the dev server

```bash
npm run dev
```

Open:

```text
http://localhost:4321
```

## What to replace first

The first round of cleanup usually looks like this:

1. update site title, author, typography, and pagination in [`src/config.ts`](../../../src/config.ts)
2. update UI copy in [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)
3. replace sample posts in [`src/content/posts`](../../../src/content/posts)
4. replace sample covers in [`src/assets/covers`](../../../src/assets/covers)
5. add your real `.env` values

## Common commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start local development |
| `npm run check` | Run Astro type checks |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run sync` | Sync content collection types |

## First QA pass

Before you start writing seriously, it is worth checking these routes:

- `/`
- `/archive/`
- `/tags/`
- `/search/`
- `/about/`
- `/posts/...`
- `/en/`
- `/en/posts/...`

That catches most routing, i18n, cover image, and comment setup issues early.
