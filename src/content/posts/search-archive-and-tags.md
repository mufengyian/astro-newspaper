---
title: "Search, archive, and tags: how the theme helps readers recover content later"
excerpt: "This article demonstrates the relationship between the search index, archive grouping, tag pages, related posts, and RSS as one discovery system."
publishDate: 2026-03-22
locale: en
translationKey: discovery-workflow
category: Discovery
tags:
  - Search
  - Archive
  - Tags
  - RSS
  - SEO
cover: ../../assets/covers/craft-wave.svg
coverAlt: A flowing abstract cover used to represent discovery paths and content movement.
---

When a site has only a few posts, the homepage is almost enough. As the archive grows, the real quality bar shifts from “does the homepage look nice?” to “can readers find things again?”

## Search solves “I know roughly what I am looking for”

The search page in this theme uses a static index generated at build time. By default it includes:

- title
- excerpt
- category
- tags
- plain-text body content
- published label
- reading-time label

The resulting structure looks roughly like this:

```json
{
  "title": "Search, archive, and tags",
  "excerpt": "Demonstrates discovery paths in the theme.",
  "category": "Discovery",
  "tags": ["Search", "Archive", "Tags"],
  "url": "/en/posts/search-archive-and-tags/",
  "publishedLabel": "Mar 22, 2026",
  "readingMinutesLabel": "4 min read",
  "body": "When a site has only a few posts, the homepage is almost enough."
}
```

That means readers can search not only by title, but also by tags, category names, and body concepts.

## Archive solves “I remember the year, not the headline”

Archive pages become especially useful when:

1. you know the article is older, but not old enough to remember exactly
2. you want to revisit a specific phase of your writing
3. you want to see whether the site has real publishing continuity

The rewritten demo intentionally spreads posts across 2026, 2025, and 2024 so the archive page has a meaningful time structure instead of a single flat bucket.

## Tags solve “I want to continue along one topic”

Search and tags are related, but they do different jobs:

- search is direct retrieval
- tags are guided exploration

If you finish this article and want to keep following the discovery system, the most useful topic entry points are:

- `Search`
- `Archive`
- `Tags`
- `SEO`

Tags also improve the related-posts module, because related content is scored from category and tag overlap.

## RSS solves “I do not want to manually come back and check”

Discovery does not end inside the site. RSS is the route that lets updates move outward to a reader’s subscription workflow.

If the demo is configured correctly, you should be able to find:

- `/rss/`
- `/rss.xml`
- `/en/rss/`
- `/en/rss.xml`

That is what turns the theme into a real publishing surface instead of a static set of pages.

## Search, archive, tags, and SEO are one chain

From a user perspective these look like separate pages. From a content-system perspective they all depend on the same structured post data.

| Capability | Main fields | Main benefit |
| --- | --- | --- |
| Search | title, excerpt, body, tags, category | fast retrieval |
| Archive | publish date | time-based browsing |
| Tags | tag array | topic-based browsing |
| Related posts | tags + category | deeper reading paths |
| RSS | title, excerpt, URL, publish date | external subscription |

## Why the demo must make these pages real

If the demo contains only a few disconnected posts:

- search barely finds anything
- tags have no density
- related posts feel random
- archive has no time structure

That is why this demo rewrite is designed as a connected content set rather than a handful of isolated placeholders.

## How to verify the behavior

- visit [search](/en/search/) and try searching for `translationKey`
- open [tags](/en/tags/) and inspect `Search`, `Archive`, and `SEO`
- use the archive page to jump between years
- scroll to the related posts section at the bottom of this article

Once those routes have meaningful data behind them, the theme starts proving its value in a much more durable way.
