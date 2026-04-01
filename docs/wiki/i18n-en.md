# i18n

[简体中文](i18n-zh-cn) · [Back to Wiki Home](Home-en)

## Built-in Locales

- `zh-cn`
- `en`

The default locale is `zh-cn`, and the default locale has no URL prefix.

## Route Structure

- Chinese homepage: `/`
- English homepage: `/en/`
- Chinese post: `/posts/<slug>/`
- English post: `/en/posts/<slug>/`
- Chinese search: `/search/`
- English search: `/en/search/`

## Copy Location

Site-level bilingual copy is centralized in [`src/utils/i18n.ts`](../../../src/utils/i18n.ts).

## Bilingual Posts

Bilingual posts are paired through the same `translationKey`.

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

## Current Behavior

- article pages are generated only for locales that actually exist
- locale switching prefers the matched translated post
- alternate metadata is generated from the real translation pair
