---
title: "双语路由与翻译工作流：只为真实存在的译文生成页面"
excerpt: "这篇文章演示 translationKey、语言切换、canonical、hreflang 以及“中英文独立路由树”的真实行为。"
publishDate: 2026-03-15
locale: zh-cn
translationKey: bilingual-routing
category: 国际化
tags:
  - i18n
  - translationKey
  - Locale Switch
  - canonical
  - hreflang
cover: ../../assets/covers/tangent-frame.svg
coverAlt: 带有几何边框与切线结构的抽象封面，用来代表路由和多语言映射。
---

这个主题的双语能力不是“同一篇文章自动复制两份 URL”，而是把中文和英文当作两棵独立但可关联的路由树。

## 默认结构是什么

默认语言是 `zh-cn`，因此中文路由不带前缀，英文路由带 `/en/` 前缀：

| 语言 | 首页 | 文章页 | 搜索页 |
| --- | --- | --- | --- |
| 中文 | `/` | `/posts/slug/` | `/search/` |
| 英文 | `/en/` | `/en/posts/slug/` | `/en/search/` |

## 翻译文章靠什么建立关系

不是靠文件名，也不是靠 slug，而是靠 `translationKey`。

```yaml
locale: zh-cn
translationKey: bilingual-routing
```

```yaml
locale: en
translationKey: bilingual-routing
```

只要两篇文章使用相同的 `translationKey`，主题就会把它们当作一组真实译文：

- 语言切换会互相指向
- alternate / `hreflang` 会互相建立关系
- 不会把它们误判成两篇无关文章

## 为什么“不自动补伪译文”很重要

很多多语言博客最容易踩的坑，是默认语言有文章、次语言没有译文时，系统仍然生成一个次语言页面。这样做看起来“页面更多了”，但实际上会造成三个问题：

1. 用户切换语言后看到的不是翻译，而是重复内容。
2. 搜索引擎会看到混乱的 canonical / alternate 关系。
3. 你自己也会误以为双语链路已经完整。

所以这个主题现在采用的是更严格的策略：**只有真实存在的译文才生成对应语言文章页。**

## 这套 demo 里怎么验证

这次内容重写后，demo 里会同时存在两种文章：

- 有中英配对的文章
- 只存在于某一种语言的文章

也就是说：

- 你可以在这篇文章和它的英文对应文章之间切换语言
- 你也会看到有些文章故意没有对应译文，用来证明主题不会生成虚假的另一语言页面

例如，稍后你可以去看一篇只存在中文的说明文：[/posts/zhi-you-zhong-wen-de-geng-xin/](/posts/zhi-you-zhong-wen-de-geng-xin/)。

## 和 SEO 有什么关系

双语写作不是只有“能切语言”就够了。对于生产环境，以下信息也应该正确：

- canonical URL
- `hreflang`
- Open Graph locale
- 结构化数据里的发布时间与更新时间

这也是为什么 frontmatter 里的这些字段都不是装饰：

```yaml
publishDate: 2026-03-15
updatedDate: 2026-03-20
locale: zh-cn
translationKey: bilingual-routing
```

## 工作流应该怎么走

推荐的写法很简单：

1. 先写默认语言版本
2. 真正准备好译文之后，再创建另一语言文章
3. 为两篇文章复用同一个 `translationKey`
4. 保持每个语言版本自己的路由和标题风格

这样做好处很多：

- 中文与英文可以各自优化标题和摘要
- 两边发布时间可以一致，也可以按需要更新
- 站点不会被伪多语言页面污染

## demo 内容为什么必须覆盖这个能力

如果演示站只有单语文章，或者只有一对机械翻译的文章，那么你其实看不出：

- 语言切换是否真的关联到了译文
- alternate 逻辑是不是基于真实文章对
- 无译文时是否会错误生成页面

所以这次 demo 会把“真实配对”和“故意缺一边”都展示出来。对一个双语主题来说，这比一句“支持 i18n”更有说服力。
