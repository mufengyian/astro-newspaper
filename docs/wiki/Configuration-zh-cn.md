# 配置说明

[English](Configuration-en) · [返回 Wiki 首页](Home)

## 配置入口总览

当前版本的主题配置分为几层：

- [`src/config/site.ts`](../../../src/config/site.ts)
  站点级运行配置。
- [`src/config/about.ts`](../../../src/config/about.ts)
  关于页长文案与内容分区。
- [`src/config/i18n/`](../../../src/config/i18n)
  中英文词典与 locale 类型。
- [`src/styles/tokens.css`](../../../src/styles/tokens.css)
  设计系统 token。
- [`astro.config.mjs`](../../../astro.config.mjs)
  Astro 基础设施配置。
- [`.env.example`](../../../.env.example)
  运行时环境变量示例。

## `src/config/site.ts`

这是日常定制最核心的配置文件。当前结构示例：

```ts
export const siteConfig = {
  title: "Newspaper",
  repositoryUrl: "https://github.com/mufengyian/astro-newspaper",
  siteUrl: publicSiteUrl,
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,
  navigationItems,
  assets: { ... },
  seo: { themeColor: { light: "#F5F1E8", dark: "#0F1720" } },
  typography: { preset: "editorial" },
  homeInfo: {
    enabled: true,
  },
  author: { name: "JiU" },
  footer: {
    copyrightYear: 2026,
    owner: { ... },
    icp: { ... },
    poweredBy: { ... },
    theme: { ... },
    labels: { ... },
  },
  comments: { ... },
  socialLinks: [],
  content: { ... },
  search: { ... },
  interactions: { ... },
  media: { ... },
  icons: { ... },
  notFound: { ... },
  capabilities: [...],
}
```

### 常用字段

- `title`
  站点名称。
- `navigationItems`
  顶部导航顺序。
- `homeInfo.enabled`
  首页 `home-info` 区块的显示 / 隐藏开关。
- `footer.owner`
  页脚版权链接。
- `footer.icp`
  备案文案与链接。
- `footer.poweredBy` / `footer.theme`
  页脚第三方与主题链接。
- `content.featuredCount`
  首页置顶文章数量。
- `content.postsPerPage`
  分页尺寸。
- `content.relatedPostsLimit`
  相关文章数量。
- `search.*`
  搜索数量、阈值与元信息分隔符。
- `comments.*`
  Waline 默认配置。
- `media.*`
  列表封面与文章封面的输出策略。

## `src/config/about.ts`

关于页采用结构化内容，而不是把长文案写在组件中。

字段说明：

- `lead`
  页面导语。
- `sections`
  内容分区数组。
- `sections[].title`
  分区标题。
- `sections[].paragraphs`
  分区正文。
- `sections[].list`
  可选列表，适合能力说明或信息清单。

## `src/config/i18n/*`

中英文文案分别位于：

- [`src/config/i18n/zh-cn.ts`](../../../src/config/i18n/zh-cn.ts)
- [`src/config/i18n/en.ts`](../../../src/config/i18n/en.ts)

类型定义位于：

- [`src/config/i18n/types.ts`](../../../src/config/i18n/types.ts)

建议规则：

- 新增字段时先改 `types.ts`
- 再同步维护 `zh-cn` 与 `en`
- 主题 UI 文案优先放在这里，不直接写死到组件

## `src/styles/tokens.css`

设计变量集中在这里，包括：

- spacing
- radius
- duration / easing
- typography
- brand / accent / neutral colors
- semantic surfaces / text / border / shadow
- 首页列表卡片尺寸变量

调整视觉风格时，优先改 token，再决定是否需要进入组件级样式。

## `.env`

### `PUBLIC_SITE_URL`

用于：

- canonical
- sitemap
- RSS
- Open Graph / Twitter Card
- `hreflang`
- `robots.txt`

### `PUBLIC_WALINE_SERVER_URL`

用于：

- 文章页评论区服务端地址

未配置时评论区不会渲染。

## `astro.config.mjs`

通常只在这些场景需要改动：

- 增删 Markdown / MDX 插件
- 调整 Shiki 主题
- 扩展 locale
- 修改图片处理或构建层行为

当前值得关注的基础行为：

- 默认 locale 为 `zh-cn`
- `prefixDefaultLocale: false`
- `prefetchAll: false`
- 图片服务使用 `sharp`

## 推荐配置顺序

1. 修改 `src/config/site.ts`
2. 修改 `src/config/about.ts`
3. 同步 `src/config/i18n/*`
4. 最后再决定是否需要改 `astro.config.mjs`
