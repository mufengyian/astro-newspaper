# newspaper Wiki

[简体中文](Home) · [Back to README](../../../README.en.md)

`newspaper` is a bilingual Astro blog theme for long-form publishing, technical writing, project logs, and structured archives. The theme keeps the stack static-first, configuration-driven, and intentionally light on client-side enhancements.

## Documentation Map

- [Quick Start](Quick-Start-en)
- [Configuration](Configuration-en)
- [Content and MDX](Content-and-MDX-en)
- [Images and astro:assets](Images-and-Assets-en)
- [i18n](i18n-en)
- [Comments and Deployment](Comments-and-Deployment-en)
- [FAQ](FAQ-en)

## Theme Structure

- Page surface: home, pagination, archive, tags, search, about, RSS, 404, and article pages
- Content layer: Markdown / MDX publishing powered by Astro Content Collections
- Configuration layer: `src/config/site.ts` and `src/utils/i18n.ts`
- Style layer: `tokens / base / layout / listing / article / responsive`
- Interaction layer: theme switching, search, code copy, reading progress, back-to-top, and Waline

## Core Directories

- `src/config/site.ts`
  Site title, navigation, homepage info, footer data, comments, pagination, and social links.
- `src/utils/i18n.ts`
  Bilingual copy and locale helpers.
- `src/components/pages/*`
  Page implementation layer.
- `src/styles/*`
  Design tokens and global styles.
- `src/scripts/*`
  Client-side enhancement scripts.
