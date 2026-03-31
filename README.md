# newspaper

[English README](./README.en.md) | [中文文档](./docs/wiki/Home.md) | [English Wiki](https://github.com/mufengyian/astro-newspaper/wiki)

`newspaper` 是一个面向长期写作的 Astro 博客主题 starter，适合个人博客、技术笔记、项目日志与中英文双语内容。它延续了 [Paper](https://github.com/nanxiaobei/hugo-paper) 与 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 的阅读气质，同时尽量直接使用 Astro 官方能力来组织主题结构。

## 演示

- 演示站：<https://mufengyian.github.io/astro-newspaper/>
- 演示分支：[`demo`](https://github.com/mufengyian/astro-newspaper/tree/demo)

演示站通过 GitHub Pages 自动部署，部署来源为 `demo` 分支上的 GitHub Actions 工作流。

## 功能

- `zh-cn` / `en` 双语结构
- `astro:content` 内容集合
- Markdown 与 MDX
- `astro:assets` + `sharp` 本地响应式图片
- 首页、分页、归档、标签、搜索、关于、404、RSS
- 目录、阅读进度、代码复制、回到顶部、视图过渡
- 亮色 / 暗色主题
- 可选 Waline 评论

## 快速开始

环境要求：

- Node.js `>= 22.12.0`
- npm `>= 10`

安装依赖：

```bash
npm install
```

复制环境变量：

```bash
cp .env.example .env
```

本地开发：

```bash
npm run dev
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run check` | 运行 Astro 类型检查 |
| `npm run build` | 生成生产构建 |
| `npm run preview` | 本地预览生产构建 |

## 需要先改的地方

- [`src/config.ts`](./src/config.ts)：站点标题、作者、字体、分页、社交链接
- [`src/utils/i18n.ts`](./src/utils/i18n.ts)：中英文站点文案
- [`.env.example`](./.env.example)：公开站点地址、Waline 服务端地址
- [`src/content/posts`](./src/content/posts)：示例文章
- [`src/assets/covers`](./src/assets/covers)：示例封面

## 环境变量

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

说明：

- 未配置 `PUBLIC_SITE_URL` 时，主题不会输出生产 SEO 元数据，也不会生成 RSS 与 sitemap。
- 未配置 `PUBLIC_WALINE_SERVER_URL` 时，文章页不显示评论区。

## 写作

文章放在 [`src/content/posts`](./src/content/posts) 下，支持 `.md` 和 `.mdx`。

最小 frontmatter 示例：

```md
---
title: Hello Astro
excerpt: 用一篇文章确认主题已经能正常写作。
publishDate: 2026-03-31
locale: zh-cn
translationKey: hello-astro
---

这是一篇新的文章。
```

更完整的配置、MDX、图片、i18n、评论与部署教程，请直接看 Wiki。

## 文档

- 中文文档：[`docs/wiki/Home.md`](./docs/wiki/Home.md)
- English Wiki：<https://github.com/mufengyian/astro-newspaper/wiki>
- 仓库内英文文档源：[`docs/wiki/Home-en.md`](./docs/wiki/Home-en.md)
- Astro 官方文档：<https://docs.astro.build/zh-cn/>
- Astro Themes：<https://astro.build/themes/>

## 许可证与致谢

- License：[MIT](./LICENSE)
- Inspirations:
  - [Paper](https://github.com/nanxiaobei/hugo-paper)
  - [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
  - [astro-paper](https://github.com/satnaing/astro-paper)
  - [fuwari](https://github.com/saicaca/fuwari)
