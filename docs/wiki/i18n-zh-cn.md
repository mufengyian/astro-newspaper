# i18n

[English](i18n-en) · [返回 Wiki 首页](Home)

## 当前内置语言

- `zh-cn`
- `en`

默认语言是 `zh-cn`，不会带 URL 前缀。

## 当前路由结构

- 中文首页：`/`
- 英文首页：`/en/`
- 中文文章：`/posts/<slug>/`
- 英文文章：`/en/posts/<slug>/`
- 中文搜索：`/search/`
- 英文搜索：`/en/search/`

## 文案文件在哪里

当前版本的站点级文案集中在：

- [`src/config/i18n/zh-cn.ts`](../../../src/config/i18n/zh-cn.ts)
- [`src/config/i18n/en.ts`](../../../src/config/i18n/en.ts)
- [`src/config/i18n/types.ts`](../../../src/config/i18n/types.ts)

`src/utils/i18n.ts` 现在主要负责 locale 解析与 helper，不再承担大段文案本体。

## 双语文章怎么写

最稳妥的方式是：

1. 写一篇中文文章
2. 写一篇英文文章
3. 给它们设置相同的 `translationKey`

示例：

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

## 当前主题行为

- 只有真实存在的语言版本才会生成对应文章页
- 语言切换会优先跳转到匹配译文
- alternate 元数据和 `hreflang` 会基于真实译文关系生成
- 搜索、导航、RSS 页面和文章 UI 文案都会跟随当前 locale

## 如果你要增加第三种语言

这已经超出默认主题范围，通常至少要改：

- `astro.config.mjs`
- `src/config/i18n/types.ts`
- 新增一个 `src/config/i18n/<locale>.ts`
- `src/utils/i18n.ts`
- 对应 locale 的页面路由与内容组织

建议先把中英文链路跑稳，再考虑扩展第三种语言。
