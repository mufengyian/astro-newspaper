# i18n

[English](i18n-en) · [返回 Wiki 首页](Home)

## 当前内置语言

- `zh-cn`
- `en`

默认语言是 `zh-cn`，并且不会为默认语言增加 URL 前缀。

## 路由结构

- 中文首页：`/`
- 英文首页：`/en/`
- 中文文章：`/posts/slug/`
- 英文文章：`/en/posts/slug/`
- 中文搜索：`/search/`
- 英文搜索：`/en/search/`

## 语言文案在哪里改

集中在：

```text
src/utils/i18n.ts
```

这里维护了导航、按钮、搜索、文章页和站点描述文案。

## 多语言文章怎么写

最稳妥的方式是：

1. 写一篇中文文章
2. 写一篇英文文章
3. 为两篇文章设置相同的 `translationKey`

示例：

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

推荐工作流：

1. 先写默认语言版本
2. 译文真正准备好之后，再创建对应语言文章
3. 两篇文章复用同一个 `translationKey`
4. 每种语言保持自己的独立路由

当前主题行为：

- 只有真实存在的语言版本才会生成文章页
- 没有英文译文时，不会再生成重复的 `/en/...` 页面
- 语言切换链接和 alternate 元数据会基于真实译文关系生成，而不是基于伪造的 fallback 页面

## 什么时候需要改 i18n 配置

如果你只是在现有中英文之间写作：

- 不需要改 Astro i18n 配置

如果你要增加第三种语言：

- 更新 `astro.config.mjs`
- 更新 `src/utils/i18n.ts`
- 更新 `src/config.ts`
- 为对应页面补充路由与内容

这已经超出主题默认范围，建议把中英文稳定跑顺以后再扩展。
