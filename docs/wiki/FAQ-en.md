# FAQ

[简体中文](FAQ-zh-cn) · [Back to Wiki Home](Home-en)

## Is this an installable theme package?

Not really. It is better treated as a starter repository or template repository, so the recommended workflow is to clone it or use it as a template.

## Can I publish only in Chinese?

Yes. The English structure can stay unused for now, although keeping the bilingual directory structure usually makes future expansion easier.

## Can I use only plain Markdown?

Yes. The theme supports both `.md` and `.mdx`. If you do not need component-level composition, plain Markdown is enough.

## Why are homepage social links hidden by default?

Because exposing placeholder handles or placeholder email addresses is neither professional nor safe. The icons appear only after you explicitly fill `siteConfig.socialLinks`.

## Why are RSS and sitemap incomplete without `PUBLIC_SITE_URL`?

That is an intentional safety default. Without the real public address, the theme prefers silence over broken metadata.

## Where should I change the visual language in this version?

Start with [`src/styles/tokens.css`](../../../src/styles/tokens.css) before editing component-level CSS.

## Does the theme default to light mode or dark mode?

It follows the system theme by default. Once the user toggles it manually, the preference is persisted locally.

## Is this a good fit for a documentation site?

It works well for lighter docs, notes, and knowledge-base style sites. If you need deep side navigation, versioning, and a docs-specific information architecture, a dedicated docs framework is still the better tool.
