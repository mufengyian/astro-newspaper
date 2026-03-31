# Comments and Deployment

[简体中文](../zh-cn/Comments-and-Deployment.md) · [Back to Wiki Home](./Home.md)

## Waline comments

The theme uses [Waline](https://waline.js.org/) as an optional comment system.

### Enable it

Add this to `.env`:

```bash
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

### Default behavior

- no `PUBLIC_WALINE_SERVER_URL`
  - no comment section is rendered
- valid `PUBLIC_WALINE_SERVER_URL`
  - article pages load Waline automatically

### Disable comments for a single post

```yaml
comments: false
```

### Current defaults

Defined in [`src/config.ts`](../../../src/config.ts):

- `meta`: `["nick", "mail", "link"]`
- `requiredMeta`: `["nick", "mail"]`
- `login`: `"enable"`
- `commentSorting`: `"latest"`
- `pageSize`: `10`
- `reaction`: `false`

## Deployment checklist

Before going live, make sure:

1. `PUBLIC_SITE_URL` is set
2. `npm run check` passes
3. `npm run build` passes
4. sample posts and sample covers are replaced
5. author name, site title, and descriptions reflect the real project

## Recommended platforms

`newspaper` works well on:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- any static host backed by object storage or a CDN

## Why `PUBLIC_SITE_URL` matters

It affects:

- canonical URLs
- Open Graph
- Twitter cards
- RSS
- sitemap
- `hreflang`

Without a real public site address, the theme intentionally prefers silence over broken metadata.
