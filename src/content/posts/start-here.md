---
title: "Start Here: a full tour of the newspaper theme and Astro workflow"
excerpt: "This article turns the demo into a real validation pass for bilingual routing, table of contents, search, tags, pagination, related posts, and Astro-native content tooling."
publishDate: 2026-03-31
updatedDate: 2026-03-31
featured: true
locale: en
translationKey: theme-overview
category: Theme Tour
tags:
  - Astro
  - newspaper
  - Demo
  - i18n
  - TOC
cover: ../../assets/covers/paper-constellation.svg
coverAlt: An abstract paper-like constellation cover used for the main theme overview article.
---

This is not a placeholder “welcome to your new blog” post. It is a deliberate demo article meant to validate the theme as an actual publishing system.

By reading this one page, you are already exercising all of the following:

- breadcrumbs, title, excerpt, and article metadata
- auto-generated table of contents
- reading progress
- copyable code blocks
- tags, related posts, and previous/next navigation
- bilingual routing and locale switching
- search, archive, tag pages, and RSS as discovery paths

If you are evaluating this repository as a starter, read this article first, then continue with [MDX and Astro components](/en/posts/mdx-and-astro-components/) and [Bilingual routing and translations](/en/posts/bilingual-routing-and-translations/).

## What this article is validating

### 1. Long-form reading

The post layout is intentionally restrained. It keeps the essentials in place without pulling attention away from the article body.

As you scroll, you can verify three things immediately:

1. the reading progress bar updates
2. the table of contents is generated from real headings
3. related posts are derived from category and tag overlap

### 2. Content structure over isolated page polish

This theme does not treat the homepage as a one-off landing page. It treats the homepage, pagination, archive, tags, and search as one connected reading system.

That becomes more obvious in a structure like this:

| Route | Purpose | Best used when |
| --- | --- | --- |
| `/en/` | Home | You want the newest writing |
| `/en/page/2/` | Pagination | The first page is no longer enough |
| `/en/archive/` | Archive | You remember the year, not the title |
| `/en/tags/` | Tag index | You want to browse by topic |
| `/en/search/` | Search | You already have a keyword in mind |
| `/en/rss/` | RSS page | You want a feed entry point |

### 3. A demo only matters if real content pressure exists

With a single “Hello World” article, most theme features never get stressed:

- pagination never appears
- related posts are meaningless
- search has no density
- bilingual switching proves nothing

That is why this demo rewrite intentionally includes:

- real Chinese/English translation pairs
- locale-specific posts that exist in only one language
- both Markdown and MDX articles
- posts with and without covers
- posts with comments enabled or disabled
- enough dates, tags, and categories to make archive and tags worth visiting

## Which parts are powered directly by Astro

This theme tries hard to use Astro’s native capabilities instead of re-implementing them in theme-specific abstractions.

### Content collections

All posts are validated through `astro:content`, which means incorrect frontmatter is caught early.

```ts
const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      publishDate: z.coerce.date(),
      locale: z.enum(LOCALES).default("zh-cn"),
      translationKey: z.string().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
    }),
});
```

### MDX

Standard Markdown covers most publishing needs. MDX is reserved for cases where the article genuinely benefits from imported Astro components or local assets.

### `astro:assets`

Cover images and local media go through Astro’s asset pipeline, which lets the theme render responsive media from build-time-known assets.

### Routing, locales, and alternate metadata

Astro handles the route structure, while the theme maps real translation pairs into locale switching, canonical URLs, and `hreflang` output.[^alternate]

[^alternate]: Only real translations become alternates. Missing translations are not replaced by synthetic fallback pages.

## This page is also showing smaller details

### Copyable code blocks

Use the next code block to quickly verify the copy button:

```bash
npm install
npm run check
PUBLIC_SITE_URL="https://example.com" npm run build
```

### Quote styling

> The real test for a writing theme is not whether the homepage looks polished. It is whether readers can still find things after you have published for months or years.

### Task lists

- [x] show the table of contents
- [x] show code block copy
- [x] show tags and related posts
- [x] show the structure needed for pagination and archive
- [x] show real bilingual article relationships

## Where to go next

If this is your first pass through the demo, a good reading order is:

1. [MDX and Astro components](/en/posts/mdx-and-astro-components/)
2. [Search, archive, and tags](/en/posts/search-archive-and-tags/)
3. [Bilingual routing and translations](/en/posts/bilingual-routing-and-translations/)
4. [Cover images and typography](/en/posts/cover-images-and-typography/)
5. [Publishing checklist and deploy flow](/en/posts/publishing-checklist-and-deploy/)

At that point, the demo is no longer just “running”. It is proving that the theme can actually support sustained writing.
