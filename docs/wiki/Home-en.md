# newspaper Wiki

[简体中文](Home) · [Back to README](../../../README.en.md)

`newspaper` is a bilingual Astro blog theme for long-form publishing, technical writing, project logs, and structured archives. It keeps the stack static-first, configuration-driven, and intentionally light on client-side enhancements.

## Documentation Map

- [Quick Start](Quick-Start-en)
- [Configuration](Configuration-en)
- [Content and MDX](Content-and-MDX-en)
- [Images and astro:assets](Images-and-Assets-en)
- [i18n](i18n-en)
- [Comments and Deployment](Comments-and-Deployment-en)
- [FAQ](FAQ-en)

## Theme Capabilities

- Ships with home, pagination, archive, tags, search, about, RSS, 404, and article pages
- Supports separate `zh-cn` and `en` route trees, with `translationKey` used for bilingual post mapping
- Organizes styles into `tokens / base / layout / listing / article / responsive`
- Centralizes site settings, about-page content, and locale dictionaries in `src/config/`
- Keeps comments, search, theme switching, code copy, reading progress, and back-to-top isolated into dedicated scripts

## Suggested Reading Order

1. [Quick Start](Quick-Start-en)
2. [Configuration](Configuration-en)
3. [Content and MDX](Content-and-MDX-en)
4. [i18n](i18n-en)
5. [Comments and Deployment](Comments-and-Deployment-en)

## Core Directories

- `src/config/site.ts`
  Site title, navigation, homepage info, footer data, comments, search, media presets, and interaction thresholds.
- `src/config/about.ts`
  About-page long-form copy and structure.
- `src/config/i18n/*`
  Locale dictionaries and locale type definitions.
- `src/components/pages/*`
  Reusable page implementations.
- `src/styles/*`
  Design tokens and the global style system.
- `src/scripts/*`
  Client-side enhancement scripts.

## Maintenance Entry Points

- Update site settings in `src/config/site.ts`
- Update UI copy in `src/config/i18n/*`
- Update visual variables in `src/styles/tokens.css`
- Update content structure in `src/content/posts/*`
