# 快速开始

[English](Quick-Start-en) · [返回 Wiki 首页](Home)

## 环境要求

- Node.js `>= 22.12.0`
- npm `>= 10`

## 安装

```bash
git clone https://github.com/mufengyian/astro-newspaper.git your-blog-name
cd your-blog-name
npm install
```

## 配置环境变量

复制 [`.env.example`](../../../.env.example) 为 `.env`：

```bash
cp .env.example .env
```

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

说明：

- `PUBLIC_SITE_URL`
  建议在部署前配置。
  它会影响 canonical、sitemap、RSS、Open Graph、Twitter Card、`hreflang` 和 `robots.txt` 行为。
- `PUBLIC_WALINE_SERVER_URL`
  可选；未配置时评论区不会渲染。

## 本地开发

```bash
npm run dev
```

## 第一次运行后建议检查的页面

- `/`
- `/archive/`
- `/tags/`
- `/search/`
- `/about/`
- `/rss/`
- `/posts/...`
- `/en/`
- `/en/archive/`
- `/en/tags/`
- `/en/search/`
- `/en/about/`

## 第一轮定制建议

建议优先修改这些位置：

1. [`src/config/site.ts`](../../../src/config/site.ts)
   站点标题、导航、分页、搜索、评论、媒体预设、交互参数。
2. [`src/config/about.ts`](../../../src/config/about.ts)
   关于页内容。
3. [`src/config/i18n/`](../../../src/config/i18n)
   中英文 UI 文案。
4. [`src/content/posts/`](../../../src/content/posts)
   替换示例文章。
5. [`src/assets/covers/`](../../../src/assets/covers)
   替换示例封面。
6. [`src/styles/tokens.css`](../../../src/styles/tokens.css)
   如果你想替换整套视觉语言，从这里开始。

## 推荐的第一次验证命令

```bash
npm run check
npm run build
```

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动本地开发 |
| `npm run check` | 运行 Astro 类型检查 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run sync` | 同步 Astro 生成类型 |

## 下一步

- 继续阅读 [配置说明](Configuration-zh-cn)
- 如果你要先写文章，继续看 [内容与 MDX](Content-and-MDX-zh-cn)
- 如果你要先梳理多语言，继续看 [i18n](i18n-zh-cn)
