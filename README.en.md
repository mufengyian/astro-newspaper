# newspaper

[简体中文 README](./README.md) | [English Wiki](./docs/wiki/en/Home.md) | [中文 Wiki](./docs/wiki/zh-cn/Home.md) | [Wiki Source](./docs/wiki/README.md)

`newspaper` is an Astro blog theme starter built for calm, long-form publishing. It prioritizes reading, archives, search, multilingual structure, and maintainability over decorative complexity, making it a good fit for personal blogs, technical writing, project journals, and slow-growing knowledge sites.

The theme draws inspiration from [Paper](https://github.com/nanxiaobei/hugo-paper) and [PaperMod](https://github.com/adityatelange/hugo-PaperMod), while also learning from [astro-paper](https://github.com/satnaing/astro-paper) and [fuwari](https://github.com/saicaca/fuwari). It is not a direct port of any of them; it is a fresh Astro-native implementation with a similar editorial temperament.

## Design goals

- Reading first: the homepage, archive, tags, search, and article pages all serve the writing.
- Astro native: the theme leans on [Content Collections](https://docs.astro.build/en/guides/content-collections/), [i18n](https://docs.astro.build/en/guides/internationalization/), [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/), [astro:assets](https://docs.astro.build/en/reference/modules/astro-assets/), and [View Transitions](https://docs.astro.build/en/guides/view-transitions/).
- Safe defaults: no production SEO metadata without a real public site URL, and no comment UI without a Waline server URL.
- Built to last: the feature set stays focused so the theme can support years of writing without feeling heavy.

## Features

- Bilingual structure built around `zh-cn` and `en`
- `astro:content` collections with support for both `.md` and `.mdx`
- Local responsive images powered by `astro:assets` + `sharp`
- Homepage, pagination, archive, tags, search, about page, 404, and RSS
- Reading progress, table of contents, copyable code blocks, back-to-top, and view transitions
- Light and dark themes
- Optional Waline comments
- Configurable typography presets with `editorial` and `wenkai`

## Who this is for

- Writers who want to start publishing quickly without building a CMS first
- People who need a clean bilingual blog structure
- Teams or individuals who prefer restrained design and long-term maintainability
- Anyone who likes the atmosphere of Paper / PaperMod but wants an Astro-native codebase

## Who this is not for

- Users looking for a CMS, dashboard, or multi-editor workflow
- Projects that expect an `astro add` integration instead of a starter repository
- Heavily animated landing pages or app-like frontends

## Quick start

> `newspaper` is a starter repository. The intended workflow is to clone it or use GitHub’s “Use this template”, not to treat it as an installable integration package.

### Requirements

- Node.js `>= 22.12.0`
- npm `>= 10`

### 1. Install dependencies

```bash
npm install
```

### 2. Prepare environment variables

Copy [`.env.example`](./.env.example) to `.env` and start with:

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

What these do:

- `PUBLIC_SITE_URL`
  - Strongly recommended for production.
  - Without it, the theme intentionally disables canonical metadata, Open Graph, Twitter cards, RSS output, and sitemap generation, and `robots.txt` will return `Disallow: /`.
- `PUBLIC_WALINE_SERVER_URL`
  - Optional.
  - Without it, article pages simply do not render the comment section.

### 3. Start development

```bash
npm run dev
```

Default address:

```text
http://localhost:4321
```

### 4. Useful commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run check` | Run Astro type checks |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run sync` | Sync content collection types |

## What to change first

The theme runs out of the box, but before publishing you should replace at least the following:

1. site title, author name, typography, and pagination in [`src/config.ts`](./src/config.ts)
2. UI copy in [`src/utils/i18n.ts`](./src/utils/i18n.ts)
3. real environment variables from [`.env.example`](./.env.example)
4. sample posts in [`src/content/posts`](./src/content/posts)
5. sample covers in [`src/assets/covers`](./src/assets/covers)
6. `siteConfig.socialLinks` if you want homepage social links

## Project structure

```text
.
├─ public/                # favicon and other public assets
├─ src/
│  ├─ assets/             # local covers and images
│  ├─ components/         # UI components
│  ├─ content/            # Markdown / MDX content
│  ├─ layouts/            # page layouts
│  ├─ pages/              # routes
│  ├─ styles/             # global styles
│  ├─ utils/              # i18n, routing, post utilities
│  ├─ config.ts           # site-wide configuration
│  └─ content.config.ts   # content schema
├─ docs/wiki/             # versioned bilingual wiki source
├─ astro.config.mjs       # Astro configuration
├─ README.md              # Chinese README
├─ README.en.md           # English README
└─ .env.example           # environment variable example
```

## Core configuration

### 1. `src/config.ts`

This is the main site-level configuration file. The fields you will usually touch first are:

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

Field notes:

- `title`: site title
- `typography.preset`: typography preset, currently `editorial` or `wenkai`
- `author.name`: used in article metadata and structured data
- `socialLinks`: homepage icon row, intentionally empty by default
- `featuredCount`: number of featured posts shown first on the homepage
- `postsPerPage`: pagination size

### 2. `src/utils/i18n.ts`

This file owns:

- site descriptions
- navigation labels
- button labels
- search strings
- article page UI copy

Even if you only publish in one language, keeping the second locale structure in place makes future expansion much easier.

### 3. `astro.config.mjs`

The current setup enables:

- MDX
- remark-gfm
- sitemap, only when `PUBLIC_SITE_URL` is available
- the official `sharp` image service
- Astro i18n routing
- link prefetching
- Shiki code highlighting

## Writing content

All posts live under [`src/content/posts`](./src/content/posts) and can be written in either `.md` or `.mdx`.

The schema is defined in [`src/content.config.ts`](./src/content.config.ts). The primary frontmatter fields are:

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | Yes | Post title |
| `excerpt` | Yes | Excerpt used in lists and metadata |
| `publishDate` | Yes | Publication date |
| `updatedDate` | No | Update date |
| `draft` | No | Draft flag, defaults to `false` |
| `featured` | No | Whether the post is featured |
| `locale` | No | `zh-cn` or `en`, defaults to `zh-cn` |
| `translationKey` | No | Shared key between translated versions |
| `category` | No | Category label |
| `tags` | No | Tag list |
| `authors` | No | Author list, defaults to `["JiU"]` |
| `comments` | No | Toggle comments for a single post, defaults to `true` |
| `cover` | No | Local cover image |
| `coverAlt` | No | Accessible alt text for the cover |

Minimal example:

```md
---
title: Hello Astro
excerpt: A first post to confirm the theme is ready for writing.
publishDate: 2026-03-31
locale: en
translationKey: hello-astro
tags:
  - Astro
  - Writing
---

This is a brand-new post.
```

## MDX and `astro:assets`

The theme includes [MDX support](https://docs.astro.build/en/guides/integrations-guide/mdx/) by default, so you can write regular Markdown or import components and local assets inside a post.

```mdx
---
import { Image } from "astro:assets";
import cover from "../../assets/covers/paper-constellation.svg";
---

<Image src={cover} alt="Example illustration" widths={[480, 720, 1080]} />
```

Why `astro:assets` is worth using:

- it generates responsive image markup and `srcset`
- it processes local assets at build time with `sharp`
- it can emit modern formats such as `webp` and `avif`
- it preserves width and height data to reduce layout shift

For more detailed guidance, go straight to the wiki:

- [English: Content and MDX](./docs/wiki/en/Content-and-MDX.md)
- [English: Images and astro:assets](./docs/wiki/en/Images-and-Assets.md)

## i18n

The theme currently ships with two locales:

- `zh-cn`
- `en`

Routes look like this:

- Chinese homepage: `/`
- English homepage: `/en/`
- Chinese post: `/posts/slug/`
- English post: `/en/posts/slug/`

Use a shared `translationKey` to connect translated versions:

```yaml
locale: zh-cn
translationKey: hello-world
```

```yaml
locale: en
translationKey: hello-world
```

That shared key makes future language switching and fallbacks much easier to reason about.

## Waline comments

The theme is already wired for [Waline](https://waline.js.org/), but it stays quiet until you provide a server URL.

### When comments appear

- no `PUBLIC_WALINE_SERVER_URL`
  - no comment section is rendered
- valid `PUBLIC_WALINE_SERVER_URL`
  - Waline loads automatically on article pages

### Disable comments for a single post

```yaml
comments: false
```

### Current default comment settings

The defaults live in [`src/config.ts`](./src/config.ts):

- `meta`: `["nick", "mail", "link"]`
- `requiredMeta`: `["nick", "mail"]`
- `login`: `"enable"`
- `commentSorting`: `"latest"`
- `pageSize`: `10`
- `reaction`: `false`

## Deployment

`newspaper` is a static-first theme, so it works well on:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- any static hosting setup backed by object storage or a CDN

Before deploying:

1. set `PUBLIC_SITE_URL`
2. run `npm run check`
3. run `npm run build`
4. replace sample posts, covers, and author details

If you plan to publish this as a public theme repository, it is also worth adding:

- repository screenshots
- GitHub Topics
- a published GitHub Wiki homepage

## FAQ

### Is this a package or a starter repository?

It is a starter repository first. The recommended workflow is to clone it or use it as a template.

### Why are RSS and sitemap disabled without `PUBLIC_SITE_URL`?

Because the theme should not emit broken canonical URLs, feeds, or sitemaps when it does not know the real public site address.

### Can I use plain Markdown without MDX?

Yes. The theme supports both `.md` and `.mdx`. If you do not need components, regular Markdown is completely fine.

### Can I publish only in one language?

Yes. The second locale can remain unused, although keeping the structure in place is usually the better long-term choice.

## Further documentation

- [English Wiki Home](./docs/wiki/en/Home.md)
- [中文 Wiki 首页](./docs/wiki/zh-cn/Home.md)
- [Wiki Source](./docs/wiki/README.md)
- [Astro docs](https://docs.astro.build/en/)
- [Astro Themes](https://astro.build/themes/)

## Acknowledgements and license

`newspaper` is released under the [MIT License](./LICENSE).

It would not exist in its current form without these projects:

- [Paper](https://github.com/nanxiaobei/hugo-paper)
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- [astro-paper](https://github.com/satnaing/astro-paper)
- [fuwari](https://github.com/saicaca/fuwari)
- [Astro](https://astro.build/)

If you build on top of this theme, you are welcome to keep those acknowledgements in place, then make it your own through your own writing, structure, and visual judgment.
