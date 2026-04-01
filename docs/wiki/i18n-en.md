# i18n

[简体中文](i18n-zh-cn) · [Back to Wiki Home](Home-en)

## Built-in locales

- `zh-cn`
- `en`

The default locale is `zh-cn`, and it does not use a URL prefix.

## Current route structure

- Chinese homepage: `/`
- English homepage: `/en/`
- Chinese post: `/posts/<slug>/`
- English post: `/en/posts/<slug>/`
- Chinese search: `/search/`
- English search: `/en/search/`

## Where the locale copy lives

Site-level bilingual copy now lives in:

- [`src/config/i18n/zh-cn.ts`](../../../src/config/i18n/zh-cn.ts)
- [`src/config/i18n/en.ts`](../../../src/config/i18n/en.ts)
- [`src/config/i18n/types.ts`](../../../src/config/i18n/types.ts)

`src/utils/i18n.ts` is now mainly responsible for locale resolution and helpers instead of storing the full dictionaries.

## How to write bilingual posts

The safest pattern is:

1. write one Chinese post
2. write one English post
3. give them the same `translationKey`

Example:

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

## Current theme behavior

- article pages are generated only for locales that actually exist
- locale switching prefers the matched translated post
- alternate metadata and `hreflang` are built from real translation pairs
- search, navigation, RSS pages, and article UI copy all follow the active locale

## If you want to add a third locale

That is beyond the default theme surface. You will usually need to update:

- `astro.config.mjs`
- `src/config/i18n/types.ts`
- a new `src/config/i18n/<locale>.ts`
- `src/utils/i18n.ts`
- the related locale routes and content organization

It is best to stabilize the Chinese/English flow first before expanding further.
