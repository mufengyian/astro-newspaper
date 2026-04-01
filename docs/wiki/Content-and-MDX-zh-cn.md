# 内容与 MDX

[English](Content-and-MDX-en) · [返回 Wiki 首页](Home)

## 内容目录

文章默认存放在：

```text
src/content/posts
```

支持两种格式：

- `.md`
- `.mdx`

主题使用 Astro Content Collections，所以文章 frontmatter 会先经过 schema 校验，再进入列表、文章页、RSS 和搜索索引。

## 当前 frontmatter 字段

```yaml
---
title: 示例文章
excerpt: 一段摘要
publishDate: 2026-04-01
updatedDate: 2026-04-02
draft: false
featured: false
locale: zh-cn
translationKey: hello-world
category: Astro
tags:
  - MDX
  - Search
authors:
  - JiU
comments: true
cover: ../../assets/covers/paper-constellation.svg
coverAlt: 封面图描述
---
```

## 字段说明

- `title`
  文章标题。
- `excerpt`
  列表页、文章页描述和搜索摘要都会使用。
- `publishDate`
  发布时间。
- `updatedDate`
  可选；用于文章更新时间元信息。
- `draft`
  `true` 时只在开发环境可见。
- `featured`
  首页置顶排序会优先使用。
- `locale`
  当前语言，默认 `zh-cn`。
- `translationKey`
  双语文章映射键。
- `category`
  可选分类，会进入文章元信息和相关性计算。
- `tags`
  标签数组。
- `authors`
  当前 schema 允许多作者数组，但主题默认展示仍以站点级作者为主。
- `comments`
  是否启用该文章评论区。
- `cover`
  本地封面图资源。
- `coverAlt`
  封面图替代文本。

## 普通 Markdown 什么时候够用

如果你只需要：

- 正常标题层级
- 段落
- 列表
- 表格
- 代码块

那么普通 Markdown 就足够。

## 为什么还保留 MDX

MDX 适合这些场景：

- 在文章中插入 Astro 组件
- 使用 `Image` / `Picture` 精细控制图片
- 构建提示块、比较块、说明卡片
- 保持内容层表达能力，而不把逻辑拆到页面组件

## 最小 MDX 示例

```mdx
---
import { Image } from "astro:assets";
import cover from "../../assets/covers/paper-constellation.svg";
---

## Hello MDX

<Image src={cover} alt="示例图片" widths={[480, 720, 1080]} />
```

## 双语文章工作流

如果同一篇文章有中英文版本，建议：

1. 先写默认语言版本
2. 译文真正准备好后再创建第二篇文章
3. 两篇文章共用同一个 `translationKey`

示例：

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

## 关闭单篇评论

```yaml
comments: false
```

适合：

- 公告页
- 独立说明页
- 不希望引导讨论的知识性内容
