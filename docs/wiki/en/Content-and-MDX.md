# Content and MDX

[简体中文](../zh-cn/Content-and-MDX.md) · [Back to Wiki Home](./Home.md)

## Content directory

Posts live in:

```text
src/content/posts
```

Both of these are supported:

- `.md`
- `.mdx`

## Frontmatter fields

The main fields look like this:

```yaml
title: Example Post
excerpt: A short summary
publishDate: 2026-03-31
updatedDate: 2026-04-01
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
```

## Writing in plain Markdown

Regular Markdown is perfect if you only need article structure and code blocks:

````md
## Section heading

This is a paragraph.

```ts
console.log("hello");
```
````

## Why MDX is still useful

MDX helps when you want to:

- embed Astro components inside a post
- customize image presentation
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

## Multilingual writing

Use the same `translationKey` for translated versions of the same post:

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

## Disabling comments per post

```yaml
comments: false
```

That is useful for:

- standalone pages
- announcements
- reference content where discussion is unnecessary
