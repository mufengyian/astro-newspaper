# i18n

[English](i18n-en) · [返回 Wiki 首页](Home)

## 内置语言

- `zh-cn`
- `en`

默认语言为 `zh-cn`，默认语言不带 URL 前缀。

## 路由结构

- 中文首页：`/`
- 英文首页：`/en/`
- 中文文章：`/posts/<slug>/`
- 英文文章：`/en/posts/<slug>/`
- 中文搜索：`/search/`
- 英文搜索：`/en/search/`

## 文案位置

站点级双语文案集中在 [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)。

## 双语文章

双语文章通过相同的 `translationKey` 建立映射关系。

```yaml
locale: zh-cn
translationKey: astro-assets-guide
```

```yaml
locale: en
translationKey: astro-assets-guide
```

## 当前行为

- 仅为真实存在的语言版本生成文章页
- 语言切换优先跳转到对应译文
- `alternate` 元信息基于真实译文关系生成
