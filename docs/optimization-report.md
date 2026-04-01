# 项目优化总览

本轮迭代基于现有深度重构分支继续收口，重点完成了首页 `home-info` 的全局开关、首页列表区块尺寸与间距微调、Footer 结构替换、README / Wiki 规范化，以及文档与截图占位资源整理。除明确要求调整的首页留白、移动端卡片尺寸与 Footer 外，其余视觉表现保持现有主题结果不变。

## 优化说明

- 新增 `siteConfig.homeInfo.enabled`，可直接控制首页 `home-info` 区块显隐
- Footer 由旧版双行元信息改为三段式结构，并将版权、备案、外链文案统一收敛到 `siteConfig.footer`
- 首页主内容上边距增加，保证导航栏下方到内容区的呼吸感更强
- 列表卡片尺寸逻辑收敛为 CSS 变量，并重点缩小移动端卡片内边距、标题字号与摘要尺寸
- README 与 Wiki 改为以项目介绍为核心的结构，移除 Release Notes 内容
- 新增 README 截图占位资源，后续可以直接替换为真实 Demo 截图

## 整体优化思路

1. 先在配置层补足可配置入口，避免把新增需求继续写死在组件里
2. 再在布局层与样式 token 层做最小必要调整，保证视觉变化只落在需求指定范围
3. 最后统一文档结构、删除版本性噪音内容，并补齐后续维护所需的索引与说明

## 样式结构整理与新增需求实现说明

强调：除以下指定项外，视觉 1:1 保持现状。

### 本轮允许且已实施的视觉调整

- 首页导航栏下方留白增大
- 首页 / 列表页移动端文章卡片尺寸缩小
- Footer 替换为新的三段式结构并保持底部居中

### 本轮未改变的视觉层

- 色板与浅色 / 深色主题最终呈现
- 字体体系与基础字号层级
- 既有圆角、阴影、动效时长与缓动曲线
- 文章页、归档页、标签页等非指定区域布局

### 底层整理方式

- 将首页与列表卡片相关尺寸收敛为 `tokens.css` 中的语义变量
- 在 `listing.css` 中改为消费变量，而不是散落的局部硬编码
- 在 `responsive.css` 中集中做移动端覆写

## 代码规范与架构变更

- `src/config/site.ts`
  新增 `homeInfo`、重构 `footer` 配置模型、补充可复用配置类型
- `src/components/pages/HomePage.astro`
  改为由配置决定是否渲染 `HomeHero`
- `src/components/SiteFooter.astro`
  替换为新 Footer 结构，并复用 `ICP.svg` 作为符号资源
- `src/styles/base.css`
  `body` 改为 `flex` 列布局，避免依赖估算 Footer 高度来贴底
- `src/styles/layout.css`
  补充首页顶部留白变量、重写 Footer 样式并保留主题语义色
- `src/styles/listing.css`
  卡片尺寸全部改为使用语义变量
- `src/styles/responsive.css`
  将卡片缩放逻辑集中到移动端断点

## 修复的 Bug 列表

- 修复 Footer 高度变化可能导致主内容高度估算不稳定的问题
- 修复首页 `home-info` 不能通过配置关闭的问题
- 修复 Wiki 仍然暴露 Release Notes 与旧维护文档入口的问题
- 修复 README 缺少截图占位资源的问题

## 优化提升点

### 逻辑

- 首页信息区显隐改为配置驱动，主题接入时无需手改组件
- Footer 所有文本与链接集中配置，减少后续重复修改点

### 性能

- 页面底部布局改为 `body flex column + main flex: 1`，避免额外高度计算依赖
- 列表卡片响应式参数集中，后续调整时不需要在多个样式文件间反复搜索

### 可维护性

- README / Wiki 信息架构统一
- Release Notes 从 Wiki 导航中彻底移除
- 新增 README 截图占位目录，后续替换资源更直接

## 完整优化后代码

以下为本轮核心代码入口，按文件分类整理。源码以仓库内实际文件为准。

### `src/layouts`

- [`src/layouts/MainLayout.astro`](../src/layouts/MainLayout.astro)
- [`src/layouts/PostLayout.astro`](../src/layouts/PostLayout.astro)

### `src/components`

- [`src/components/HomeHero.astro`](../src/components/HomeHero.astro)
- [`src/components/PostFeed.astro`](../src/components/PostFeed.astro)
- [`src/components/PostCard.astro`](../src/components/PostCard.astro)
- [`src/components/SiteFooter.astro`](../src/components/SiteFooter.astro)
- [`src/components/SiteHeader.astro`](../src/components/SiteHeader.astro)
- [`src/components/pages/HomePage.astro`](../src/components/pages/HomePage.astro)
- [`src/components/pages/PaginatedPostsPage.astro`](../src/components/pages/PaginatedPostsPage.astro)

