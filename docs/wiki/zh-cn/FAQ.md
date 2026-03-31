# FAQ

[English](../en/FAQ.md) · [返回 Wiki 首页](./Home.md)

## 这是一个安装型主题包吗？

不是。当前定位是 starter 仓库，最推荐的使用方式是 clone 或 Use this template。

## 可以只写中文吗？

可以。英文结构可以先空着，但建议不要直接删掉，后续扩展成本会更低。

## 可以只用 Markdown 吗？

可以。`.md` 和 `.mdx` 都支持，不需要组件能力时完全可以坚持 Markdown。

## 为什么首页社交链接默认不显示？

因为默认公开展示 `username`、`yourmail` 这类占位信息并不专业，也不安全。现在必须由你主动配置 `socialLinks` 才会显示。

## 为什么没有配置 `PUBLIC_SITE_URL` 就看不到 RSS？

这是主题的安全默认。没有真实站点地址时，生成 RSS / sitemap / canonical 都容易误伤生产环境。

## 可以换掉字体吗？

可以。当前内置 `editorial` 和 `wenkai`，你也可以继续扩展 `typography.preset`。

## 适合直接拿来做文档站吗？

如果你的文档结构比较轻，完全可以。如果你需要完整文档导航、版本管理和搜索体系，建议还是用专门的文档框架。
