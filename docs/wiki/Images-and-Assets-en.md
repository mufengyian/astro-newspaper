# Images and astro:assets

[简体中文](Images-and-Assets-zh-cn) · [Back to Wiki Home](Home-en)

## Why the theme uses `astro:assets`

The theme relies on Astro’s official image pipeline instead of pushing raw external images straight into the UI.

Benefits:

- responsive image generation
- modern output formats such as `webp` and `avif`
- build-time processing with `sharp`
- preserved width and height metadata to reduce layout shift

Official references:

- [Images guide](https://docs.astro.build/en/guides/images/)
- [astro:assets reference](https://docs.astro.build/en/reference/modules/astro-assets/)

## Cover images

Use a local image in frontmatter:

```yaml
cover: ../../assets/covers/paper-constellation.svg
coverAlt: Deep blue geometric illustration
```

The homepage cards and article pages will use the same cover rendering logic automatically.

## Using `Image` in MDX

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

## Using `Picture` in MDX

If you want explicit multi-format output:

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
- always write meaningful `alt` text for editorial images
- pre-filter extremely large source files to keep builds fast
- keep the visual style of covers consistent if you want the site to feel editorial rather than random
