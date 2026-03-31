---
title: "Cover images, typography, and color modes: how the visual layer stays useful"
excerpt: "This article demonstrates cover handling, Astro image processing, light and dark themes, the WenKai typography preset, and how cards behave with or without media."
publishDate: 2025-12-18
updatedDate: 2025-12-22
locale: en
translationKey: visuals-and-typography
category: Visual System
tags:
  - Images
  - Cover
  - Typography
  - Dark Mode
  - WenKai
cover: ../../assets/covers/craft-wave.svg
coverAlt: A flowing paper-like abstract cover used to represent visual structure and typography.
---

A writing theme can fail visually in two opposite ways:

- it becomes visually noisy and competes with the content
- it becomes so bare that nothing carries identity or pacing

This theme aims for a middle ground where the visual system supports reading without overwhelming it.

## What cover images are doing here

Cover images are not meant to turn the homepage into a poster wall. Their main job is to help readers distinguish article groups at a glance.

You can verify this in several places:

- post cards render differently depending on whether a cover exists
- article pages give the cover more width than the index view
- the same local asset can be rendered in different output contexts

That behavior depends on Astro’s asset pipeline rather than a raw `<img>` tag.

## Why `astro:assets` matters

The `cover` field is validated as an image in the content collection schema. That means:

- incorrect asset paths fail early
- local media participates in the build pipeline
- the templates can render responsive output with `Picture`

This turns images into real content resources instead of loose strings living in frontmatter.

## Typography should stay intentional

The default typography preset is more editorial, with a clearer separation between headings and body text. The theme also supports an optional WenKai preset for a more Chinese-reading-oriented tone.

Changing the preset is intentionally small:

```ts
export const siteConfig = {
  typography: {
    preset: "editorial",
  },
} as const;
```

Current options:

- `editorial`
- `wenkai`

The important implementation detail is that WenKai is now loaded on demand instead of always being bundled.

## Why dark mode belongs in the reading system

For long-form technical content, color mode is not just a visual preference. It affects:

- paragraph contrast
- code block readability
- table legibility
- the perceived weight of borders and panels

That is why the theme switches a larger set of variables instead of only changing the page background.

## Why the demo needs both covered and uncovered posts

Real blogs do not have covers for every article, and they should not have to. A useful demo must therefore show both:

- posts with cover images
- posts without cover images

That is how you can tell whether the card system is structurally sound, not only optimized for the prettiest subset of content.

## A reasonable boundary for visuals in a writing theme

- [x] clear identity without stealing focus from the article body
- [x] good behavior with and without covers
- [x] stable light and dark reading modes
- [x] an alternate typography preset for Chinese-heavy writing
- [x] shared styling logic instead of one-off page treatments

If you want to keep following the visual and interaction layer, the next useful article is [Optional interactions and comments](/en/posts/optional-interactions-and-comments/).
