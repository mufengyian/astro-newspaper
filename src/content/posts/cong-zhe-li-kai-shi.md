---
title: "从这里开始：把 newspaper 主题与 Astro 能力一次看完"
excerpt: "用一篇完整长文，把双语路由、目录、标签、相关文章、代码复制、阅读进度、分页、搜索和 Astro 原生内容能力全部走一遍。"
publishDate: 2026-03-31
updatedDate: 2026-03-31
featured: true
locale: zh-cn
translationKey: theme-overview
category: 主题导览
tags:
  - Astro
  - newspaper
  - Demo
  - i18n
  - TOC
cover: ../../assets/covers/paper-constellation.svg
coverAlt: 一张带有纸面星图感的抽象封面，用来代表主题总览文章。
---

这不是一篇“欢迎来到你的新博客”的占位文字，而是一篇真正拿来验收主题能力的 demo 长文。你现在看到的页面，已经同时在演示这些能力：

- 顶部面包屑、页面标题与摘要
- 自动生成的目录
- 阅读进度条
- 代码块复制按钮
- 标签、相关文章、上下篇导航
- 多语言路由与语言切换
- 搜索、归档、标签页、RSS 这些内容发现入口

如果你准备把这个仓库当成自己的博客 starter，建议先读完这篇，再继续看 [MDX 与 Astro 组件示例](/posts/mdx-yu-astro-zu-jian/) 和 [双语路由与翻译工作流](/posts/shuang-yu-lu-you-yu-fan-yi/)。

## 这篇文章重点验证什么

### 1. 长文阅读体验

本主题的文章页故意保持克制：标题、摘要、发布时间、阅读时长、目录、正文、标签、相关文章、评论区这些元素都在，但层级不会压过正文。

你现在可以直接滚动页面验证三件事：

1. 阅读进度条会随着滚动更新。
2. 目录会根据文章中的二级、三级标题自动生成。
3. 页面底部会根据标签和分类推导相关文章。

### 2. 内容结构而不是单页装饰

这个主题不是把首页当成一个“展示板”，而是把首页、分页、归档、标签和搜索组织成一套稳定的内容结构。换句话说，主题最重要的不是单个页面有多炫，而是当文章越来越多时，读者还能不能找到内容。

下面这张表，就是主题默认提供的主要浏览路径：

| 路径 | 作用 | 适合什么时候用 |
| --- | --- | --- |
| `/` | 首页 | 想看最新内容 |
| `/page/2/` | 分页 | 首页文章超过一页之后继续翻 |
| `/archive/` | 归档 | 按年份回看全部文章 |
| `/tags/` | 标签索引 | 先按主题进入，再看单个标签页 |
| `/search/` | 搜索 | 已经知道关键词或标签名 |
| `/rss/` | RSS 页面 | 订阅与验证 feed |

### 3. 主题功能要靠真实文章来证明

如果 demo 只有一篇 “Hello World”，那几乎什么也证明不了。分页不会出现，相关文章没有意义，搜索索引也没有密度，双语切换更无法验证。

所以这次的 demo 内容会故意覆盖以下情境：

- 有中英文成对文章，用于验证 `translationKey`
- 有只存在于单一语言的文章，用于验证“只为真实译文生成页面”
- 有 Markdown 与 MDX 混合内容
- 有带封面与不带封面的文章
- 有可评论与禁用评论的文章
- 有足够多的标签与年份分布，确保归档和标签页不是空壳

## 主题里哪些功能是 Astro 原生能力在发力

这套主题尽量不重复造轮子，而是直接站在 Astro 官方能力之上组织体验。

### 内容集合

文章通过 `astro:content` 管理，frontmatter 字段有明确 schema，因此错误会尽早暴露，而不是在构建后期才发现。

```ts
const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      publishDate: z.coerce.date(),
      locale: z.enum(LOCALES).default("zh-cn"),
      translationKey: z.string().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
    }),
});
```

### MDX

Markdown 负责大多数文章，MDX 则用来处理“正文里需要 Astro 组件”的场景。这个仓库已经启用了 `@astrojs/mdx`，所以你既可以写纯文本，也可以在正文里导入组件或图片。

### `astro:assets`

封面图与正文中的本地资源会交给 Astro 处理。主题卡片和文章页封面已经在使用 `Picture`，自动输出更适合前端加载的图片格式与尺寸。

### 路由、多语言与 alternate 元数据

Astro 负责基础 i18n 路由结构，主题负责在真实翻译对之间建立语言切换、canonical 与 `hreflang` 关系。[^alt]

[^alt]: 也就是说，只有真实存在的翻译文章才会被当作 alternate，而不是凭空补一个“伪译文页面”。

## 这篇文章本身还顺便展示了什么

### 代码复制

下面这段命令没有什么复杂逻辑，它存在的主要目的，是让你顺手确认代码块右上角的复制按钮是否正常：

```bash
npm install
npm run check
PUBLIC_SITE_URL="https://example.com" npm run build
```

### 引用与强调

> 这个主题最核心的目标不是“首页有多花”，而是“当你写了五十篇文章之后，读者依然能顺着结构找到内容”。

### 任务清单

- [x] 展示目录
- [x] 展示代码块复制
- [x] 展示标签与相关文章
- [x] 展示分页与归档所需的文章数量
- [x] 展示双语文章关系

## 下一步建议怎么读

如果你是第一次接触这个仓库，建议按下面的顺序继续看：

1. [MDX 与 Astro 组件示例](/posts/mdx-yu-astro-zu-jian/)
2. [搜索、归档与标签如何协同工作](/posts/sou-suo-gui-dang-yu-biao-qian/)
3. [双语路由与翻译工作流](/posts/shuang-yu-lu-you-yu-fan-yi/)
4. [封面图片、字体和深浅主题](/posts/feng-mian-tu-pian-yu-zi-ti/)
5. [发布清单与部署路径](/posts/fa-bu-qing-dan-yu-bu-shu/)

读完这些文章之后，这个主题的 demo 就不再只是“站起来了”，而是真正把可写、可找、可扩展的链路跑通了。
