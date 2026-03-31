# Configuration

[简体中文](../zh-cn/Configuration.md) · [Back to Wiki Home](./Home.md)

## Main configuration entry points

The theme is primarily configured through:

- [`src/config.ts`](../../../src/config.ts)
- [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)
- [`.env.example`](../../../.env.example)

## `src/config.ts`

`siteConfig` owns the site-wide defaults:

```ts
export const siteConfig = {
  title: "Newspaper",
  repositoryUrl: "https://github.com/mufengyian/astro-newspaper",
  typography: {
    preset: "editorial",
  },
  author: {
    name: "JiU",
  },
  socialLinks: [],
  featuredCount: 2,
  postsPerPage: 6,
}
```

### Important fields

- `title`
  - site title
- `repositoryUrl`
  - used by README / homepage references
- `typography.preset`
  - currently supports `editorial` and `wenkai`
- `author.name`
  - used in structured data and article metadata
- `socialLinks`
  - the homepage icon row, intentionally empty by default
- `featuredCount`
  - how many featured posts appear first on the homepage
- `postsPerPage`
  - pagination size

## `.env`

### `PUBLIC_SITE_URL`

This powers:

- canonical URLs
- Open Graph / Twitter metadata
- RSS
- sitemap
- `hreflang`

Without it:

- pages still build and render
- `robots.txt` returns `Disallow: /`
- RSS files are skipped
- sitemap is disabled

### `PUBLIC_WALINE_SERVER_URL`

This enables Waline comments.

Without it:

- the comment section is not rendered at all

## `src/utils/i18n.ts`

This is where the theme stores:

- site descriptions
- navigation labels
- button copy
- search strings
- article UI text

Recommended workflow:

- update Chinese and English together
- keep copy centralized here when it belongs to theme UI, not content

## When to touch `astro.config.mjs`

You usually only need it if you want to:

- add or change Markdown / MDX plugins
- switch Shiki themes
- change image processing behavior
- add more locales

If you only want to change the site title, author, pagination, or social links, `src/config.ts` is enough.
