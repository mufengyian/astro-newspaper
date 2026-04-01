# newspaper

<p align="center">
  A bilingual Astro blog theme for long-form publishing, focused on stable information architecture, static-first content flows, and a calm editorial reading experience.
</p>

<p align="center">
  <a href="./README.md">简体中文</a> ·
  <a href="./docs/wiki/Home-en.md">Wiki</a> ·
  <a href="./docs/wiki/Home.md">Wiki (ZH)</a>
</p>

## Features

- Bilingual route trees with default `zh-cn` on `/` and English on `/en/`
- Complete page surface: home, pagination, archive, tags, search, about, RSS, 404, and article pages
- Markdown / MDX publishing powered by Astro Content Collections
- Light / dark themes, search, code copy, reading progress, back-to-top, and optional Waline comments
- Homepage `home-info` can be toggled directly from configuration
- Listing pages, article pages, and SEO metadata are structured for static publishing and long-term maintenance

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

### Local development

```bash
npm run dev
npm run check
npm run build
```

## Configuration

### `src/config/site.ts`

The main site-level configuration entry. It includes:

- `navigationItems`: navigation order
- `homeInfo.enabled`: visibility switch for the homepage `home-info`
- `footer`: copyright, ICP, and external footer links
- `featuredCount`: featured-post count on the homepage
- `postsPerPage`: pagination size
- `comments`: Waline defaults
- `socialLinks`: homepage social links

### `src/utils/i18n.ts`

Bilingual UI copy and locale-related helpers.

### `astro.config.mjs`

Astro configuration for i18n, prefetch, Markdown / MDX, Shiki, and image handling.

## Content Model

Example frontmatter:

```yaml
---
title: Hello Astro
excerpt: Use one post to verify the content flow.
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
- `excerpt`: listing summary and base description
- `cover` / `coverAlt`: cover asset and alternative text

## Project Structure

```text
src/
  assets/
  components/
    pages/
  config/
  content/
    posts/
  layouts/
  pages/
  scripts/
  styles/
  utils/
docs/
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
