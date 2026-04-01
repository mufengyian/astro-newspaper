# Comments and Deployment

[简体中文](Comments-and-Deployment-zh-cn) · [Back to Wiki Home](Home-en)

## Waline Comments

The theme supports Waline as an optional comment system.

### Environment Variable

```bash
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

### Disable Comments for a Single Post

```yaml
comments: false
```

### Default Configuration Location

The `comments` field in [`src/config/site.ts`](../../../src/config/site.ts):

- `meta`
- `requiredMeta`
- `login`
- `commentSorting`
- `pageSize`
- `reaction`

## Deployment Checklist

- `PUBLIC_SITE_URL` is configured
- `npm run check` passes
- `npm run build` passes
- sample posts, covers, and author information are replaced

## Static Hosting

The theme can be deployed to any static host, including:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
