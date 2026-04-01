# newspaper Wiki

[English](Home-en) · [返回 README](../../../README.md)

`newspaper` 是一个双语 Astro 博客主题，面向长期写作、技术发布、项目记录与结构化归档。主题保持静态优先、配置集中、客户端增强克制，适合作为长期维护的内容站点基线。

## 文档索引

- [快速开始](Quick-Start-zh-cn)
- [配置说明](Configuration-zh-cn)
- [内容与 MDX](Content-and-MDX-zh-cn)
- [图片与 astro:assets](Images-and-Assets-zh-cn)
- [i18n](i18n-zh-cn)
- [评论与部署](Comments-and-Deployment-zh-cn)
- [FAQ](FAQ-zh-cn)

## 主题结构

- 页面体系：首页、分页、归档、标签、搜索、关于、RSS、404 与文章页
- 内容层：基于 Astro Content Collections 的 Markdown / MDX 发布流程
- 配置层：`src/config/site.ts` 与 `src/utils/i18n.ts`
- 样式层：`tokens / base / layout / listing / article / responsive`
- 交互层：主题切换、搜索、代码复制、阅读进度、回到顶部、Waline

## 核心目录

- `src/config/site.ts`
  站点标题、导航、首页信息区、Footer、评论、分页与社交链接配置。
- `src/utils/i18n.ts`
  中英文文案与 locale 工具函数。
- `src/components/pages/*`
  页面实现层。
- `src/styles/*`
  设计 token 与全站样式。
- `src/scripts/*`
  客户端增强脚本。
