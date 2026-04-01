# FAQ

[English](FAQ-en) · [返回 Wiki 首页](Home)

## 这是一个安装型主题包吗？

不是。当前仓库形态为 starter repository，可通过 clone 或 Use this template 初始化。

## 可以只写中文吗？

可以。英文结构可以保持为空，也可以保留现有目录结构。

## 可以只用 Markdown 吗？

可以。`.md` 和 `.mdx` 都支持，不需要组件能力时完全可以坚持 Markdown。

## 为什么首页社交链接默认不显示？

因为默认公开展示 `username`、`yourmail` 这类占位信息并不专业，也不安全。现在必须由你主动配置 `socialLinks` 才会显示。

## 为什么没有配置 `PUBLIC_SITE_URL` 就看不到 RSS？

这是主题的安全默认。没有真实站点地址时，生成 RSS / sitemap / canonical 都容易误伤生产环境。

## 可以换掉字体吗？

可以。当前内置 `editorial` 和 `wenkai`，你也可以继续扩展 `typography.preset`。

## 适合直接拿来做文档站吗？

可以用于轻量内容文档或笔记场景。多版本管理与复杂文档导航不属于当前主题的默认结构。
