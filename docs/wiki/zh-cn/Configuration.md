# 配置说明

[English](../en/Configuration.md) · [返回 Wiki 首页](./Home.md)

## 配置入口

这个主题最重要的配置入口有三个：

- [`src/config.ts`](../../../src/config.ts)
- [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)
- [`.env.example`](../../../.env.example)

## `src/config.ts`

`siteConfig` 管理站点级配置：

```ts
export const siteConfig = {
  title: "Newspaper",
  repositoryUrl: "https://github.com/mufengyian/astro-newspaper",
  typography: {
    preset: "editorial",
  },
  author: {
    name: "JiU",
  },
  socialLinks: [],
  featuredCount: 2,
  postsPerPage: 6,
}
```

### 重点字段

- `title`
  - 站点标题
- `repositoryUrl`
  - README / 首页说明区会用到
- `typography.preset`
  - 当前支持 `editorial` 和 `wenkai`
- `author.name`
  - 结构化数据与文章页作者名
- `socialLinks`
  - 首页的图标链接行，默认留空
- `featuredCount`
  - 首页置顶文章展示数量
- `postsPerPage`
  - 列表分页大小

## `.env`

### `PUBLIC_SITE_URL`

作用：

- canonical
- Open Graph / Twitter cards
- RSS
- sitemap
- `hreflang`

如果不配置：

- 页面依然能开发和构建
- `robots.txt` 返回 `Disallow: /`
- RSS 不生成实体文件
- sitemap 不启用

### `PUBLIC_WALINE_SERVER_URL`

作用：

- 配置 Waline 服务端地址

如果不配置：

- 文章页完全不显示评论区

## `src/utils/i18n.ts`

这里维护：

- 站点描述
- 导航
- 按钮文案
- 搜索文案
- 文章页局部文案

建议做法：

- 中文和英文一起维护
- 不要只改一个语言版本
- 如果某一段文案以后会频繁调整，优先集中放在这里，不要散落在页面里

## 什么时候需要改 `astro.config.mjs`

通常只在这些场景：

- 你要增加或修改 Markdown / MDX 插件
- 你要调整 Shiki 代码高亮主题
- 你要改变图片处理策略
- 你要扩展 i18n locale

如果你只是改站点标题、作者、社交链接、分页大小，不需要动这里。
