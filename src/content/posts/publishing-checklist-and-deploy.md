---
title: "Publishing checklist and deploy flow: from local draft to production build"
excerpt: "This article turns frontmatter, validation commands, RSS, sitemap, environment variables, and deploy checks into one practical release workflow."
publishDate: 2025-12-12
locale: en
translationKey: publishing-checklist
category: Publishing Workflow
tags:
  - Publishing
  - Deployment
  - Sitemap
  - RSS
  - Checklist
comments: false
cover: ../../assets/covers/paper-constellation.svg
coverAlt: A constellation-like paper cover used to represent a full publishing workflow.
---

Many demos stop at “drop a post into `src/content/posts` and it will render”. A theme that is meant for real publishing should also make the release path visible.

## The minimum path from draft to release

### Fill in the frontmatter properly

At a minimum, a production-ready post should define:

```yaml
---
title: Publishing checklist and deploy flow
excerpt: Explain the value before the body starts.
publishDate: 2025-12-12
locale: en
translationKey: publishing-checklist
category: Publishing Workflow
tags:
  - Publishing
  - Deployment
comments: false
---
```

### Run local validation

```bash
npm run check
PUBLIC_SITE_URL="https://example.com" npm run build
```

The first command validates types, collections, and templates. The second verifies production-only output such as RSS and sitemap.

## Why `PUBLIC_SITE_URL` belongs in your release checks

Without it, the theme intentionally avoids some production SEO output. That is safer than pretending a site URL exists, but it also means your validation workflow should include a build that mirrors a real deployed site.

## Release checklist

- [x] title and excerpt stand on their own
- [x] tags are specific enough for search and related posts
- [x] locale and `translationKey` are correct
- [x] `npm run check` passes
- [x] the build with `PUBLIC_SITE_URL` passes
- [x] Waline is configured if comments are expected

## RSS and sitemap are part of the content system

If the theme already includes RSS and sitemap support, they should be treated as part of normal publishing rather than post-launch extras.

You can think of them like this:

- RSS: delivers updates outward
- sitemap: exposes the structure for discovery

That is why they belong in the validation path from the start.

## Why comments are disabled on this article

This post sets `comments: false` on purpose. It exists to prove that comments are a real per-article decision instead of a hardwired site-wide surface.

That tends to map well to different content types:

- tutorials and discussions: comments on
- policies, checklists, release notes: comments off

## If you use this theme for a real site

It helps to think of publishing in three layers:

1. content: frontmatter and article body
2. build validation: `check` and `build`
3. deploy: GitHub Pages, Vercel, or another static host

When those three layers are healthy, the theme stops being a demo and becomes a dependable writing workflow.
