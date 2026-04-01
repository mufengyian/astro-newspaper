# Images and astro:assets

[简体中文](Images-and-Assets-zh-cn) · [Back to Wiki Home](Home-en)

## Why the theme prefers `astro:assets`

The current version relies on Astro’s official image pipeline instead of dropping raw source images straight into the UI.

Benefits:

- responsive image generation
- modern formats such as `avif` and `webp`
- build-time processing through `sharp`
- preserved width and height metadata to reduce layout shift
- one consistent media strategy across listing cards and article pages

Official references:

- [Images guide](https://docs.astro.build/en/guides/images/)
- [astro:assets reference](https://docs.astro.build/en/reference/modules/astro-assets/)

## Current image strategy

Media presets are centralized in:

- [`src/config/site.ts`](../../../src/config/site.ts)

There are two main presets:

- `media.listingCover`
  Used by the homepage, pagination pages, and listing cards.
- `media.postCover`
  Used by article detail pages.

If you want to change output sizes, formats, or quality globally, update these presets first instead of editing individual components.

## Cover image usage

Reference a local asset in frontmatter:

```yaml
cover: ../../assets/covers/paper-constellation.svg
coverAlt: Deep blue geometric illustration
```

Listing pages and article pages will automatically use the theme’s existing `Picture` logic.

## Using `Image` inside MDX

```mdx
---
import { Image } from "astro:assets";
import image from "../../assets/covers/signal-grid.svg";
---

<Image
  src={image}
  alt="Signal grid illustration"
  widths={[480, 720, 1080]}
  sizes="(max-width: 768px) 100vw, 720px"
/>
```

## Using `Picture` inside MDX

```mdx
---
import { Picture } from "astro:assets";
import image from "../../assets/covers/craft-wave.svg";
---

<Picture
  src={image}
  alt="Example illustration"
  formats={["avif", "webp"]}
  widths={[480, 720, 1080]}
  sizes="(max-width: 768px) 100vw, 720px"
/>
```

## Practical advice

- prefer local files for cover images
- write clear `alt` text for editorial imagery
- pre-filter extremely large sources to keep builds fast
- keep cover art direction consistent if you want the site to feel intentionally editorial
