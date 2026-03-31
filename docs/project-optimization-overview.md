# 项目优化总览

## 1. 优化说明

### 整体优化思路

- 以“配置层统一、页面层瘦身、样式层模块化、交互脚本按需化”为主线重构整个主题。
- 将原本分散在页面、组件、脚本中的硬编码文本、主题参数、搜索参数、路由片段、SEO 资源统一收敛到 `src/config` 与 `src/utils/i18n.ts`。
- 把首页、分页、标签详情、文章详情的重复页面逻辑抽离为共享组件和共享数据装配函数，降低双语页面维护成本。
- 将原本单体的 `src/styles/global.css` 拆分为 `tokens / base / layout / components / prose` 五层，形成清晰设计系统。
- 在不引入额外重量级依赖的前提下，优先通过 Astro 原生能力、CSS 变量和结构优化提升性能与可维护性。

### 配色方案说明

- 主题采用“暖纸张中性色 + 冷静蓝主色 + 琥珀强调色”的编辑化视觉方向。
- 浅色模式以 `paper / ivory / warm gray` 为基底，强化长文阅读舒适度。
- 深色模式以 `ink / navy / slate` 为基底，保留足够层次和对比，避免高饱和刺眼配色。
- 功能色统一补齐：
  - `success`: `--color-success-500`
  - `warning`: `--color-warning-500`
  - `danger`: `--color-danger-500`
  - `info`: `--color-info-500`
- 所有核心颜色、边框、阴影、圆角、字号、间距、过渡时间全部改为 CSS 变量，彻底移除样式层硬编码。

### 设计系统变更

- 新增主题令牌文件：`src/styles/tokens.css`
- 新增基础样式层：`src/styles/base.css`
- 新增布局样式层：`src/styles/layout.css`
- 新增组件样式层：`src/styles/components.css`
- 新增长文排版样式层：`src/styles/prose.css`
- 新增三态主题模式：`system / light / dark`
- 统一按钮、卡片、页头、标签、分页、搜索、归档、文章内容、评论区的视觉语义和交互反馈
- 统一容器宽度、字号层级、留白节奏、交互阴影与焦点态

### 验证结果

- `npm.cmd run check`：通过
- `npm.cmd run build`：通过
- 构建阶段仅保留 Astro / Vite 上游依赖的无害 warning，不影响站点输出

## 2. 修复的 Bug 列表

- 修复动态路由页面在 `getStaticPaths` 阶段误触 `Astro.props` 导致的静态构建失败风险。
- 修复分页页、搜索页、404 页此前残留的结构与样式不一致问题。
- 修复主题切换只支持浅色 / 深色、不支持跟随系统的问题。
- 修复搜索页在页面初始化时就同步加载 `Fuse.js`，造成不必要客户端开销的问题。
- 修复搜索页状态文案、结果 aria-label、无结果提示仍有硬编码的问题。
- 修复相关文章、文章卡片、标签胶囊、面包屑、返回顶部等组件中的硬编码文案与 aria 标签问题。
- 修复阅读进度基于整页滚动计算、不够贴合文章主体的问题，改为优先跟踪 `[data-reading-container]`。
- 修复 RSS 说明页与 RSS XML 逻辑分散、不可配置的问题。
- 修复页头、标签页、归档页、首页 feed 区域样式体系各自为政的问题。
- 修复原有单体 CSS 难以维护、重复规则多、视觉变量难复用的问题。

## 3. 新增与优化功能

- 新增 `src/config/site.ts`，统一站点标题、SEO 资源、导航路由、文章分页、搜索参数、评论参数。
- 新增 `src/config/theme.ts`，统一主题偏好与浏览器主题色配置。
- 新增共享页面数据装配层 `src/utils/page-data.ts`。
- 新增共享页面组件：
  - `PageHeader.astro`
  - `HomeHero.astro`
  - `ArchiveTimeline.astro`
  - `TagCloud.astro`
  - `PaginatedFeedPage.astro`
  - `TagFeedPage.astro`
  - `RenderedPostPage.astro`
- 首页升级为双栏 Hero 结构，包含统计项、主 CTA、设计原则与内建能力展示。
- 搜索页改为按需加载 `Fuse.js` 与搜索索引，减少非搜索场景 JS 体积。
- 主题切换升级为三态循环切换，并在系统主题变化时自动同步。
- 页脚补充源码与 RSS 快捷入口。
- 404 页面改为统一布局风格，并支持自动跳转回首页。
- RSS 跳转页改为主题内统一风格卡片，而非裸 HTML 提示页。