### `src/styles`

- [`src/styles/tokens.css`](../src/styles/tokens.css)
- [`src/styles/base.css`](../src/styles/base.css)
- [`src/styles/layout.css`](../src/styles/layout.css)
- [`src/styles/listing.css`](../src/styles/listing.css)
- [`src/styles/responsive.css`](../src/styles/responsive.css)

### `src/config`

- [`src/config/site.ts`](../src/config/site.ts)
- [`src/config/about.ts`](../src/config/about.ts)
- [`src/config/i18n/zh-cn.ts`](../src/config/i18n/zh-cn.ts)
- [`src/config/i18n/en.ts`](../src/config/i18n/en.ts)
- [`src/config/i18n/types.ts`](../src/config/i18n/types.ts)

### 站点与构建配置

- [`astro.config.mjs`](../astro.config.mjs)
- [`.env.example`](../.env.example)

### 文档与 README

- [`README.md`](../README.md)
- [`README.en.md`](../README.en.md)
- [`docs/wiki/Home.md`](./wiki/Home.md)
- [`docs/wiki/Home-en.md`](./wiki/Home-en.md)
- [`docs/wiki/Configuration-zh-cn.md`](./wiki/Configuration-zh-cn.md)
- [`docs/wiki/Configuration-en.md`](./wiki/Configuration-en.md)
- [`docs/wiki/_Sidebar.md`](./wiki/_Sidebar.md)
- [`docs/wiki/_Sidebar-zh-cn.md`](./wiki/_Sidebar-zh-cn.md)
- [`docs/readme-assets/home-zh-light.svg`](./readme-assets/home-zh-light.svg)
- [`docs/readme-assets/home-zh-dark.svg`](./readme-assets/home-zh-dark.svg)
- [`docs/readme-assets/home-en-light.svg`](./readme-assets/home-en-light.svg)
- [`docs/readme-assets/home-en-dark.svg`](./readme-assets/home-en-dark.svg)

## 针对 README 与 Wiki 的完整 Markdown 源码

README 与 Wiki 的最终 Markdown 源码已经直接落在仓库对应文件中：

- [`README.md`](../README.md)
- [`README.en.md`](../README.en.md)
- [`docs/wiki/Home.md`](./wiki/Home.md)
- [`docs/wiki/Home-en.md`](./wiki/Home-en.md)
- [`docs/wiki/Configuration-zh-cn.md`](./wiki/Configuration-zh-cn.md)
- [`docs/wiki/Configuration-en.md`](./wiki/Configuration-en.md)
- [`docs/wiki/Quick-Start-zh-cn.md`](./wiki/Quick-Start-zh-cn.md)
- [`docs/wiki/Quick-Start-en.md`](./wiki/Quick-Start-en.md)
- [`docs/wiki/Content-and-MDX-zh-cn.md`](./wiki/Content-and-MDX-zh-cn.md)
- [`docs/wiki/Content-and-MDX-en.md`](./wiki/Content-and-MDX-en.md)
- [`docs/wiki/Images-and-Assets-zh-cn.md`](./wiki/Images-and-Assets-zh-cn.md)
- [`docs/wiki/Images-and-Assets-en.md`](./wiki/Images-and-Assets-en.md)
- [`docs/wiki/i18n-zh-cn.md`](./wiki/i18n-zh-cn.md)
- [`docs/wiki/i18n-en.md`](./wiki/i18n-en.md)
- [`docs/wiki/Comments-and-Deployment-zh-cn.md`](./wiki/Comments-and-Deployment-zh-cn.md)
- [`docs/wiki/Comments-and-Deployment-en.md`](./wiki/Comments-and-Deployment-en.md)
- [`docs/wiki/FAQ-zh-cn.md`](./wiki/FAQ-zh-cn.md)
- [`docs/wiki/FAQ-en.md`](./wiki/FAQ-en.md)

## 后续迭代建议

- 将 Footer 的文案进一步拆到多语言字典中，使备案与署名区也能按 locale 切换
- 如果后续需要更细粒度的首页控制，可继续给 `homeInfo` 增加标题、副标题、能力标签等配置字段
- 若准备替换 README 截图，建议统一输出为同尺寸静态图，保持 Light / Dark 与中英文对照表整齐
- 若继续做性能优化，可增加 Lighthouse 基准记录与图片体积预算

## 验证记录

- `npm run check`
  已通过
- `npm run build`
  已通过

构建期间仅出现 Astro / Vite 依赖层未使用导入警告，未影响产物生成。
