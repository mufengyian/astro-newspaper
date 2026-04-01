# Comments and Deployment

[简体中文](Comments-and-Deployment-zh-cn) · [Back to Wiki Home](Home-en)

## Waline comments

The theme uses [Waline](https://waline.js.org/) as an optional comment system.

### How to enable it

Add this to `.env`:

```bash
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

### Where the defaults live

Comment defaults are configured in:

- [`src/config/site.ts`](../../../src/config/site.ts)

Current key fields:

- `meta`: `["nick", "mail", "link"]`
- `requiredMeta`: `["nick", "mail"]`
- `login`: `"enable"`
- `commentSorting`: `"latest"`
- `pageSize`: `10`
- `reaction`: `false`

### Default behavior

- without `PUBLIC_WALINE_SERVER_URL`
  no comment section is rendered
- with `PUBLIC_WALINE_SERVER_URL`
  Waline mounts automatically on article pages

### Disable comments for a single post

```yaml
comments: false
```

## Always verify `PUBLIC_SITE_URL` before deployment

It affects:

- canonical URLs
- sitemap
- RSS
- Open Graph / Twitter cards
- `hreflang`
- `robots.txt`

Without it:

- the site can still build
- but `robots.txt` returns `Disallow: /`
- sitemap stays disabled
- the RSS page renders an unavailable state instead of a broken feed URL

## Recommended deployment checklist

1. `PUBLIC_SITE_URL` points to the real public address
2. `npm run check` passes
3. `npm run build` passes
4. sample posts and covers have been replaced
5. site title, author name, about-page copy, and bilingual UI strings are all real
6. if Waline is enabled, comment mounting, page-switch cleanup, and theme styling have been tested

## Good deployment targets

`newspaper` is a static site and works well on:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- any other static hosting platform

## One practical recommendation

If you do not have the final public domain during local development, leave `PUBLIC_SITE_URL` unset at first.
Once the production address is stable, add it and run one final build verification pass.
