# FAQ

[简体中文](../zh-cn/FAQ.md) · [Back to Wiki Home](./Home.md)

## Is this an installable package?

Not in the way an Astro integration is. The current positioning is a starter repository, so the recommended workflow is to clone it or use it as a template.

## Can I publish only in one language?

Yes. The second locale can stay unused, although keeping the structure in place is usually the better long-term choice.

## Can I stick to plain Markdown?

Yes. The theme supports both `.md` and `.mdx`. If you do not need components, regular Markdown is completely fine.

## Why are homepage social links hidden by default?

Because shipping public placeholder handles such as `username` or `yourmail` is not a good default. You need to opt in by filling `socialLinks` yourself.

## Why is RSS missing without `PUBLIC_SITE_URL`?

That is a deliberate safety default. The theme should not emit broken feeds, canonical URLs, or sitemaps when it does not know the real public site address.

## Can I swap the typography?

Yes. The theme ships with `editorial` and `wenkai`, and you can extend `typography.preset` further if you want more options.

## Is this a good fit for a documentation site?

It can work for lighter documentation or notes. If you need a full documentation information architecture with versioning and multi-level navigation, a dedicated docs framework may still be the better tool.
