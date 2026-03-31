---
title: "Bilingual routing and translations: only generate pages for content that really exists"
excerpt: "This article demonstrates translationKey, locale switching, canonical URLs, hreflang output, and the theme’s decision to avoid synthetic fallback pages."
publishDate: 2026-03-15
locale: en
translationKey: bilingual-routing
category: Internationalization
tags:
  - i18n
  - translationKey
  - Locale Switch
  - canonical
  - hreflang
cover: ../../assets/covers/tangent-frame.svg
coverAlt: A geometric frame cover used to represent route mapping and translation structure.
---

The bilingual behavior in this theme is not based on duplicating a single article across two URL trees. Chinese and English are treated as two independent route trees that can be connected when real translations exist.

## The default structure

Chinese is the default locale, so it has no URL prefix. English is served under `/en/`.

| Locale | Home | Post | Search |
| --- | --- | --- | --- |
| Chinese | `/` | `/posts/slug/` | `/search/` |
| English | `/en/` | `/en/posts/slug/` | `/en/search/` |

## How translation pairs are connected

The relationship is based on `translationKey`, not on a matching file name and not on a synthetic route guess.

```yaml
locale: zh-cn
translationKey: bilingual-routing
```

```yaml
locale: en
translationKey: bilingual-routing
```

Once two posts share the same `translationKey`, the theme can safely treat them as real translations:

- locale switch links point to the correct counterpart
- alternate / `hreflang` metadata reflects an actual translation pair
- the system does not confuse them with unrelated posts

## Why the theme refuses to create fake translated pages

A common bilingual-blog mistake is generating a secondary-locale page even when the translation does not exist. That usually causes three problems:

1. readers switch languages and land on duplicate content instead of a translation
2. search engines see messy canonical / alternate relationships
3. maintainers believe the bilingual flow is more complete than it really is

This theme takes the stricter route: **only real translations receive localized article pages.**

## How the demo proves it

The rewritten demo intentionally includes both of these:

- proper Chinese/English translation pairs
- locale-specific posts that exist in only one language

That means you can:

- switch between this article and its Chinese counterpart
- inspect locale-exclusive posts that do not generate a fake page on the other side

For example, the English demo also includes a post that exists only in English: [/en/posts/english-only-demo-notes/](/en/posts/english-only-demo-notes/).

## Why this matters for SEO too

Bilingual publishing is not only about the visible language switch. It also needs these production details to stay correct:

- canonical URLs
- `hreflang`
- Open Graph locale values
- structured data timestamps

That is why frontmatter values such as these matter:

```yaml
publishDate: 2026-03-15
updatedDate: 2026-03-20
locale: en
translationKey: bilingual-routing
```

## A practical publishing workflow

The cleanest process is:

1. write the default-locale version first
2. create the second-locale version only when it is actually ready
3. reuse the same `translationKey`
4. let each locale keep its own route wording and headline style

That gives you:

- cleaner route trees
- more honest alternate metadata
- separate titles and excerpts that can be optimized for each language

## Why the demo needs both success cases and edge cases

If a demo only shows perfectly paired translations, it still does not prove:

- whether locale switching truly respects real counterparts
- whether alternates are based on actual content pairs
- whether missing translations are handled safely

This article matters because it helps demonstrate all three.
