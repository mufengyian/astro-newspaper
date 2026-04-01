# Configuration

[简体中文](Configuration-zh-cn) · [Back to Wiki Home](Home-en)

## Configuration Entry Points

The current theme configuration is split into a few layers:

- [`src/config/site.ts`](../../../src/config/site.ts)
  Site-level runtime configuration.
- [`src/config/about.ts`](../../../src/config/about.ts)
  About-page long-form copy and section structure.
- [`src/config/i18n/`](../../../src/config/i18n)
  Locale dictionaries and locale types.
- [`src/styles/tokens.css`](../../../src/styles/tokens.css)
  Design-system tokens.
- [`astro.config.mjs`](../../../astro.config.mjs)
  Astro infrastructure configuration.
- [`.env.example`](../../../.env.example)
  Runtime environment variable example.

## `src/config/site.ts`

This is the main configuration file for day-to-day customization. Current structure:

```ts
export const siteConfig = {
  title: "Newspaper",
  repositoryUrl: "https://github.com/mufengyian/astro-newspaper",
  siteUrl: publicSiteUrl,
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,
  navigationItems,
  assets: { ... },
  seo: { themeColor: { light: "#F5F1E8", dark: "#0F1720" } },
  typography: { preset: "editorial" },
  homeInfo: {
    enabled: true,
  },
  author: { name: "JiU" },
  footer: {
    copyrightYear: 2026,
    owner: { ... },
    icp: { ... },
    poweredBy: { ... },
    theme: { ... },
    labels: { ... },
  },
  comments: { ... },
  socialLinks: [],
  content: { ... },
  search: { ... },
  interactions: { ... },
  media: { ... },
  icons: { ... },
  notFound: { ... },
  capabilities: [...],
}
```

### Common fields

- `title`
  Site name.
- `navigationItems`
  Top navigation order.
- `homeInfo.enabled`
  Visibility toggle for the homepage `home-info` block.
- `footer.owner`
  Footer copyright link.
- `footer.icp`
  ICP label and target URL.
- `footer.poweredBy` / `footer.theme`
  Footer external links.
- `content.featuredCount`
  Number of featured posts on the homepage.
- `content.postsPerPage`
  Pagination size.
- `content.relatedPostsLimit`
  Related-post count.
- `search.*`
  Result count, threshold, and meta separator.
- `comments.*`
  Default Waline settings.
- `media.*`
  Listing and post cover output presets.

## `src/config/about.ts`

The About page uses structured content instead of embedding long copy directly inside components.

Field overview:

- `lead`
  Page intro.
- `sections`
  Array of content sections.
- `sections[].title`
  Section heading.
- `sections[].paragraphs`
  Section body.
- `sections[].list`
  Optional list for capability or metadata groups.

## `src/config/i18n/*`

Locale copy lives in:

- [`src/config/i18n/zh-cn.ts`](../../../src/config/i18n/zh-cn.ts)
- [`src/config/i18n/en.ts`](../../../src/config/i18n/en.ts)

Type definitions live in:

- [`src/config/i18n/types.ts`](../../../src/config/i18n/types.ts)

Recommended workflow:

- update `types.ts` first when adding new fields
- keep `zh-cn` and `en` synchronized
- store theme UI copy here instead of hard-coding it into components

## `src/styles/tokens.css`

Design variables are centralized here, including:

- spacing
- radius
- duration / easing
- typography
- brand / accent / neutral colors
- semantic surfaces / text / border / shadow
- homepage listing-card sizing variables

Start with tokens when reshaping the visual system, then move into component-level CSS only if needed.

## `.env`

### `PUBLIC_SITE_URL`

Used for:

- canonical URLs
- sitemap
- RSS
- Open Graph / Twitter cards
- `hreflang`
- `robots.txt`

### `PUBLIC_WALINE_SERVER_URL`

Used for:

- the article-page comment server URL

Without it, the comment section is not rendered.

## `astro.config.mjs`

Usually only needs changes when you want to:

- add or remove Markdown / MDX plugins
- switch Shiki themes
- extend locales
- change image or build-layer behavior

Current baseline behavior:

- default locale is `zh-cn`
- `prefixDefaultLocale: false`
- `prefetchAll: false`
- image processing uses `sharp`

## Recommended Order

1. Update `src/config/site.ts`
2. Update `src/config/about.ts`
3. Synchronize `src/config/i18n/*`
4. Only then decide whether `astro.config.mjs` needs changes
