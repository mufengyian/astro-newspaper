# newspaper

[简体中文 README](./README.md) | [Chinese Docs](./docs/wiki/zh-cn/Home.md) | [English Wiki](https://github.com/mufengyian/astro-newspaper/wiki)

`newspaper` is an Astro blog theme starter for long-form publishing, personal blogs, technical writing, project journals, and bilingual content. It borrows the calm reading atmosphere of [Paper](https://github.com/nanxiaobei/hugo-paper) and [PaperMod](https://github.com/adityatelange/hugo-PaperMod) while staying close to Astro’s native feature set.

## Demo

- Live demo: <https://mufengyian.github.io/astro-newspaper/>
- Demo branch: [`demo`](https://github.com/mufengyian/astro-newspaper/tree/demo)

The demo site is deployed automatically to GitHub Pages from the `demo` branch through GitHub Actions.

## Features

- bilingual `zh-cn` / `en` structure
- `astro:content` collections
- Markdown and MDX support
- local responsive images with `astro:assets` + `sharp`
- homepage, pagination, archive, tags, search, about, 404, and RSS
- table of contents, reading progress, copyable code blocks, back-to-top, and view transitions
- light and dark themes
- optional Waline comments

## Quick start

Requirements:

- Node.js `>= 22.12.0`
- npm `>= 10`

Install dependencies:

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env
```

Run locally:

```bash
npm run dev
```

Useful commands:

| Command | Action |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run check` | Run Astro type checks |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |

## What to replace first

- [`src/config.ts`](./src/config.ts): site title, author, typography, pagination, social links
- [`src/utils/i18n.ts`](./src/utils/i18n.ts): Chinese and English UI copy
- [`.env.example`](./.env.example): public site URL and Waline server URL
- [`src/content/posts`](./src/content/posts): sample posts
- [`src/assets/covers`](./src/assets/covers): sample covers

## Environment variables

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

Notes:

- Without `PUBLIC_SITE_URL`, the theme intentionally skips production SEO metadata, RSS, and sitemap output.
- Without `PUBLIC_WALINE_SERVER_URL`, article pages do not render the comment section.

## Writing

Posts live under [`src/content/posts`](./src/content/posts) and support both `.md` and `.mdx`.

Minimal frontmatter example:

```md
---
title: Hello Astro
excerpt: A short post to confirm the theme is ready for writing.
publishDate: 2026-03-31
locale: en
translationKey: hello-astro
---

This is a new post.
```

For full guides on configuration, MDX, images, i18n, comments, and deployment, go straight to the wiki.

## Docs

- GitHub Wiki: <https://github.com/mufengyian/astro-newspaper/wiki>
- In-repo docs source: [`docs/wiki/zh-cn`](./docs/wiki/zh-cn) / [`docs/wiki/en`](./docs/wiki/en)
- Astro docs: <https://docs.astro.build/en/>
- Astro Themes: <https://astro.build/themes/>

## License and acknowledgements

- License: [MIT](./LICENSE)
- Inspirations:
  - [Paper](https://github.com/nanxiaobei/hugo-paper)
  - [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
  - [astro-paper](https://github.com/satnaing/astro-paper)
  - [fuwari](https://github.com/saicaca/fuwari)