## 4. 完整优化后代码

说明：完整优化后代码已直接落地在当前仓库。以下按文件分类列出核心源码入口，后续 AI 继续迭代时请以这些文件为准。

### `src/layouts/...`

- `src/layouts/MainLayout.astro`
- `src/layouts/PostLayout.astro`

### `src/components/...`

- `src/components/ArchiveTimeline.astro`
- `src/components/BackToTop.astro`
- `src/components/BaseHead.astro`
- `src/components/Breadcrumbs.astro`
- `src/components/HomeHero.astro`
- `src/components/LocaleSwitch.astro`
- `src/components/PageHeader.astro`
- `src/components/PaginatedFeedPage.astro`
- `src/components/Pagination.astro`
- `src/components/PostCard.astro`
- `src/components/PostFeed.astro`
- `src/components/PostMeta.astro`
- `src/components/PostNavLinks.astro`
- `src/components/ReadingProgress.astro`
- `src/components/RelatedPosts.astro`
- `src/components/RenderedPostPage.astro`
- `src/components/SearchPanel.astro`
- `src/components/SiteFooter.astro`
- `src/components/SiteHeader.astro`
- `src/components/SocialIcon.astro`
- `src/components/TableOfContents.astro`
- `src/components/TagCloud.astro`
- `src/components/TagFeedPage.astro`
- `src/components/TagPill.astro`
- `src/components/ThemeToggle.astro`
- `src/components/WalineComments.astro`

### `src/styles/...`

- `src/styles/global.css`
- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/layout.css`
- `src/styles/components.css`
- `src/styles/prose.css`
- `src/styles/wenkai.css`

### `src/config/...`

- `src/config.ts`
- `src/config/site.ts`
- `src/config/theme.ts`

### `src/utils/...`

- `src/utils/date.ts`
- `src/utils/i18n.ts`
- `src/utils/page-data.ts`
- `src/utils/posts.ts`
- `src/utils/routing.ts`

### `src/pages/...`

- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/archive.astro`
- `src/pages/search.astro`
- `src/pages/search.json.ts`
- `src/pages/rss.astro`
- `src/pages/rss.xml.ts`
- `src/pages/404.astro`
- `src/pages/page/[page].astro`
- `src/pages/posts/[slug].astro`
- `src/pages/tags/index.astro`
- `src/pages/tags/[tag].astro`
- `src/pages/en/index.astro`
- `src/pages/en/about.astro`
- `src/pages/en/archive.astro`
- `src/pages/en/search.astro`
- `src/pages/en/search.json.ts`
- `src/pages/en/rss.astro`
- `src/pages/en/rss.xml.ts`
- `src/pages/en/page/[page].astro`
- `src/pages/en/posts/[slug].astro`
- `src/pages/en/tags/index.astro`
- `src/pages/en/tags/[tag].astro`
- `src/pages/robots.txt.ts`

### `astro.config.mjs`

- 当前配置保持稳定，仍使用：
  - Astro i18n
  - `@astrojs/mdx`
  - `@astrojs/sitemap`
  - `remark-gfm`
  - `sharp` 图片服务
- 本轮未改动 `astro.config.mjs`，原因是现有配置已经满足本次重构目标，继续调整收益较低且可能引入额外风险。

### 其他相关文件

- `src/content.config.ts`
- `src/content/posts/hello-world.md`
- `public/favicon.svg`
- `public/favicon.ico`
- `public/social-card.svg`

## 5. 后续迭代建议

- 增加内容层自动化测试：
  - 校验 `coverAlt`、`translationKey`、双语文章成对关系、标签命名规范
- 增加视觉回归测试：
  - 首页、文章页、搜索页、标签页、RSS 跳转页、404 页至少各保留一张基准截图
- 增加 `socialLinks` 与 `author` 更完整的 schema 配置：
  - 例如 Twitter/X、LinkedIn、GitHub profile、organization publisher
- 为 `Waline` 评论区增加懒加载开关：
  - 当评论区位于首屏外时再初始化，可进一步减少首屏脚本
- 为搜索结果增加关键字高亮与标签快速过滤
- 为文章内容增加 `updatedDate` 的展示开关与“最后更新”文案
- 如果后续文章数量增长明显，可考虑：
  - 为搜索索引拆分语言分片
  - 为归档页与标签页增加更细粒度缓存策略
- 如果下轮继续做视觉升级，优先从以下入口继续：
  - `src/styles/tokens.css`
  - `src/components/HomeHero.astro`
  - `src/components/PostCard.astro`
  - `src/styles/prose.css`
