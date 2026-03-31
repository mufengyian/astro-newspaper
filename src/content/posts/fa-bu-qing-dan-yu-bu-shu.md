---
title: "发布清单与部署路径：从本地写作到构建上线的完整流程"
excerpt: "这篇文章把 frontmatter、自检命令、RSS、sitemap、环境变量与部署前检查串成一条真正可执行的发布链路。"
publishDate: 2025-12-12
locale: zh-cn
translationKey: publishing-checklist
category: 发布工作流
tags:
  - Publishing
  - Deployment
  - Sitemap
  - RSS
  - Checklist
comments: false
cover: ../../assets/covers/paper-constellation.svg
coverAlt: 用星图式封面来代表从写作到上线的发布流程。
---

很多 demo 只会告诉你“写一篇文章放进 `src/content/posts` 就行”，但真正可用的主题应该把“写完之后怎么验证、怎么上线”也讲清楚。

## 一篇文章从草稿到上线，至少要经过什么步骤

### frontmatter 填完整

最小可用 frontmatter 至少应该包含：

```yaml
---
title: 发布清单与部署路径
excerpt: 先用摘要说明这篇文章的价值。
publishDate: 2025-12-12
locale: zh-cn
translationKey: publishing-checklist
category: 发布工作流
tags:
  - Publishing
  - Deployment
comments: false
---
```

### 本地检查

```bash
npm run check
PUBLIC_SITE_URL="https://example.com" npm run build
```

第一条确认类型、内容集合和模板无误；第二条确认生产环境下的页面、RSS 与 sitemap 也能成功输出。

## 为什么要把 `PUBLIC_SITE_URL` 放进检查流程

因为没有这个变量时，主题会主动收紧一部分生产 SEO 输出。这样做比较安全，但也意味着你应该在构建验证时模拟真实站点地址，而不是永远只在“缺少域名”的宽松模式下工作。

## 发布前清单

- [x] 标题和摘要能独立表达价值
- [x] 标签足够具体，便于搜索与相关文章
- [x] 路由、语言与 `translationKey` 设置正确
- [x] `npm run check` 通过
- [x] 带 `PUBLIC_SITE_URL` 的构建通过
- [x] 如需评论，确认 Waline 服务端地址已配置

## RSS 与 sitemap 不是“上线之后再看”的东西

如果一套主题已经包含 RSS 与 sitemap，那么它们就应该被视为内容系统的一部分，而不是发布后的附加品。

你可以把它们理解成：

- RSS：让更新被订阅
- sitemap：让页面被发现

所以发布链路最好从一开始就把它们纳入检查，而不是等流量出现后再补。

## 为什么这篇文章把评论关掉

这篇文章的 frontmatter 把 `comments` 设成了 `false`。这么做不是因为评论不重要，而是为了在 demo 里顺便证明另一件事：评论区确实是可选的，内容作者可以按文章类型决定是否开放互动。

例如：

- 教程、经验分享：适合打开评论
- 规范、清单、版本公告：有时更适合关闭评论

## 如果你把这个主题用于真实博客

建议把发布动作拆成三层：

1. 内容层：文章 frontmatter 与正文
2. 构建层：`check` 与 `build`
3. 部署层：GitHub Pages、Vercel 或你自己的静态托管

只要这三层是通的，主题就不再只是 demo，而是一套可以稳定运行的长期写作工具。
