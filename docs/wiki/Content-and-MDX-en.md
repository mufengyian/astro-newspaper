# Content and MDX

[简体中文](Content-and-MDX-zh-cn) · [Back to Wiki Home](Home-en)

## Content directory

Posts live in:

```text
src/content/posts
```

Both of these are supported:

- `.md`
- `.mdx`

The theme uses Astro Content Collections, so frontmatter is validated by schema before it reaches lists, article pages, RSS, and the search index.

## Current frontmatter fields

```yaml
---
title: Example Post
excerpt: A short summary
publishDate: 2026-04-01
updatedDate: 2026-04-02
draft: false
featured: false
locale: en
translationKey: hello-world
category: Astro
tags:
  - MDX
  - Search
authors:
  - JiU
comments: true
cover: ../../assets/covers/paper-constellation.svg
coverAlt: Cover image description
---
```

## Field reference

- `title`
  Article title.
- `excerpt`
  Used in listing cards, article descriptions, and search summaries.
- `publishDate`
  Publish date.
- `updatedDate`
  Optional; used for article update metadata.
- `draft`
  When `true`, visible only in development.
- `featured`
  Helps homepage ordering prioritize featured posts first.
- `locale`
  Active locale, defaults to `zh-cn`.
- `translationKey`
  Shared mapping key for translated versions.
- `category`
  Optional category used in post metadata and relevance scoring.
- `tags`
  Tag array.
- `authors`
  The schema supports multiple authors, although the default theme UI still centers the site-level author identity.
- `comments`
  Whether comments are enabled for this post.
- `cover`
  Local cover asset.
- `coverAlt`
  Alternative text for the cover.

## When plain Markdown is enough

Regular Markdown is enough if you mainly need:

- headings
- paragraphs
- lists
- tables
- code blocks

## Why MDX still matters

MDX is useful when you want to:

- embed Astro components in articles
- use `Image` / `Picture` with more control
- build callouts, comparisons, and editorial blocks
- keep richer presentation inside the content layer

## Minimal MDX example

```mdx
---
import { Image } from "astro:assets";
import cover from "../../assets/covers/paper-constellation.svg";
---

## Hello MDX

<Image src={cover} alt="Example illustration" widths={[480, 720, 1080]} />
```

## Bilingual post workflow

If the same post exists in both languages, the recommended flow is:

1. write the default-locale version first
2. create the translated post only when it is ready
3. reuse the same `translationKey`

Example:

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

## Disabling comments for one post

```yaml
comments: false
```

Useful for:

- announcements
- standalone informational pages
- reference content where discussion is unnecessary
