# Quick Start

[简体中文](Quick-Start-zh-cn) · [Back to Wiki Home](Home-en)

## Requirements

- Node.js `>= 22.12.0`
- npm `>= 10`

## Installation

```bash
git clone https://github.com/mufengyian/astro-newspaper.git your-blog-name
cd your-blog-name
npm install
```

## Configure environment variables

Copy [`.env.example`](../../../.env.example) to `.env`:

```bash
cp .env.example .env
```

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

Notes:

- `PUBLIC_SITE_URL`
  should be configured before deployment.
  It affects canonical URLs, sitemap, RSS, Open Graph, Twitter cards, `hreflang`, and `robots.txt` behavior.
- `PUBLIC_WALINE_SERVER_URL`
  is optional; without it, comments are not rendered.

## Local development

```bash
npm run dev
```

## Pages to review on the first run

- `/`
- `/archive/`
- `/tags/`
- `/search/`
- `/about/`
- `/rss/`
- `/posts/...`
- `/en/`
- `/en/archive/`
- `/en/tags/`
- `/en/search/`
- `/en/about/`

## First customization pass

Start with these files:

1. [`src/config/site.ts`](../../../src/config/site.ts)
   Site title, navigation, pagination, search, comments, media presets, and interaction thresholds.
2. [`src/config/about.ts`](../../../src/config/about.ts)
   About-page content.
3. [`src/config/i18n/`](../../../src/config/i18n)
   Bilingual UI copy.
4. [`src/content/posts/`](../../../src/content/posts)
   Replace the sample posts.
5. [`src/assets/covers/`](../../../src/assets/covers)
   Replace the sample cover assets.
6. [`src/styles/tokens.css`](../../../src/styles/tokens.css)
   Start here if you want to replace the visual system itself.

## Recommended first validation commands

```bash
npm run check
npm run build
```

## Common commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start local development |
| `npm run check` | Run Astro type checks |
| `npm run build` | Build the production output |
| `npm run preview` | Preview the production build |
| `npm run sync` | Sync Astro generated types |

## Next steps

- Continue with [Configuration](Configuration-en)
- If you want to start authoring content, go to [Content and MDX](Content-and-MDX-en)
- If you want to shape the bilingual experience first, go to [i18n](i18n-en)
