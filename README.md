# newspaper

[English README](./README.en.md) | [中文 Wiki](./docs/wiki/zh-cn/Home.md) | [English Wiki](./docs/wiki/en/Home.md) | [Wiki Source](./docs/wiki/README.md)

`newspaper` 是一个面向长期写作的 Astro 博客主题 starter。它把阅读、归档、搜索、多语言与稳定维护放在视觉噱头之前，适合个人博客、技术笔记、项目日志、读书记录与持续积累型内容。

这个主题受到 [Paper](https://github.com/nanxiaobei/hugo-paper) 与 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 的启发，也参考了 [astro-paper](https://github.com/satnaing/astro-paper) 和 [fuwari](https://github.com/saicaca/fuwari) 对 Astro 生态的实践方式。它不是对这些项目的复刻，而是一次基于 Astro 官方能力的重新组织。

## 设计目标

- 阅读优先：正文、列表、归档、标签和搜索都服务于内容本身。
- Astro 原生：尽量直接使用 [Content Collections](https://docs.astro.build/zh-cn/guides/content-collections/)、[i18n](https://docs.astro.build/zh-cn/guides/internationalization/)、[MDX](https://docs.astro.build/zh-cn/guides/integrations-guide/mdx/)、[astro:assets](https://docs.astro.build/zh-cn/reference/modules/astro-assets/) 和 [View Transitions](https://docs.astro.build/zh-cn/guides/view-transitions/)。
- 安全默认：未配置公开站点地址时，不输出误导性的生产 SEO 元数据；未配置 Waline 服务端时，不显示评论区。
- 适合持续维护：尽量避免过度工程化，让主题可以稳定写很多年。

## 功能概览

- 基于 Astro 6 的双语博客结构，内置 `zh-cn` 与 `en`
- `astro:content` 内容集合，支持 `.md` 与 `.mdx`
- `astro:assets` + `sharp` 的本地响应式图片工作流
- 首页、分页、归档、标签、搜索、关于、404 与 RSS
- 阅读进度、目录、代码复制、回到顶部、视图过渡
- 亮色 / 暗色两态主题
- 可选 Waline 评论
- 可配置字体方案，内置 `editorial` 与 `wenkai`

## 适合谁

- 想直接开始写作，而不是先搭一套内容平台的人
- 需要中英文双语结构的人
- 希望主题安静、克制、可长期维护的人
- 喜欢 Paper / PaperMod 一类阅读气质，但更偏 Astro 原生能力的人

## 不适合谁

- 想要 CMS、后台管理、多人协作编辑流的人
- 想把主题作为可 `astro add` 安装的 integration 使用的人
- 需要重交互首页、复杂动画 landing page 或重应用式信息架构的人

## 快速开始

> 这是一个 starter 仓库。推荐直接 `git clone` 或使用 GitHub 的 “Use this template”，而不是把它当作安装型主题包。

### 环境要求

- Node.js `>= 22.12.0`
- npm `>= 10`

### 1. 安装依赖

```bash
npm install
```

### 2. 准备环境变量

将 [`.env.example`](./.env.example) 复制为 `.env`，至少保留：

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

说明：

- `PUBLIC_SITE_URL`：
  生产环境强烈建议配置。未配置时，主题会关闭 canonical、OG、Twitter、RSS 与 sitemap 的生产输出，并让 `robots.txt` 返回 `Disallow: /`。
- `PUBLIC_WALINE_SERVER_URL`：
  可选。未配置时，文章页不会显示评论区。

### 3. 本地开发

```bash
npm run dev
```

默认地址：

```text
http://localhost:4321
```

### 4. 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run check` | 运行 Astro 类型检查 |
| `npm run build` | 生成生产构建 |
| `npm run preview` | 本地预览生产构建 |
| `npm run sync` | 同步内容集合类型 |

## 第一次启动后建议先改什么

主题已经能直接跑，但真正上线前至少建议先改这些：

1. [`src/config.ts`](./src/config.ts) 里的站点标题、作者名、字体方案、分页数量
2. [`src/utils/i18n.ts`](./src/utils/i18n.ts) 里的中英文站点描述与导航文案
3. [`.env.example`](./.env.example) 对应的真实环境变量
4. [`src/content/posts`](./src/content/posts) 里的示例文章
5. [`src/assets/covers`](./src/assets/covers) 里的示例封面
6. `siteConfig.socialLinks`，如果你需要首页社交链接行

## 目录结构

```text
.
├─ public/                # favicon、社交卡片等静态资源
├─ src/
│  ├─ assets/             # 本地封面与图片素材
│  ├─ components/         # UI 组件
│  ├─ content/            # Markdown / MDX 内容
│  ├─ layouts/            # 页面布局
│  ├─ pages/              # 路由与页面
│  ├─ styles/             # 全局样式
│  ├─ utils/              # i18n、路由、文章工具函数
│  ├─ config.ts           # 站点配置
│  └─ content.config.ts   # 内容 schema
├─ docs/wiki/             # 中英文 Wiki 真源
├─ astro.config.mjs       # Astro 配置
├─ README.md              # 中文说明
├─ README.en.md           # English README
└─ .env.example           # 环境变量示例
```

## 核心配置

### 1. `src/config.ts`

这里维护站点级配置。最常改的是：

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

字段建议：

- `title`：站点名
- `typography.preset`：字体方案，当前支持 `editorial` / `wenkai`
- `author.name`：文章页与结构化数据作者名
- `socialLinks`：首页 `Social Links` 图标行，默认留空更安全
- `featuredCount`：首页优先展示的置顶文章数量
- `postsPerPage`：分页大小

### 2. `src/utils/i18n.ts`

这里维护：

- 中英文站点描述
- 顶部导航文案
- 按钮文案
- 搜索页文案
- 文章页局部文案

如果你只写中文，也建议保留英文结构，这样后续扩展成本最低。

### 3. `astro.config.mjs`

当前启用了：

- MDX
- remark-gfm
- sitemap（仅在配置 `PUBLIC_SITE_URL` 时启用）
- 官方 `sharp` 图片服务
- i18n 路由
- 链接预取
- Shiki 代码高亮

## 内容写作

所有文章都放在 [`src/content/posts`](./src/content/posts) 下，支持 `.md` 与 `.mdx`。

当前内容 schema 定义在 [`src/content.config.ts`](./src/content.config.ts)，主要字段如下：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `excerpt` | 是 | 摘要，列表页和 meta 会使用 |
| `publishDate` | 是 | 发布时间 |
| `updatedDate` | 否 | 更新时间 |
| `draft` | 否 | 草稿，默认 `false` |
| `featured` | 否 | 是否置顶 |
| `locale` | 否 | `zh-cn` 或 `en`，默认 `zh-cn` |
| `translationKey` | 否 | 同一篇文章的多语言关联键 |
| `category` | 否 | 分类 |
| `tags` | 否 | 标签数组 |
| `authors` | 否 | 作者数组，默认 `["JiU"]` |
| `comments` | 否 | 是否显示评论区，默认 `true` |
| `cover` | 否 | 本地封面图 |
| `coverAlt` | 否 | 封面图替代文本 |

最小示例：

```md
---
title: Hello Astro
excerpt: 用一篇文章确认主题已经能正常写作。
publishDate: 2026-03-31
locale: zh-cn
translationKey: hello-astro
tags:
  - Astro
  - Writing
---

这是一篇新的文章。
```

## MDX 与 `astro:assets`

主题默认支持 [MDX](https://docs.astro.build/zh-cn/guides/integrations-guide/mdx/)，所以你既可以写普通 Markdown，也可以在文章里导入组件与图片资源。

```mdx
---
import { Image } from "astro:assets";
import cover from "../../assets/covers/paper-constellation.svg";
---

<Image src={cover} alt="示例图片" widths={[480, 720, 1080]} />
```

为什么推荐 `astro:assets`：

- 自动生成响应式图片与 `srcset`
- 构建时使用 `sharp` 处理本地资源
- 能输出现代格式，如 `webp` / `avif`
- 能提前保留宽高，减少布局抖动

如果你想看更完整的写法，请直接去 Wiki：

- [中文：内容与 MDX](./docs/wiki/zh-cn/Content-and-MDX.md)
- [中文：图片与 astro:assets](./docs/wiki/zh-cn/Images-and-Assets.md)

## i18n 使用方式

当前主题内置两个 locale：

- `zh-cn`
- `en`

路由结构如下：

- 中文首页：`/`
- 英文首页：`/en/`
- 中文文章：`/posts/slug/`
- 英文文章：`/en/posts/slug/`

建议中英文文章通过同一个 `translationKey` 关联：

```yaml
locale: zh-cn
translationKey: hello-world
```

```yaml
locale: en
translationKey: hello-world
```

这样后续无论做语言切换还是 fallback，都会更稳。

## Waline 评论

主题已接入 [Waline](https://waline.js.org/) 客户端，但默认保持静默。

### 启用条件

- 未配置 `PUBLIC_WALINE_SERVER_URL`
  - 不显示评论区
- 已配置 `PUBLIC_WALINE_SERVER_URL`
  - 文章页自动加载 Waline

### 按文章关闭评论

```yaml
comments: false
```

### 当前默认评论配置

配置位于 [`src/config.ts`](./src/config.ts)：

- `meta`: `["nick", "mail", "link"]`
- `requiredMeta`: `["nick", "mail"]`
- `login`: `"enable"`
- `commentSorting`: `"latest"`
- `pageSize`: `10`
- `reaction`: `false`

## 部署说明

这是一个静态站点主题，适合部署到：

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- 任何支持静态文件输出的对象存储/CDN

部署前检查：

1. 配置 `PUBLIC_SITE_URL`
2. 运行 `npm run check`
3. 运行 `npm run build`
4. 确认示例文章、示例封面和示例作者信息都已经替换

如果你计划继续把它公开成主题仓库，也建议补齐：

- 仓库截图
- GitHub Topics
- GitHub Wiki 首页说明

## FAQ

### 这是一个 npm 安装包还是 starter 仓库？

当前定位是 starter 仓库。最顺手的使用方式是 clone 或 Use this template。

### 为什么不配置 `PUBLIC_SITE_URL` 时 RSS 和 sitemap 不生成？

这是刻意的安全默认。主题不应该在不知道真实站点地址时输出错误的 canonical、RSS 或 sitemap。

### 可以只用 Markdown，不用 MDX 吗？

可以。主题同时支持 `.md` 与 `.mdx`，不需要组件能力时完全可以一直用 Markdown。

### 可以只写中文吗？

可以。只是建议保留英文结构，方便以后扩展。

## 延伸文档

- [中文 Wiki 首页](./docs/wiki/zh-cn/Home.md)
- [English Wiki Home](./docs/wiki/en/Home.md)
- [Wiki Source](./docs/wiki/README.md)
- [Astro 文档](https://docs.astro.build/zh-cn/)
- [Astro Themes](https://astro.build/themes/)

## 致谢与许可证

`newspaper` 采用 [MIT License](./LICENSE)。

灵感与参考来源：

- [Paper](https://github.com/nanxiaobei/hugo-paper)
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- [astro-paper](https://github.com/satnaing/astro-paper)
- [fuwari](https://github.com/saicaca/fuwari)
- [Astro](https://astro.build/)

如果你基于这个主题继续修改或发布，欢迎保留致谢链接，也欢迎按自己的内容与审美把它真正用起来。
