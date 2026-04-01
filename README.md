# newspaper

<p align="center">
  一个面向长期写作的双语 Astro 博客主题，聚焦稳定的信息架构、静态优先的内容流，以及清晰克制的阅读体验。
</p>

<p align="center">
  <a href="./README.en.md">English</a> ·
  <a href="./docs/wiki/Home.md">Wiki</a> ·
  <a href="./docs/wiki/Home-en.md">Wiki (EN)</a>
</p>

## 特性

- 双语路由结构，默认 `zh-cn` 位于 `/`，英文位于 `/en/`
- 完整页面体系：首页、分页、归档、标签、搜索、关于、RSS、404 与文章页
- 基于 Astro Content Collections 的 Markdown / MDX 内容流
- 浅色 / 深色模式、搜索、代码复制、阅读进度、回到顶部、可选 Waline 评论
- 首页 `home-info` 支持在配置文件中直接开关
- 列表页、文章页与 SEO 元信息均围绕长期发布与静态部署设计

## 快速开始

### 环境要求

- Node.js `>= 22.12.0`
- npm `>= 10`

### 安装

```bash
git clone https://github.com/mufengyian/astro-newspaper.git your-blog-name
cd your-blog-name
npm install
```

### 环境变量

复制 [`.env.example`](./.env.example) 为 `.env`：

```bash
cp .env.example .env
```

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

### 本地开发

```bash
npm run dev
npm run check
npm run build
```

## 配置入口

### `src/config/site.ts`

站点级配置总入口，包含：

- `navigationItems`：导航顺序
- `homeInfo.enabled`：首页 `home-info` 显示开关
- `footer`：版权、备案与外链信息
- `featuredCount`：首页置顶文章数量
- `postsPerPage`：分页大小
- `comments`：Waline 默认配置
- `socialLinks`：首页社交链接

### `src/utils/i18n.ts`

中英文 UI 文案与 locale 类型定义。

### `astro.config.mjs`

Astro 的 i18n、prefetch、Markdown / MDX、Shiki 与图片处理配置。

## 内容模型

示例 frontmatter：

```yaml
---
title: Hello Astro
excerpt: 用一篇文章验证内容链路。
publishDate: 2026-04-01
locale: zh-cn
translationKey: hello-astro
tags:
  - astro
  - theme
cover: ../../assets/covers/paper-constellation.svg
coverAlt: Abstract paper constellation cover
---
```

常用字段：

- `locale`：文章所属语言
- `translationKey`：双语文章映射键
- `excerpt`：列表摘要与基础描述
- `cover` / `coverAlt`：文章封面资源与替代文本

## 项目结构

```text
src/
  assets/
  components/
    pages/
  config/
  content/
    posts/
  layouts/
  pages/
  scripts/
  styles/
  utils/
docs/
  wiki/
public/
astro.config.mjs
```

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动本地开发 |
| `npm run check` | 运行 Astro 类型检查 |
| `npm run build` | 生成生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run sync` | 同步 Astro 生成类型 |

## 文档

- [Wiki 首页](./docs/wiki/Home.md)
- [快速开始](./docs/wiki/Quick-Start-zh-cn.md)
- [配置说明](./docs/wiki/Configuration-zh-cn.md)
- [内容与 MDX](./docs/wiki/Content-and-MDX-zh-cn.md)
- [图片与 astro:assets](./docs/wiki/Images-and-Assets-zh-cn.md)
- [i18n](./docs/wiki/i18n-zh-cn.md)
- [评论与部署](./docs/wiki/Comments-and-Deployment-zh-cn.md)
- [FAQ](./docs/wiki/FAQ-zh-cn.md)

## 致谢

项目灵感来自 [Paper](https://github.com/nanxiaobei/hugo-paper)、[PaperMod](https://github.com/adityatelange/hugo-PaperMod)、[astro-paper](https://github.com/satnaing/astro-paper) 与 [fuwari](https://github.com/saicaca/fuwari)。

## 许可

MIT，详见 [LICENSE](./LICENSE)。
