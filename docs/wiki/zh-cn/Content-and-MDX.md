# 内容与 MDX

[English](../en/Content-and-MDX.md) · [返回 Wiki 首页](./Home.md)

## 内容目录

文章默认存放在：

```text
src/content/posts
```

支持两种格式：

- `.md`
- `.mdx`

## frontmatter 字段

核心字段如下：

```yaml
title: 示例文章
excerpt: 一段摘要
publishDate: 2026-03-31
updatedDate: 2026-04-01
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
```

## 写普通 Markdown

如果你只是写文章，不需要组件能力，普通 Markdown 已经够用：

````md
## 二级标题

这是一段正文。

```ts
console.log("hello");
```
````

## 为什么还要支持 MDX

MDX 适合这些场景：

- 在文章里插入 Astro 组件
- 自定义图片展示
- 制作提示块、对比块、说明块
- 让内容页拥有比 Markdown 更强的表达能力

## MDX 最小示例

```mdx
---
import { Image } from "astro:assets";
import cover from "../../assets/covers/paper-constellation.svg";
---

## Hello MDX

<Image src={cover} alt="示例图片" widths={[480, 720, 1080]} />
```

## 多语言写作建议

如果同一篇文章有中英文版本，给它们相同的 `translationKey`：

```yaml
locale: zh-cn
translationKey: long-form-writing
```

```yaml
locale: en
translationKey: long-form-writing
```

## 按文章关闭评论

```yaml
comments: false
```

这适合：

- 独立页面
- 公告页
- 不希望引导讨论的文档页
