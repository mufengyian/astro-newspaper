# newspaper

<p align="center">
  A bilingual Astro blog theme for long-form publishing, built around stable information architecture, restrained client-side enhancements, and an editorial reading experience.
</p>

<p align="center">
  <a href="./README.md">简体中文</a> ·
  <a href="./docs/wiki/Home-en.md">Wiki</a> ·
  <a href="./docs/wiki/Home.md">Wiki (ZH)</a>
</p>

## Features

- Bilingual route trees with default `zh-cn` on `/` and English on `/en/`
- Complete page surface: home, pagination, archive, tags, search, about, RSS, 404, and article pages
- Content workflow powered by Astro Content Collections with Markdown / MDX support
- Light / dark themes, search, code copy, reading progress, back-to-top, and optional Waline comments
- Clean style architecture split into `tokens / base / layout / listing / article / responsive`
- Centralized theme configuration in `src/config/`, including navigation, homepage info, footer data, media presets, and interaction thresholds
- Strong metadata defaults for canonical URLs, `hreflang`, RSS, Open Graph, Twitter cards, and structured data

## Screenshots

> Placeholder assets are already reserved in `docs/readme-assets/`. You can replace those files directly later, or switch the README paths to real PNG/JPG captures.

| Interface | Light Mode | Dark Mode |
| --- | --- | --- |
| Chinese | ![Chinese light placeholder](./docs/readme-assets/home-zh-light.svg) | ![Chinese dark placeholder](./docs/readme-assets/home-zh-dark.svg) |
| English | ![English light placeholder](./docs/readme-assets/home-en-light.svg) | ![English dark placeholder](./docs/readme-assets/home-en-dark.svg) |

## Quick Start

### Requirements

- Node.js `>= 22.12.0`
- npm `>= 10`

### Install

```bash
git clone https://github.com/mufengyian/astro-newspaper.git your-blog-name
cd your-blog-name
npm install
```

### Environment variables

Copy [`.env.example`](./.env.example) to `.env`:

```bash
cp .env.example .env
```

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

Notes:

- `PUBLIC_SITE_URL` powers canonical URLs, sitemap, RSS, Open Graph, Twitter cards, `hreflang`, and `robots.txt`
- `PUBLIC_WALINE_SERVER_URL` is optional; without it, article pages do not render a comment section

### Local development and validation

```bash
npm run dev
npm run check
npm run build
```

## Configuration

### `src/config/site.ts`

The main site-level configuration entry. It covers:

- `navigationItems`: top navigation order
- `homeInfo.enabled`: visibility switch for the homepage `home-info` block
- `footer`: copyright, ICP link, and external footer links
- `content`: featured count, pagination size, and related-post limit
- `search`: search threshold, result count, and meta separator
- `comments`: default Waline options
- `media`: cover output sizes, formats, and quality

### `src/config/about.ts`

Long-form content and section structure for the About page.

### `src/config/i18n/`

Locale dictionaries and type definitions. When adding new UI copy, update `types.ts` first and then both locale files.

### `src/styles/tokens.css`

The main entry for theme variables. Colors, spacing, radius, shadow, motion, and listing-card sizing all live here.

### `astro.config.mjs`

Astro infrastructure config for i18n, prefetch, Markdown / MDX, Shiki, and image handling.

## Content Model

Example frontmatter:

```yaml
---
title: Hello Astro
excerpt: Use one post to validate your publishing flow.
publishDate: 2026-04-01
locale: en
translationKey: hello-astro
tags:
  - astro
  - theme
cover: ../../assets/covers/paper-constellation.svg
coverAlt: Abstract paper constellation cover
---
```

Common fields:

- `locale`: locale of the current post
- `translationKey`: mapping key for bilingual post pairs
- `excerpt`: listing summary and base SEO description
- `cover` / `coverAlt`: cover asset and alternative text

## Project Structure

```text
src/
  assets/
  components/
    pages/
  config/
    i18n/
  content/
    posts/
  layouts/
  pages/
  scripts/
  styles/
  utils/
docs/
  readme-assets/
  wiki/
public/
astro.config.mjs
```

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start local development |
| `npm run check` | Run Astro type checks |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run sync` | Sync Astro generated types |

## Documentation

- [Wiki Home](./docs/wiki/Home-en.md)
- [Quick Start](./docs/wiki/Quick-Start-en.md)
- [Configuration](./docs/wiki/Configuration-en.md)
- [Content and MDX](./docs/wiki/Content-and-MDX-en.md)
- [Images and astro:assets](./docs/wiki/Images-and-Assets-en.md)
- [i18n](./docs/wiki/i18n-en.md)
- [Comments and Deployment](./docs/wiki/Comments-and-Deployment-en.md)
- [FAQ](./docs/wiki/FAQ-en.md)

## Acknowledgements

Inspired by [Paper](https://github.com/nanxiaobei/hugo-paper), [PaperMod](https://github.com/adityatelange/hugo-PaperMod), [astro-paper](https://github.com/satnaing/astro-paper), and [fuwari](https://github.com/saicaca/fuwari).

## License

MIT. See [LICENSE](./LICENSE).
