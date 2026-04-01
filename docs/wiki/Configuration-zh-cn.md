# 配置说明

[English](Configuration-en) · [返回 Wiki 首页](Home)

## 配置入口

- [`src/config/site.ts`](../../../src/config/site.ts)
- [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)
- [`astro.config.mjs`](../../../astro.config.mjs)
- [`.env.example`](../../../.env.example)

## `src/config/site.ts`

当前主题的主要配置项包括：

- `title`
  站点标题。
- `navigationItems`
  顶部导航顺序。
- `typography.preset`
  字体预设，当前支持 `editorial` 与 `wenkai`。
- `homeInfo.enabled`
  首页 `home-info` 区块开关。
- `footer`
  版权、备案、底栏外链与底栏文案。
- `featuredCount`
  首页置顶文章数量。
- `postsPerPage`
  列表分页大小。
- `comments`
  Waline 默认配置。
- `socialLinks`
  首页社交链接。

## `src/utils/i18n.ts`

维护内容包括：

- 站点描述
- 导航文案
- 搜索文案
- 文章页局部文案
- 评论与分页文案

## `.env`

### `PUBLIC_SITE_URL`

用于：

- canonical
- Open Graph / Twitter Card
- RSS
- sitemap
- `hreflang`

### `PUBLIC_WALINE_SERVER_URL`

用于：

- 文章页评论区服务地址

## `astro.config.mjs`

当前基础行为包括：

- 默认 locale 为 `zh-cn`
- `prefixDefaultLocale: false`
- Markdown / MDX 支持
- `sharp` 图片处理
