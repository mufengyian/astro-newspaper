# newspaper Wiki

[English](Home-en) · [返回 README](../../../README.md)

`newspaper` 是一个双语 Astro 博客主题，面向长期写作、技术发布、项目记录与结构化归档。主题保持静态优先、配置集中、客户端增强克制，适合作为长期维护的内容型站点基线。

## 文档索引

- [快速开始](Quick-Start-zh-cn)
- [配置说明](Configuration-zh-cn)
- [内容与 MDX](Content-and-MDX-zh-cn)
- [图片与 astro:assets](Images-and-Assets-zh-cn)
- [i18n](i18n-zh-cn)
- [评论与部署](Comments-and-Deployment-zh-cn)
- [FAQ](FAQ-zh-cn)

## 主题特性

- 默认包含首页、分页、归档、标签、搜索、关于、RSS、404 与文章详情页
- 支持 `zh-cn` 与 `en` 两套路由结构，并通过 `translationKey` 建立双语文章映射
- 设计系统按 `tokens / base / layout / listing / article / responsive` 分层组织
- 站点配置、关于页内容与词典统一集中在 `src/config/`
- 评论、搜索、主题切换、代码复制、阅读进度与回到顶部均按独立脚本拆分

## 建议阅读顺序

1. [快速开始](Quick-Start-zh-cn)
2. [配置说明](Configuration-zh-cn)
3. [内容与 MDX](Content-and-MDX-zh-cn)
4. [i18n](i18n-zh-cn)
5. [评论与部署](Comments-and-Deployment-zh-cn)

## 核心目录

- `src/config/site.ts`
  站点标题、导航、首页信息区、Footer、评论、搜索、媒体预设与交互参数。
- `src/config/about.ts`
  关于页长文案与内容结构。
- `src/config/i18n/*`
  中英文词典与 locale 类型定义。
- `src/components/pages/*`
  页面实现层。
- `src/styles/*`
  设计 token 与全站样式系统。
- `src/scripts/*`
  客户端增强脚本。

## 维护入口

- 调整站点设置时，优先修改 `src/config/site.ts`
- 调整文案时，优先修改 `src/config/i18n/*`
- 调整视觉变量时，优先修改 `src/styles/tokens.css`
- 调整内容结构时，优先修改 `src/content/posts/*`
