# Configuration

[简体中文](Configuration-zh-cn) · [Back to Wiki Home](Home-en)

## Configuration Entry Points

- [`src/config/site.ts`](../../../src/config/site.ts)
- [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)
- [`astro.config.mjs`](../../../astro.config.mjs)
- [`.env.example`](../../../.env.example)

## `src/config/site.ts`

The main theme configuration includes:

- `title`
  Site title.
- `navigationItems`
  Navigation order.
- `typography.preset`
  Typography preset. The current options are `editorial` and `wenkai`.
- `homeInfo.enabled`
  Visibility switch for the homepage `home-info`.
- `footer`
  Copyright, ICP, footer links, and footer labels.
- `featuredCount`
  Number of featured posts on the homepage.
- `postsPerPage`
  Pagination size.
- `comments`
  Waline default options.
- `socialLinks`
  Homepage social links.

## `src/utils/i18n.ts`

It maintains:

- site descriptions
- navigation labels
- search copy
- article-page UI copy
- comments and pagination copy

## `.env`

### `PUBLIC_SITE_URL`

Used for:

- canonical
- Open Graph / Twitter Card
- RSS
- sitemap
- `hreflang`

### `PUBLIC_WALINE_SERVER_URL`

Used for:

- the article-page comment server URL

## `astro.config.mjs`

The current baseline includes:

- default locale `zh-cn`
- `prefixDefaultLocale: false`
- Markdown / MDX support
- `sharp` image processing
